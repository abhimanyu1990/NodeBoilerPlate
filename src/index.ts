"use strict";

import express from "express";
import Routes from "./routes/routes";
import PropertyReaderUtility from "./utilities/propertyReader.utility";
import LoggerUtility from "./utilities/logger.utility";
import DatabaseConfiguration from "./conf/database.configuration";
import Bootstrap from "./bootstrap";
import bodyParser, * as bodyparser from 'body-parser';

import cookieParser from 'cookie-parser';
import I18n from 'i18n';
import path from 'path';
import GlobalObjects from "./app/globalObjects";
import RedisConnect from "./conf/redis.configurations";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
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



let routes = new Routes(app,i18n);
let loggerUtility = new LoggerUtility();
let logger = loggerUtility.getLogger(app);
new DatabaseConfiguration(app);
app.use(logger.info);
console.log(i18n.getCatalog());
let bootProgram = new Bootstrap();
new RedisConnect();
app.listen(8000, () => {
    console.log("Application is running on port 8000");
    //console.log(GlobalObjects.app);
});