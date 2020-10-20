
const { authorizationViewController, homeViewController, personViewController,dashboardViewController } = require('../view-controller/index')

module.exports = function (app) {

    app.use([
        authorizationViewController,
        homeViewController,
        personViewController,
        dashboardViewController,
    ])

}