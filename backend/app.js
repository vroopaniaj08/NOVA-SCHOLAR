const express = require('express');
const server = express();
const router = require('./router/user')
const uiExpress = require('swagger-ui-express')
const swaggerjsdoc = require('swagger-jsdoc')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config()
server.use(express.json())
server.use(express.urlencoded())
server.use(cors('*'))

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'nova scholar',
        version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            },
        },
        servers:[
            {
                url:'http://localhost:7001/'
            }
        ]
    },
    apis: ['./router/*.js'],
};


const openapiSpecification = swaggerjsdoc(options);
server.use('/api-docs',uiExpress.serve,uiExpress.setup(openapiSpecification))


server.use('/user',router)
// console.log(process.env.PORT)
const port = process.env.PORT || 7001

server.listen(port,()=>{
    console.log("server is running on port 7001");
})