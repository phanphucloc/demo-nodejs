


  var {configSystem} = require('./config')

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
    "basePath": configSystem.baseURLApi,
    "tags": [
      {
        "name": "Users",
        "description": "API for users in the system"
      }
    ],
    "schemes": [
      "http"
    ],
    "consumes": [
      "application/json"
    ],
    "produces": [
      "application/json"
    ],
    "paths": {
      "/users": {
        "get": {
          "tags": [
            "Persons"
          ],
          "summary": "Get all person in system",
          "responses": {
            "200": {
              "description": "OK",
              "schema": {
                "$ref": "#/definitions/Persons"
              }
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
            "description": "ID of Person that we want to find",
            "type": "string"
          }
        ],
        "get": {
          "tags": [
            "Persons"
          ],
          "summary": "Get Person with given ID",
          "responses": {
            "200": {
              "description": "Person is found",
              "schema": {
                "$ref": "#/definitions/Person"
              }
            }
          }
        },
        "delete": {
          "summary": "Delete Person with given ID",
          "tags": [
            "Persons"
          ],
          "responses": {
            "200": {
              "description": "Person is deleted",
              "schema": {
                "$ref": "#/definitions/Person"
              }
            }
          }
        },
        "put": {
          "summary": "Update person with give ID",
          "tags": [
            "Persons"
          ],
          "parameters": [
            {
              "name": "Person",
              "in": "body",
              "description": "User with new values of properties",
              "schema": {
                "$ref": "#/definitions/Person"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Person is updated",
              "schema": {
                "$ref": "#/definitions/Person"
              }
            }
          }
        }
      },
      "/user": {
        "put": {
          "summary": "Create person with give ID",
          "tags": [
            "Persons"
          ],
          "parameters": [
            {
              "name": "Person",
              "in": "body",
              "description": "User with new values of properties",
              "schema": {
                "$ref": "#/definitions/PersonResister"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Person is created",
              "schema": {
                "$ref": "#/definitions/PersonResister"
              }
            }
          }
        }
      }
    },
    "definitions": {
      "Person": {
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
      "PersonResister": {
        "properties": {
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
      "Persons": {
        "type": "array",
        "$ref": "#/definitions/Person"
      }
    }
  }
  
  module.exports = swaggerDocument;