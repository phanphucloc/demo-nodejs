const express = require('express')
const router = express.Router();

router.get('/', function (req, res) {
    // console.log('Cookie: ' + req.cookies);
    res.render('home/index/index', {
        username: req.cookies.username
    });
})

module.exports = router