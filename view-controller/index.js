var authorizationViewController = require('./authorization/index');
var homeViewController = require('./home/index');

var userViewController = require('./admin/user/index');
var dashboardViewController = require('./admin/dashboard/index');

module.exports = {
    authorizationViewController,
    homeViewController,
    userViewController,
    dashboardViewController
}