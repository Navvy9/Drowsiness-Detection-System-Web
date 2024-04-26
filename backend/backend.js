const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

let pythonProcess = null;

// Route to start detection
app.get('/start_detection', (req, res) => {
  // Check if detection is already running
  if (pythonProcess) {
    res.status(400).send('Detection is already running');
    return;
  }

  // Execute Python script
  pythonProcess = spawn('python', ['C:/Users/navdeep/Desktop/drowsi/python/Drowsiness_Detection.py']);

  // Handle Python script output
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    pythonProcess = null;
  });

  res.send('Detection started');
});

// Route to end detection
app.post('/end_detection', (req, res) => {
  if (!pythonProcess) {
    res.status(400).send('Detection is not running');
    return;
  }

  // Terminate the Python process
  pythonProcess.kill();

  res.send('Detection ended');
});

// Route to terminate detection from backend side
app.post('/terminate_detection', (req, res) => {
  if (!pythonProcess) {
    res.status(400).send('Detection is not running');
    return;
  }

  // Terminate the Python process
  pythonProcess.kill();

  pythonProcess = null; // Reset pythonProcess variable
  res.send('Detection terminated from backend side');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
