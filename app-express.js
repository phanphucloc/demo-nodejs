var express = require('express');
var cookieParser = require('cookie-parser');
// var mySql = require('mysql');
var mongoose = require('mongoose');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./config/swagger-document');

var apiController = require('./controller/api-controller');
var homeController = require('./controller/home-controller');

var app = express();
var port = 3000;
var router = express.Router()

mongoose.connect('mongodb+srv://admin:Thanchet123@test.zjz87.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



// MIDDLEWARE static
app.use('/assets', express.static(__dirname + '/public'));
app.use(cookieParser())
app.use('/', function (req, res, next) {
    console.log('Request: ' + req.url);

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

// npm install ejs
app.set('view engine', 'ejs');

apiController(app, mongoose);
homeController(app);

app.listen(port, function () {
    console.log('listening on port: ' + port);
});