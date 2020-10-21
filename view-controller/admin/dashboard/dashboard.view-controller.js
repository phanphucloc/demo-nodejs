const express = require('express')
const router = express.Router();
const auth = require('../../../middleware/auth');
const baseUrlView = 'admin/dashboard/';
const { TYPE_REQUEST } = require('../../../config/index');

router.get('/dashboard', auth(TYPE_REQUEST.VIEW) , function (req, res) {
    // console.log('Cookie: ' + req.cookies);
    res.render(baseUrlView + 'index', {
        username: req.cookies.username
    });
})

module.exports = router