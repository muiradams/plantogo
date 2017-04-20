// Starts server that gets run in production to serve index.html file
const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// Enable SSL redirect
app.use(sslRedirect());

app.use(express.static(__dirname + '/public/'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(port);
console.log('Server started');
