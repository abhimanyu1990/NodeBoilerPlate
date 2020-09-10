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
import I18n from 'i18n';
import path from 'path';
import GlobalObjects from "./app/globalObjects";
import RedisConnect from "./conf/redis.configurations";
import * as SwaggerUI from 'swagger-ui-express';
import { swaggerDocument } from "../swagger/swagger";
const app = express();
app.use(function(req, res, next) {
    console.log("cors actions");
    res.header("Access-Control-Allow-Origin", "*"); //specify specific origin to avoid attack
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cookieParser());
app.use(bodyParser.json());


app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

new PropertyReaderUtility(app);
GlobalObjects.app = app;


const i18n = I18n;
i18n.configure({
    locales: ['da','en'],
    defaultLocale: 'en',
    directory: path.join(__dirname, 'locales'),
    register: global,
    api: {
        __: 't', // now req.__ becomes req.t
        __n: 'tn' // and req.__n can be called as req.tn
      }
  });
i18n.setLocale('da');
app.use(i18n.init);

new Routes(app,i18n);


let loggerUtility = new LoggerUtility();
let logger = loggerUtility.getLogger(app);
app.use(logger.info);

new DatabaseConfiguration(app);


let bootProgram = new Bootstrap();
new RedisConnect();

//need to add middleware once routes are initialized
app.use(errorMiddleware);

app.listen(8000, () => {
    console.log("Application is running on port 8000");
    //console.log(GlobalObjects.app);
});