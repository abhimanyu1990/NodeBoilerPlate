import bodyParser from "body-parser";

export const login = {
    tags: ["login"],
    description: "use for user Authentication",
    operationId: 'login',
    security: [
        {
            bearerAuth: []
        }
    ],

    requestBody:
    {
        "name": "loginDTO",
        "description": "Id of the iser",
        content: {
            "application/json": {
                "schema": {
                    type: "object",
                    properties: {
                        email: {
                            type: 'string',
                            description: 'email of the user',
                            required: true,
                            example: "example@hotmail.com"
                        },
                        password: {
                            type: 'string',
                            description: 'valid password',
                            required: true,
                            example: "#Admin@123"
                        }
                    }
                }
            }
        }


    }
    ,
    responses: {
        "200": {
            description: "Authentication Response",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: 'string',
                                description: 'email of the user'
                            },
                            token: {
                                type: 'string',
                                description: 'Valid JWT token'
                            }
                        }
                    }
                }
            }
        },
        "Error": {
            description: "Error Response",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            "message": {
                                type: 'string',
                                description: 'error message'
                            },
                            status: {
                                type: 'integer',
                                description: 'http response code',
                                default: '401'

                            },
                            timestamp: {
                                type: 'string',
                                description: 'timestamp of error occurence'
                            },
                            errorId: {
                                type: 'string',
                                description: 'Unique Id of the error'

                            },
                            name: {
                                type: 'string',
                                description: 'name of the error'
                            }
                        }
                    }
                }
            }
        }
    }
}


export const register = {
    tags: ["register"],
    description: "use for user Authentication",
    operationId: 'register',
    security: [
        {
            bearerAuth: []
        }
    ],

    requestBody:
    {
        "name": "UserDto",
        "description": "User Detail",
        content: {
            "application/json": {
                "schema": {
                    type: "object",
                    properties: {
                        email: {
                            type: 'string',
                            description: 'email of the user',
                            required: true,
                            example: "example@hotmail.com"
                        },
                        password: {
                            type: 'string',
                            description: "Password must be Alphanumeric and have minimum length of 8 charaters. It contain atleast 1 capital letter, 1 small letter , atleast one special character !@#$%^&*",
                            required: true,
                            example: "#Admin@123"
                        },
                        firstName: {
                            type: 'string',
                            description: 'First name of the user',
                            required: true,
                            example: "John"
                        },
                        lastName: {
                            type: 'string',
                            description: 'Last name of the user',
                            required: false,
                            example: "Smith"
                        },
                        gender: {
                            type: 'string',
                            description: "please provide the gender detail of the user. possible values are 'male','female' and 'undisclosed'",
                            required: true,
                            example: 'male'

                        }

                    }
                }
            }
        }


    }
    ,
    responses: {
        "200": {
            description: "Registration Response",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            _id: {
                                type: 'string',
                                description: 'Object id added in the database'
                            },
                            email: {
                                type: 'string',
                                description: 'email of the user'
                            },
                            password: {
                                type: 'string',
                                description: 'password provided by user'
                            },
                            firstName: {
                                type: 'string',
                                description: 'First name of the user'

                            },
                            lastName: {
                                type: 'string',
                                description: 'Last name of the user'
                            },
                            gender: {
                                type: 'string',
                                description: "Gender detail of the user"
                            }
                        }
                    }
                }
            }
        },
        "Error": {
            description: "Error Response",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            "message": {
                                type: 'string',
                                description: 'error message'
                            },
                            status: {
                                type: 'integer',
                                description: 'http response code',

                            },
                            timestamp: {
                                type: 'string',
                                description: 'timestamp of error occurence'
                            },
                            errorId: {
                                type: 'string',
                                description: 'Unique Id of the error'

                            },
                            name: {
                                type: 'string',
                                description: 'name of the error'
                            }
                        }
                    }
                }
            }
        }
    }
} 