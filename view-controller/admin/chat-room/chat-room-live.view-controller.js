const express = require('express')
const router = express.Router();
const auth = require('../../../middleware/auth');
const { TYPE_REQUEST , URL_LAYOUT} = require('../../../config/index');

const baseBreadcrumb = 'Phòng chat';

// VIEW: Edit room
router.get('/chat-room/chat-room-live', auth(TYPE_REQUEST.VIEW) , function (req, res) {
    const infoUser = req.user

    res.render(URL_LAYOUT.ADMIN, {
        urlCurrentPage: '../../admin/chat-room/chat-room-live/chat-room-live',
        listBreadcrumb: [baseBreadcrumb,'Chat'],
        infoUser 
    });
    
})

module.exports = router