
var http = require('http');
var fs = require('fs')

http.createServer(function (req, res) {

    res.writeHead('200', {'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/index.html', 'utf-8').pipe(res);

}).listen(4001, '127.0.0.1');

