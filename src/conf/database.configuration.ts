

import mongoose, { Mongoose } from "mongoose";
import LoggerUtility from "../utilities/logger.utility";

export default class DatabaseConfiguration {

  public app: any;
  constructor(app: any) {
    this.app = app;
    this.getMongodbConnection();
  }

  getMongodbConnection() {
    let username = this.app.get("db.mongodb.user");
    let password = this.app.get("db.mongodb.password");
    let host = this.app.get("db.mongodb.host");
    let port = this.app.get("db.mongodb.port");
    let database = this.app.get("db.mongodb.name");
    let poolSize = this.app.get("db.mongodb.max.connection");
    let socketTimeoutMS = this.app.get("db.mongodb.socket.timeoutinmilliseconds");
    let serverSelectionTimeoutMS = this.app.get("db.mongodb.server.selectiontimeout");
    let family = this.app.get("db.mongodb.ip.family");
    let autoIndex = this.app.get("db.mongodb.autoindex");
    let options = {
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
      autoIndex: autoIndex,
      poolSize: poolSize, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: serverSelectionTimeoutMS, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: socketTimeoutMS, // Close sockets after 45 seconds of inactivity
      family: family // Use IPv4, skip trying IPv6
    };

    console.log(options);
    let mongodbConnectionUrl = "mongodb://" + username + ":" + password + "@" + host + ":" + port + "/" + database;

    let err = null;
    mongoose.connect(mongodbConnectionUrl, options, function (error: any) {
      err = error;
      LoggerUtility.logger.error(error);
    });
    mongoose.connection.on('error', function (err: any) {
      LoggerUtility.logger.error(err);
    });
    mongoose.connection.on('error', function (err: any) {
      LoggerUtility.logger.error('Mongoose default connection error: ' + err);
    });

  }
}