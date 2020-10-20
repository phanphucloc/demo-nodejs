const express = require('express')
const router = express.Router();
const auth = require('../../../middleware/auth');
const baseUrlView = 'admin/dashboard/';

router.get('/dashboard', auth , function (req, res) {
    // console.log('Cookie: ' + req.cookies);
    res.render(baseUrlView + 'index', {
        username: req.cookies.username
    });
})

module.exports = router