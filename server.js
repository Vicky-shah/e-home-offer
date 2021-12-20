//server.js
const express = require('express');
const cors = require('cors');
// const https = require('https');
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };
const path = require('path');

require('dotenv').config();
const app = express();
const port = process.env.REACT_APP_PORT || 3001;

//The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers
app.use(cors());
const compression = require('compression');
// app.use(favicon(__dirname + '/public/favicon.png'));
// app.use(express.static(__dirname));
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(port);