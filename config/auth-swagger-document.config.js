var system = require('./system.config')

const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "version": "1.0.0",
        "title": "Yet Another Node.js Blogg Application API",
        "description": "Yet Another Node.js Blogg Application API",
        "license": {
            "name": "MIT",
            "url": "https://opensource.org/licenses/MIT"
        }
    },
    "basePath": system.BASE_URL_API,
    "tags": [{
        "name": "Authorization",
        "description": "API for Authorization in the system"
    }],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/authorization/login": {
            "parameters": [{
                "name": "UserModel",
                "in": "body",
                "description": "User for login",
                "schema": {
                    "$ref": "#/definitions/UserModel"
                }
            }],
            "post": {
                "tags": [
                    "Logout"
                ],
                "summary": "logout user in system",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/LoginResult"
                        }
                    },
                    "403": {
                        "description": "You do not have necessary permissions for the resource",
                    }
                }
            }
        },
        "/authorization/logout": {
            "parameters": [{
                "name": "Authorization",
                "in": "header",
                "description": "User for login",
                "schema": {
                    "type": "string"
                }
            }],
            "post": {
                "tags": [
                    "Logout"
                ],
                "summary": "logout user in system",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/UserModel"
                        }
                    },
                    "403": {
                        "description": "You do not have necessary permissions for the resource",
                    }
                }
            }
        },
        "/authorization/logout-all": {
            "parameters": [{
                "name": "Authorization",
                "in": "header",
                "description": "User for login",
                "schema": {
                    "type": "string"
                }
            }],
            "post": {
                "tags": [
                    "Persons"
                ],
                "summary": "logout UserModel all driver",
                "responses": {
                    "200": {
                        "description": "UserModel is found",
                        "schema": {
                            "$ref": "#/definitions/UserModel"
                        }
                    }
                }
            },
        },
    },
    "definitions": {
        "UserModel": {
            "required": [
                "email",
                "password",
            ],
            "properties": {
                "email": {
                    "type": "string",
                },
                "password": {
                    "type": "string"
                },
            }
        },
        "LoginResult": {
            "properties": {
                "user": {
                    "$ref": "#/definitions/PersonResult"
                },
                "token": {
                    "$ref": "#/definitions/Token"
                },
            }
        },
        "PersonResult": {
            "properties": {
                "_id": {
                    "type": "string",
                },
                "firstName": {
                    "type": "string",
                },
                "lastName": {
                    "type": "string"
                },
                "address": {
                    "type": "string"
                },
                "tokens": {
                    "type": "array",
                    "items": {
                       "$ref": "#/definitions/Token"
                    }
                },
            }
        },
        "Token": {
            "properties": {
                "_id": {
                    "type": "string",
                },
                "token": {
                    "type": "string",
                },
            }
        },
        "Tokens": {
            "type": "array",
            "$ref": "#/definitions/Token"
        }
    }
}

module.exports = swaggerDocument;