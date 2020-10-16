"use strict";

import express from "express";
import Routes from "./app/routes/routes";
import PropertyReaderUtility from "./app/utilities/propertyReader.utility";
import LoggerUtility from "./app/utilities/logger.utility";
import DatabaseConfiguration from "./conf/database.configuration";
import errorMiddleware from "./app/middleware/error.middleware";
import Bootstrap from "./bootstrap";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import GlobalObjects from "./app/globalObjects";
import RedisConnect from "./conf/redis.configurations";
import * as SwaggerUI from 'swagger-ui-express';
import { swaggerDocument } from "./swagger";

// creating express application
const app = express();

// added cookieParser() as middleware
app.use(cookieParser());
// added bodyParser as middleware to parse request body as JSON object
app.use(bodyParser.json());
// swagger documentation will be access at http://<ip:port>/api-docs
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

// Read properties from the `application.properties` file and added the properties (key-value) in express application
new PropertyReaderUtility(app);
// GlobalObjects is the class have static app instance so that we can refer to app anywhere in application
GlobalObjects.app = app;

//Initializing the routes defined in the application
new Routes(app);

// configuring log level info as middleware to log all the requests
let loggerUtility = new LoggerUtility();
let logger = loggerUtility.getLogger(app);
app.use(logger.info);

// MongoDB database connection initialization
new DatabaseConfiguration(app);

// Redis database initialization
new RedisConnect();

// Bootstrap program invocation to create all the necessay roles, permission and admin at application startup
let bootProgram = new Bootstrap();


//added errorMiddleware to catch all the error at application level
app.use(errorMiddleware);

app.listen(8000, () => {
    console.log("Application is running on port 8000");
});