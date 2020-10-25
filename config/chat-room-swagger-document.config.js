var system = require('./system.config')

const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Chat room API",
        "description": "All APIs have access to the chat room",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "basePath": system.BASE_URL_API,
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/chat-rooms": {
            "get": {
                "tags": [
                    "Chat room manager"
                ],
                "summary": "logout user in system",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/ChatRoomsResultModel"
                        }
                    },
                    "403": {
                        "description": "You do not have necessary permissions for the resource",
                    }
                }
            }
        },
        "/chat-room/{userId}": {
            "parameters": [{
                "name": "Data chat room",
                "in": "body",
                "description": "chat room for chat room manager",
                "schema": {
                    "$ref": "#/definitions/ChatRoomResultModel"
                }
            }],
            "get": {
                "tags": [
                    "Chat room manager"
                ],
                "summary": "Get chat room with given ID",
                "responses": {
                    "200": {
                        "description": "Chat room is found",
                        "schema": {
                            "$ref": "#/definitions/ChatRoomResultModel"
                        }
                    }
                }
            },
            "delete": {
                "summary": "Delete chat room with given ID",
                "tags": [
                    "Chat room manager"
                ],
                "responses": {
                    "200": {
                        "description": "Chat room is deleted",
                        "schema": {
                            "$ref": "#/definitions/ChatRoomResultModel"
                        }
                    }
                }
            },
            "post": {
                "summary": "Update chat room with give ID",
                "tags": [
                    "Chat room manager"
                ],
                "parameters": [{
                    "name": "User",
                    "in": "body",
                    "description": "Chat room with new values of properties",
                    "schema": {
                        "$ref": "#/definitions/ChatRoomDataModel"
                    }
                }],
                "responses": {
                    "200": {
                        "description": "User is updated",
                        "schema": {
                            "$ref": "#/definitions/UserUpdate"
                        }
                    }
                }
            }
        },
        "/chat-room": {
            "post": {
                "tags": [
                    "Chat room manager"
                ],
                "summary": "logout user in system",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/ChatRoomResultModel"
                        }
                    },
                    "403": {
                        "description": "You do not have necessary permissions for the resource",
                    }
                }
            }
        },
    },
    "definitions": {
        "ChatRoomDataModel": {
            "required": [
                "nameRoom",
                "description",
            ],
            "properties": {
                "nameRoom": {
                    "type": "string",
                },
                "description": {
                    "type": "string",
                },
            }
        },
        "ChatRoomResultModel": {
            "properties": {
                "nameRoom": {
                    "type": "string",
                },
                "ownRoom": {
                    "type": "string",
                },
                "numberOnline": {
                    "type": "string",
                },
                "description": {
                    "type": "string",
                },
            }
        },
        "ChatRoomsDataModel": {
            "type": "array",
            "$ref": "#/definitions/ChatRoomDataModel"
        },
        "ChatRoomsResultModel": {
            "type": "array",
            "$ref": "#/definitions/ChatRoomResultModel"
        }
    }
}

module.exports = swaggerDocument;