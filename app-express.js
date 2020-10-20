var {  
  system,
  authSwaggerDocument,
  personSwaggerDocument
} = require('./config/index');
var express = require('express');
var cookieParser = require('cookie-parser');
// var mySql = require('mysql');
var mongoose = require('mongoose');
var swaggerUi = require('swagger-ui-express');
var apiController = require('./controller/api-controller');
var viewsController = require('./controller/views-controller');



var app = express();
var server  = require('http').createServer(app);

var port = process.env.PORT || 3000;
var router = express.Router()

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// MIDDLEWARE static
app.use('/assets', express.static(__dirname + '/public'));
app.use(cookieParser())
app.use('/', function (req, res, next) {
    
    console.log('process.env.MONGODB_UR: ', process.env.MONGODB_UR);

    console.log('mongoose: ', mongoose);

    system.BASE_PATH_URL_API =  req.protocol + '://' +  req.hostname + ':' + port + system.BASE_URL_API;

    console.log('protocol: ',  req.protocol);

    // connect mysql (use XAMPP)
    // https://www.youtube.com/watch?v=RrJcj68cIvo&list=PLqnlyu33Xy-6g7IqU5-3BXOfewcJKoL08&index=76
    // var connection = mySql.createConnection({
    //     host: 'localhost',
    //     user: 'test',
    //     password: '123456789',
    //     database: 'test'
    // });

    // connection.connect();

    // connection.query('SELECT * FROM `user`', function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('The solution is: ', results[0]);
    // });

    // connection.end();

    // connect mongoDB(use https://cloud.mongodb.com)
    // https://www.youtube.com/watch?v=JKBurpy_hfs&list=PLqnlyu33Xy-6g7IqU5-3BXOfewcJKoL08&index=78
    req.requestTime = new Date();
    next();
})

app.use('/person-api-docs', swaggerUi.serve, swaggerUi.setup(personSwaggerDocument,  { "showExplorer": true }));
app.use('/auth-api-docs', swaggerUi.serve, swaggerUi.setup(authSwaggerDocument,  { "showExplorer": true }));
app.use('/api/v1', router);
app.use(express.json())


// npm install ejs
app.set('view engine', 'ejs');

apiController(app);
viewsController(app);


// app.listen(port, function () {
//     console.log('listening on port: ' + port);
// });
server.listen(port, function(err) {
    console.log('listening on port: ' + port);
    // console.log(err, server.address());
});