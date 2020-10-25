


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
   
    "consumes": [
      "application/json"
    ],
    "produces": [
      "application/json"
    ],
    "securityDefinitions": {
      "jwt": {
          "type": "apiKey",
          "in": "header",
          "name": "Authorization"
      }
    },
    "security": [
        {
            "jwt": []
        }
    ],
    "paths": {
      "/users": {
        "get": {
          "tags": [
            'Users'
          ],
          "summary": "Get all user in system",
          "responses": {
            "200": {
              "description": "OK",
              "schema": {
                "$ref": "#/definitions/Users"
              }
            },
            "403": {
              "description": "You do not have necessary permissions for the resource",
            }
          }
        }
      },
      "/user/{userId}": {
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "description": "ID of User that we want to find",
            "type": "string"
          }
        ],
        "get": {
          "tags": [
            'Users'
          ],
          "summary": "Get User with given ID",
          "responses": {
            "200": {
              "description": "User is found",
              "schema": {
                "$ref": "#/definitions/User"
              }
            }
          }
        },
        "delete": {
          "tags": [
            'Users'
          ],
          "summary": "Delete User with given ID",
          "responses": {
            "200": {
              "description": "User is deleted",
              "schema": {
                "$ref": "#/definitions/User"
              }
            }
          }
        },
        "post": {
          "tags": [
            'Users'
          ],
          "summary": "Update user with give ID",
          "parameters": [
            {
              "name": "User",
              "in": "body",
              "description": "User with new values of properties",
              "schema": {
                "$ref": "#/definitions/UserUpdate"
              }
            }
          ],
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
      "/user": {
        "post": {
          "tags": [
            'Users'
          ],
          "summary": "Create user with give ID",
          "parameters": [
            {
              "name": "User",
              "in": "body",
              "description": "User with new values of properties",
              "schema": {
                "$ref": "#/definitions/UserResister"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "User is created",
              "schema": {
                "$ref": "#/definitions/UserResister"
              }
            }
          }
        }
      }
    },
    "definitions": {
      "User": {
        "required": [
          "_id"
        ],
        "properties": {
          "_id": {
            "type": "string",
            "uniqueItems": true
          },
          "address": {
            "type": "string",
          },
          "lastName": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          }
        }
      },
      "UserUpdate": {
        "properties": {
          "email": {
            "type": "string"
          },
          "address": {
            "type": "string",
          },
          "lastName": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        }
      },
      "UserResister": {
        "properties": {
          "email": {
            "type": "string"
          },
          "address": {
            "type": "string",
          },
          "lastName": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        }
      },
      "Users": {
        "type": "array",
        "$ref": "#/definitions/User"
      }
    }
  }
  
  module.exports = swaggerDocument;