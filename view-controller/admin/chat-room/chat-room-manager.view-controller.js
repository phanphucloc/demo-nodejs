const express = require('express')
const router = express.Router();
const axios = require('axios');
const {
    system,
    TYPE_REQUEST,
    URL_LAYOUT
} = require('../../../config/index');

const auth = require('../../../middleware/auth');

const baseBreadcrumb = 'Phòng chat';

// VIEW: List room
router.get('/chat-room/list-chat-room', auth(TYPE_REQUEST.VIEW), function (req, res) {
    var infoUser = req.user

    const url = system.BASE_PATH_URL_API + 'chat-rooms';
    const headers = {
        'Authorization': req.token
    }

    axios.get(url, {
            headers
        })
        .then(function (response) {
            const chatRooms = response.data.chatRooms;
            res.render(URL_LAYOUT.ADMIN, {
                urlCurrentPage: '../../admin/chat-room/chat-room-manager/list-chat-room',
                listBreadcrumb: [baseBreadcrumb, 'Danh sách phòng chat'],
                infoUser,
                chatRooms
            });
        })
        .catch(function (error) {
            res.status(500).render(URL_LAYOUT.ADMIN, {
                urlCurrentPage: '../../admin/chat-room/chat-room-manager/list-chat-room',
                listBreadcrumb: [baseBreadcrumb, 'Danh sách phòng chat'],
                infoUser,
                listRoom: [],
                error: error.response
            });
        });

})

// VIEW: Add room
router.get('/chat-room/add-chat-room', auth(TYPE_REQUEST.VIEW), function (req, res) {
    const infoUser = req.user

    res.render(URL_LAYOUT.ADMIN, {
        urlCurrentPage: '../../admin/chat-room/chat-room-manager/add-chat-room',
        listBreadcrumb: [baseBreadcrumb, 'Thêm phòng chat'],
        infoUser
    });

})


// VIEW: Edit room
router.get('/chat-room/edit-chat-room/:id', auth(TYPE_REQUEST.VIEW), function (req, res) {
    var infoUser = req.user
    var roomId = req.params.id;

    const url = system.BASE_PATH_URL_API + 'chat-room/' + roomId;
    const headers = {
        'Authorization': req.token
    }

    axios.get(url, {
            headers
        })
        .then(function (response) {
            const chatRoom = response.data.chatRoom;
            res.render(URL_LAYOUT.ADMIN, {
                urlCurrentPage: '../../admin/chat-room/chat-room-manager/edit-chat-room',
                listBreadcrumb: [baseBreadcrumb, 'Sửa phòng chat'],
                infoUser,
                chatRoom
            });
        })
        .catch(function (error) {
            res.status(500).render(URL_LAYOUT.ADMIN, {
                urlCurrentPage: '../../admin/chat-room/chat-room-manager/edit-chat-room',
                listBreadcrumb: [baseBreadcrumb, 'Sửa phòng chat'],
                infoUser,
                chatRoom: {},
                error: error.response
            });
        });

})

// POST: Add room
router.post('/chat-room/get-chat-rooms', auth(TYPE_REQUEST.VIEW), function (req, res) {

    const url = system.BASE_PATH_URL_API + 'chat-rooms';
    const headers = {
        'Authorization': req.token
    }

    axios.get(url, {
            headers
        })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            res.status(500).send(error.data);
        });
        
})


// POST: Add room
router.post('/chat-room/add-chat-room', auth(TYPE_REQUEST.VIEW), function (req, res) {
    var nameRoom = req.body.nameRoom;
    var description = req.body.description;

    const url = system.BASE_PATH_URL_API + 'chat-room';
    const headers = {
        'Authorization': req.token
    }

    axios.post(url, {
            nameRoom,
            description
        }, {
            headers
        })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            res.status(500).send(error.data);
        });
})

// POST: Edit room
router.post('/chat-room/edit-chat-room/:id', auth(TYPE_REQUEST.VIEW), function (req, res) {
    var id = req.params.id;
    var nameRoom = req.body.nameRoom;
    var description = req.body.description;

    const url = system.BASE_PATH_URL_API + 'chat-room/' + id;
    const headers = {
        'Authorization': req.token
    }

    axios.post(url, {
            nameRoom,
            description
        }, {
            headers
        })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            res.status(500).send(error.data);
        });

})

// POST: Delete room
router.post('/chat-room/delete-chat-rooms/', auth(TYPE_REQUEST.VIEW), function (req, res) {
    const ids = req.body.ids;

    const url = system.BASE_PATH_URL_API + 'chat-room';
    const headers = {
        'Authorization': req.token
    }
    console.log('listID', req.body.ids)

    axios.delete(url, {
            headers,
            params: {
                ids: JSON.stringify(ids)
            }
        }, {

        })
        .then(function (response) {
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
            res.status(error.response.status).send(error.response.statusText);
        });

})

module.exports = router