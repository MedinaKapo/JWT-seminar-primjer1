const express = require('express');
const app = express();
const PORT = 8085;
var http = require('http');
app.use(express.static('public'));
var httpServer = http.createServer(app);
httpServer.listen(PORT);