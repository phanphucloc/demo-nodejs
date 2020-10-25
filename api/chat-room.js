const express = require('express')
const {
    system,
    TYPE_REQUEST
} = require('../config/index');
const ChatRoomModel = require('../models/chat-room')
const auth = require('../middleware/auth')

const ChatRoomService = require('../service/chat-room.service');
const { param } = require('../view-controller/home/home.view-controller');
const ChatRoomServiceInstance = new ChatRoomService(ChatRoomModel);

const router = express.Router()

// POST: Create chat room
router.post(system.BASE_URL_API + 'chat-room', auth(TYPE_REQUEST.API), async (req, res) => {
    try {
        const { chatRoom } = await ChatRoomServiceInstance.createChatRoom(req.body,req.user._id)
        res.status(201).send({
            chatRoom
        })
    } catch (error) {
        console.log('error');
        res.status(400).send(error)
    }
})

// POST: Edit chat room
router.post(system.BASE_URL_API + 'chat-room/:id', auth(TYPE_REQUEST.API), async (req, res) => {
    try {
        const { chatRoom } = await ChatRoomServiceInstance.editChatRoom(req.params.id, req.body);
        res.status(201).send({
            status: 'OK',
            message: 'Edit success',
            chatRoom
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET: Get all chat room
router.get(system.BASE_URL_API + 'chat-rooms', auth(TYPE_REQUEST.API), async (req, res) => {
    try {
        const { chatRooms } = await ChatRoomServiceInstance.getAllChatRoom();
        res.status(201).send({
            status: 'OK',
            message: 'get chat rooms success',
            chatRooms
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET: Get chat room by id
router.get(system.BASE_URL_API + 'chat-room/:id', auth(TYPE_REQUEST.API), async (req, res) => {
    try {
        const { chatRoom } = await ChatRoomServiceInstance.getChatRoomById(req.params.id);
        res.status(201).send({
            status: 'OK',
            message: 'get chat room by id success',
            chatRoom
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// DELETE: Delete chat room by ids
router.delete(system.BASE_URL_API + 'chat-room', auth(TYPE_REQUEST.API), async (req, res) => {
    try {
        const { status, message } = await ChatRoomServiceInstance.deleteChatRooms(JSON.parse(req.query.ids));
        res.status(201).send({
            status,
            message
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router