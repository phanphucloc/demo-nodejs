const express = require('express')
const router = express.Router();

const baseUrlView = 'admin/person/';

router.get('/user/add', function (req, res) {
    // console.log('Cookie: ' + req.cookies);
    res.render(baseUrlView + 'add', {
        username: req.cookies.username
    });
})

module.exports = router