var system = require('./system.config');
var authSwaggerDocument = require('./auth-swagger-document.config');
var userSwaggerDocument = require('./user-swagger-document.config');
var chatRoomSwaggerDocument = require('./chat-room-swagger-document.config');

var NAME_ENVIRONMENT = require('./name-environment.const');
var TYPE_REQUEST = require('./type-request.const');
var URL_LAYOUT = require('./url-layout.const');

module.exports = {
    system,
    authSwaggerDocument,
    userSwaggerDocument,
    chatRoomSwaggerDocument,
    NAME_ENVIRONMENT,
    TYPE_REQUEST,
    URL_LAYOUT
}