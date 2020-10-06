var http = require('http');
var fs = require('fs')

http.createServer(function (req, res) {

    if(req.url === '/' || req.url === '/index.html' ){

        res.writeHead('200', {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html', 'utf-8').pipe(res);
    
    }
    else if(req.url === '/api'){

        res.writeHead('200', {'Content-Type': 'application/json'});
        var obj = {
            firstName: 'Hoa',
            lastName: 'Mai'
        }
        res.end(JSON.stringify(obj));

    }
    else {

        res.writeHead('404');
        res.end('Not Found');

    }

}).listen(4001, '127.0.0.1', function (params) {
    console.log('Server listening on: http://localhost:4001');
});