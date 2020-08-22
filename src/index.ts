"use strict";
import express from "express";
import  Routes from "./routes/routes";
import PropertyReaderUtility from "./utilities/propertyReaderUtility";
import LoggerUtility from "./utilities/loggerUtility";
import DatabaseConfiguration from "./conf/databaseConfiguration";
const app = express();
let routes = new Routes(app);
new PropertyReaderUtility(app);
let loggerUtility = new LoggerUtility();
let logger = loggerUtility.getLogger(app);
new DatabaseConfiguration(app);

console.log( "config =="+DatabaseConfiguration.mongoose);

app.use(logger.info);
app.listen(8000, () => {
   
    logger.info("hello world in logger");
    logger.error("hello world error");
    logger.debug("debugger enable");
    

});