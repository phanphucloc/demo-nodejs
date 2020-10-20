var authorizationViewController = require('./authorization/index');
var homeViewController = require('./home/index');

var personViewController = require('./admin/person/index');
var dashboardViewController = require('./admin/dashboard/index');

module.exports = {
    authorizationViewController,
    homeViewController,
    personViewController,
    dashboardViewController
}