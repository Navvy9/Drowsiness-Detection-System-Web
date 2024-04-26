// App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('');

  const startDetection = () => {
    fetch('http://localhost:5000/start_detection') // Update the URL with the correct backend URL
      .then(response => {
        if (response.ok) {
          setStatus('Detection started');
        } else {
          setStatus('Failed to start detection');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setStatus('Error occurred');
      });
  };

  const endDetection = () => {
    fetch('http://localhost:5000/end_detection', {
      method: 'POST'
    })
      .then(response => {
        if (response.ok) {
          setStatus('Detection ended');
        } else {
          setStatus('Failed to end detection');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setStatus('Error occurred');
      });
  };

  return (
    <div className="container">
      <h1 className="title">Drowsiness Detection System</h1>
      <button className="button" onClick={startDetection}>Start Detection</button>
      <button className="button" onClick={endDetection}>End Detection</button>
      <p className="status">Status: {status}</p>
    </div>
  );
}

export default App;
