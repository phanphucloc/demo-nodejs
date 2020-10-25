const express = require('express')
const router = express.Router();

const baseBreadcrumb = 'Quản lí người dùng';

const { URL_LAYOUT } = require('../../../config/index');

// VIEW: Add user
router.get('/user/add', function (req, res) {
    res.render(URL_LAYOUT.ADMIN, {
        urlCurrentPage: '../../admin/user/index',
        listBreadcrumb: [baseBreadcrumb],
        infoUser 
    });
})

module.exports = router