"use strict";
import express from "express";
import  Routes from "./routes/routes";
import PropertyReaderUtility from "./utilities/propertyReaderUtility";
import LoggerUtility from "./utilities/loggerUtility";
import DatabaseConfiguration from "./conf/databaseConfiguration";
import cookieParser from 'cookie-parser';
import I18n from 'i18n';
import path from 'path';
const app = express();
app.use(cookieParser());

new PropertyReaderUtility(app);

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
console.log( "config =="+DatabaseConfiguration.mongoose);
console.log(i18n.getCatalog());




app.listen(8000, () => {
    
    logger.info("hello world in logger");
    logger.error("hello world error");
    logger.debug("debugger enable");
    

});