
var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// create application/json parser
var jsonParser = bodyParser.json()

module.exports = function (app) {

    app.get('/', function (req, res) {
        // console.log('Cookie: ' + req.cookies);
    
        // res.render('index', {username : req.cookies.username});
        res.send(`
            <link href="assets/style.css" rel="stylesheet" type="text/css">
            <h1> Hello Express </h1>
            <p> Request time: ${req.requestTime} </p>
        `)
    })
    
    app.post('/api/login', urlencodedParser , function (req, res) {
        res.send('Welcome : ' + req.body.userName);
        console.log('User name: ' + req.body.userName);
        console.log('Password:' + req.body.password);
    })
    
    app.post('/api/login-json', jsonParser , function (req, res) {
        res.send('Welcome : ' + req.body.userName);
        console.log('User name: ' + req.body.userName);
        console.log('Password:' + req.body.password);
    })

}