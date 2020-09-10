import { register, login } from './swagger.auth';
export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'Node Jump Start',
        termsOfService: '',
        contact: {
            name: 'Abhimanyu',
            email: 'example@hotmail.com',
            url: ''
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    }, servers: [
        {
            "url": "{httpscheme}://localhost:{port}/{basePath}",
            "description": "The development API server",
            "variables": {
                "httpscheme":{
                    "enum":[
                        "http",
                        "https"
                    ],
                    "default":"http"

                },
                "port": {
                    "enum": [
                        "8000",
                        "80",
                        "443"
                    ],
                    "default": "8000"
                },
                "basePath": {
                    "default": "api/v1"
                }
            }
        },
        {
            "url": "{httpscheme}://production:{port}/{basePath}",
            "description": "The production API server",
            "variables": {
                "httpscheme":{
                    "enum":[
                        "http",
                        "https"
                    ],
                    "default":"http"

                },
                "port": {
                    "enum": [
                        "8000",
                        "80",
                        "443"
                    ],
                    "default": "8000"
                },
                "basePath": {
                    "default": "api/v1"
                }
            }
        },
        {
            "url": "{httpscheme}://staging:{port}/{basePath}",
            "description": "The staging API server",
            "variables": {
                "httpscheme":{
                    "enum":[
                        "http",
                        "https"
                    ],
                    "default":"http"

                },
                "port": {
                    "enum": [
                        "8000",
                        "80",
                        "443"
                    ],
                    "default": "8000"
                },
                "basePath": {
                    "default": "api/v1"
                }
            }
        }
    ],
    components: {
        schemas: {},
        securitySchemes: {
            authAction: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization'
            }
        }
    },
    tags: [
        {
            name: 'login'
        },{
            name:'register'
        }
    ],
    paths: {
        "/login": {
            "post": login
        },
        "/register":{
            "post":register
        }
    }
}