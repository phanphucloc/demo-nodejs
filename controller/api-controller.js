

const {
    userAPI,
    userAuthorizationAPI,
    chatRoomAPI,
} = require('../api/index');

module.exports = function (app) {
    app.use([
        userAPI,
        userAuthorizationAPI,
        chatRoomAPI,
    ])
}
