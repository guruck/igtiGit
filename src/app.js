import express from 'express';
import winston from 'winston';
// import mongoose from 'mongoose';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api.log' }), timestamp(), myFormat),
});

const app = express();

app.use(express.json());
app.listen(3000, async () => {
  //só pra ver o que muda
  logger.info('App inicializado');
});
