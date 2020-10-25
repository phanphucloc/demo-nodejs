const mongoose = require('mongoose')

const chatRoomSchema = mongoose.Schema({
    nameRoom: {
        type: String,
    },
    createDate: {
        type: Date,
    },
    ownRoomId: {
        type: mongoose.Schema.Types.ObjectId, 
    },
    numberOnline: {
        type: String,
    },
    description: {
        type: String,
    },
})


const ChatRoomModel = mongoose.model('ChatRoom', chatRoomSchema)

module.exports = ChatRoomModel