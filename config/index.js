var system = require('./system.config');
var authSwaggerDocument = require('./auth-swagger-document.config');
var personSwaggerDocument = require('./person-swagger-document.config');

var NAME_ENVIRONMENT = require('./name-environment.const');
var TYPE_REQUEST = require('./type-request.const');

module.exports = {
    system,
    authSwaggerDocument,
    personSwaggerDocument,
    NAME_ENVIRONMENT,
    TYPE_REQUEST
}