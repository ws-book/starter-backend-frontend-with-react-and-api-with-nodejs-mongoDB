import mongoose from "mongoose";
import winston from "winston"; 
import app from "./app";
import config from "./config";

// console.log('server/src/index.js')

mongoose.connect(config.DATABASE);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  winston.info('Mongoose connected!');
});

mongoose.connection.on('disconnected', () => {
  winston.info('Mongoose disconnected!');
});

mongoose.connection.on('error', (err) => {
  winston.error(err.message);
  process.exit(1);
});


app.listen(config.PORT, () => {
  Object.keys(config).forEach((key) => winston.info(`${key}: ${config[key]}`));
});
