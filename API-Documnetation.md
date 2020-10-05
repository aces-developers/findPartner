# [FindPartner API Documentation](https://app.swaggerhub.com/apis/AhmadKheder/ApiDocs/0.1)

```json

{
  "swagger": "2.0",
  "info": {
    "description": "defaultDescription",
    "version": "0.1",
    "title": "defaultTitle"
  },
  "paths": {
    "/newproject": {
      "post": {
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "required": false,
            "schema": {
              "$ref": "#/definitions/Model0"
            },
            "x-examples": {
              "application/json": "{\n  \"_ownerId\": \"5f7ac1fc6d74bfa205da30a3\",\n  \"title\": \"faraj project\",\n  \"description\": \"FARAJ PROJECT\",\n  \"category\":\"CAT01\",\n  \"budget\": \"CAT01\"\n}"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Definition generated from Swagger Inspector",
            "schema": {
              "$ref": "#/definitions/Model2"
            }
          }
        },
        "security": [
          {
            "Secured": []
          }
        ]
      }
    },
    "/user/5f7ac1fc6d74bfa205da30a3": {
      "put": {
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "required": false,
            "schema": {
              "$ref": "#/definitions/Model1"
            },
            "x-examples": {
              "application/json": "{\n    \"_id\": \"5f7ac1fc6d74bfa205da30a3\",\n    \"username\": \"faraj\",\n    \"password\": \"$2b$10$a9m.SZj2QCmagQ8cDvE/teyBKdBDSe.SzrNWZPrPPsDRFsLo.VZS.\",\n    \"fullname\": \"faraj\",\n    \"email\": \"faraj@gmail.com\",\n    \"skill\": \"web-DEV\",\n    \"__v\": 0\n}"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Definition generated from Swagger Inspector",
            "schema": {
              "$ref": "#/definitions/Model5"
            }
          }
        },
        "security": [
          {
            "Secured": []
          }
        ]
      }
    },
    "/signin": {
      "post": {
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Definition generated from Swagger Inspector",
            "schema": {
              "$ref": "#/definitions/Model6"
            }
          }
        },
        "security": [
          {
            "Secured": []
          }
        ]
      }
    },
    "/user/5f79c33aee2246080f0ccb93": {
      "delete": {
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Definition generated from Swagger Inspector",
            "schema": {
              "$ref": "#/definitions/Model8"
            }
          }
        },
        "security": [
          {
            "Secured": []
          }
        ]
      }
    },
    "/{param0}/{param1}": {
      "get": {
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "param0",
            "in": "path",
            "description": "Example values form path are: 'user' and 'project'",
            "required": true,
            "type": "string"
          },
          {
            "name": "param1",
            "in": "path",
            "description": "Example values form path are: '5f7ac1fc6d74bfa205da30a3' and '5f7ac2f56d74bfa205da30a6'",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Definition generated from Swagger Inspector",
            "schema": {
              "$ref": "#/definitions/Model4"
            }
          },
          "201": {
            "description": "Definition generated from Swagger Inspector",
            "schema": {
              "$ref": "#/definitions/Model3"
            }
          }
        },
        "security": [
          {
            "Secured": []
          }
        ]
      }
    },
    "/{param3}": {
      "get": {
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "required": false,
            "type": "string",
            "x-example": "w"
          },
          {
            "name": "search",
            "in": "query",
            "required": false,
            "type": "string",
            "x-example": "skill"
          },
          {
            "name": "param3",
            "in": "path",
            "description": "Example values form path are: 'allprojects' and 'param2'",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Definition generated from Swagger Inspector",
            "schema": {
              "$ref": "#/definitions/Model9"
            }
          },
          "201": {
            "description": "Definition generated from Swagger Inspector",
            "schema": {
              "$ref": "#/definitions/Model10"
            }
          }
        },
        "security": [
          {
            "Secured": []
          }
        ]
      }
    }
  },
  "securityDefinitions": {
    "Secured": {
      "type": "oauth2",
      "authorizationUrl": "https://example.com",
      "flow": "implicit",
      "scopes": {}
    }
  },
  "definitions": {
    "Model0": {
      "properties": {
        "_ownerId": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "category": {
          "type": "string"
        },
        "budget": {
          "type": "string"
        }
      }
    },
    "Model1": {
      "properties": {
        "_id": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "fullname": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "skill": {
          "type": "string"
        },
        "__v": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "Model2": {
      "properties": {
        "_id": {
          "type": "string"
        },
        "_ownerId": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "category": {
          "type": "string"
        },
        "budget": {
          "type": "string"
        },
        "__v": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "Array": {
      "properties": {
        "_id": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "fullname": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "skill": {
          "type": "string"
        },
        "__v": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "Model3": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Array"
      }
    },
    "Model4_Array": {
      "properties": {
        "_id": {
          "type": "string"
        },
        "_ownerId": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "category": {
          "type": "string"
        },
        "budget": {
          "type": "string"
        },
        "__v": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "Model4": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Model4_Array"
      }
    },
    "Model5": {
      "properties": {
        "_id": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "fullname": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "skill": {
          "type": "string"
        },
        "__v": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "User": {
      "properties": {
        "_id": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "fullname": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "skill": {
          "type": "string"
        },
        "__v": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "Model6": {
      "properties": {
        "user": {
          "$ref": "#/definitions/User"
        },
        "token": {
          "type": "string"
        }
      }
    },
    "Model7_Array": {
      "properties": {
        "_id": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "fullname": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "skill": {
          "type": "string"
        },
        "__v": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "Model8": {
      "properties": {
        "_id": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "fullname": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "skill": {
          "type": "string"
        },
        "__v": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "Model9_Array": {
      "properties": {
        "_id": {
          "type": "string"
        },
        "username": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "fullname": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "skill": {
          "type": "string"
        },
        "__v": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "Model9": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Model9_Array"
      }
    },
    "Model10_Array": {
      "properties": {
        "_id": {
          "type": "string"
        },
        "_ownerId": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "category": {
          "type": "string"
        },
        "budget": {
          "type": "string"
        },
        "__v": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "Model10": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Model10_Array"
      }
    }
  }
}
```