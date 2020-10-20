
var listGroupAPI = require('../api/index');

module.exports = function (app) {
    app.use([
        listGroupAPI.userApi,
        listGroupAPI.userAuthorization
    ])
}
