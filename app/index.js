var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, 'client')));
app.listen(process.env.PORT || 3000);
console.log('Server now listening on port %s.', process.env.PORT || 3000);
