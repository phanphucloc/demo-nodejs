const express = require('express')
const router = express.Router();
const auth = require('../../../middleware/auth');
const { TYPE_REQUEST , URL_LAYOUT} = require('../../../config/index');


router.get('/dashboard', auth(TYPE_REQUEST.VIEW) , function (req, res) {
    const infoUser = req.user

    res.render(URL_LAYOUT.ADMIN, {
        urlCurrentPage: '../../admin/dashboard/index',
        infoUser 
    });
})

module.exports = router