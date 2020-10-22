const express = require('express')
const router = express.Router();

const { URL_LAYOUT } = require('../../config/index');

router.get('/', function (req, res) {
    // console.log('Cookie: ' + req.cookies);
    res.render(URL_LAYOUT.HOME, {
        urlCurrentPage: '../../home/index/index'
    });
})

module.exports = router