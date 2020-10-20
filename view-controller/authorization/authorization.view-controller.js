var {
    system
} = require('../../config/index');
const express = require('express')
const axios = require('axios');

const router = express.Router();
const noAuth = require('../../middleware/no-auth');

var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
// create application/json parser
var jsonParser = bodyParser.json()

router.get('/login', noAuth , function (req, res) {
    try {
        res.render('home/authorization/login', {
            username: req.cookies.username
        });
    } catch {
        res.status(500).send(error)

    }
})

router.post('/login', urlencodedParser, function (req, res) {
    try {

        var email = req.body.email;
        var password = req.body.password;

        var url = system.BASE_PATH_URL_API + 'authorization/login';

        axios.post(url, {
                email,
                password
            })
            .then(function (response) {
                res.send(response.data);
            })
            .catch(function (error) {
                res.status(500).send(error.data);
            });

    } catch {
        res.status(500).send(error)

    }
})

router.post('/login-json', jsonParser, function (req, res) {
    try {

        var email = req.body.email;
        var password = req.body.password;

        var url = system.BASE_PATH_URL_API + 'authorization/login';

        axios.post(url, {
                email,
                password
            })
            .then(function (response) {
                res.send(response.data);
            })
            .catch(function (error) {
                var status = error.response.status;
                var statusText = error.response.statusText;
                res.status(status).send(statusText);
            });

    } catch {
        res.status(500).send(error)
    }
})

router.post('/logout', async (req, res) => {
    // Log user out of the application
    try {

        const token = req.header('Authorization').replace('Bearer ', '');

        var url = system.BASE_PATH_URL_API + 'authorization/logout';
        var authorization = authorization

        const headers = {
            'Authorization': token
        }


        axios.post(url, {} , {
                headers
            })
            .then(function (response) {
                res.send(response.data);
            })
            .catch(function (error) {
                res.status(500).send(error.data);
            });

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('logout-all', async (req, res) => {
    // Log user out of all devices
    try {
        const data = await authorizationServiceInstance.logoutAll(req.person);
        res.send(data);
    } catch (error) {
        res.status(500).send(error)
    }
});

module.exports = router