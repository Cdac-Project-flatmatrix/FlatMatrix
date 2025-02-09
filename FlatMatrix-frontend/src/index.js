import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
// const functions = require("firebase-functions");
// const cors = require("cors")({ origin: true });
import 'bootstrap/dist/css/bootstrap.min.css';


// exports.uploadImage = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     try {
//       // Extract image file from request
//       if (!req.body.imageUrl) {
//         return res.status(400).json({ error: "No image URL provided" });
//       }
      
//       res.status(200).json({ message: "CORS enabled", url: req.body.imageUrl });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

