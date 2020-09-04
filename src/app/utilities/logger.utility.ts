'use strict';

import winston = require('winston');
import { appendFile } from 'fs';

export default class LoggerUtility{
    public static logger:any;

    constructor() {}

    public getLogger(app:any){
        this.configureInfoLogger(app);
        return LoggerUtility.logger;
    }

    public createTransports(app:any){
        let transports=[];
        let logFilePath = app.get("log.path");
            let errorLogFilePath = logFilePath + "/"+app.get("log.error-filename");
            let infoLogFilePath = logFilePath + "/" + app.get("log.info-filename");
            let debugLogFilePath = logFilePath +"/" + app.get("log.debug-filename");
        if(app.get("log.level.debug")=='true'){
            transports.push( new (require('winston-daily-rotate-file'))({
                name: 'debug-file',
                filename: debugLogFilePath,
                datePattern: 'yyyy-MM-DD-HH.log',
                localTime: true,
                level: 'debug',
                json:false,
                meta: false, 
                msg: "HTTP  {{req.header}}",
                timestamp: function() { return new Date().toString(); }
            }));
        }

        if(app.get("log.level.error")=='true'){
            transports.push( new (require('winston-daily-rotate-file'))({
                name: 'debug-file',
                filename: errorLogFilePath,
                level: 'debug',
                datePattern: 'yyyy-MM-DD-HH.log',
                handleExceptions: true,
                localTime: true,
                json: false,
                timestamp: function() { return new Date().toString(); }
            }));
        }
        if(app.get("log.level.info")=='true'){
            transports.push( new (require('winston-daily-rotate-file'))({
                name: 'info-file',
                filename: infoLogFilePath,
                datePattern: 'yyyy-MM-DD-HH.log',
                localTime: true,
                level: 'info',
                json:false,
                meta: false, 
                msg: "HTTP  {{req.header}}",
                timestamp: function() { return new Date().toString(); }
            }));
        }
        return transports;

    }

    private configureInfoLogger(app:any) {
        if (LoggerUtility.logger == null) {
            let transports = this.createTransports(app);
            LoggerUtility.logger = winston.createLogger({
                transports: transports
            });
            return LoggerUtility.logger;
        } else {
            return null;
        }

    }
}