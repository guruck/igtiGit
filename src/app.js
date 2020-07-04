import express from 'express';
import winston from 'winston';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const { USERDB, PSWDDB, SITEDB, BASEDB, PRMTDB, PORT } = process.env;
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

app.get('/', (req, res) => {
  res.send({ result: 'app funfando é nois' });
});

app.listen(PORT || 3000, async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${USERDB}:${PSWDDB}@${SITEDB}/${BASEDB}?${PRMTDB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    logger.info('conectado com sucesso');
  } catch (err) {
    logger.error('não conectado ERRO:' + err);
  }
  logger.info('App inicializado');
});
