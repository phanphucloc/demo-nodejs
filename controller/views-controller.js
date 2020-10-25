const {
    authorizationViewController,
    homeViewController,
    userViewController,
    dashboardViewController,
    chatRoomViewController
} = require('../view-controller/index')

module.exports = function (app) {

    app.use([
        authorizationViewController,
        homeViewController,
        userViewController,
        dashboardViewController,
        chatRoomViewController,
    ])

}