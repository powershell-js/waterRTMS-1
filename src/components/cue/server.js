var express = require('express');
var app = express();
app.use(express.static('demo'));
app.get('/', function (req, res) {
    res.location('/demo/index.html');
})
var server = app.listen(8086, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("address: http://%s:%s", host, port)
})