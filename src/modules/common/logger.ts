import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'info.log', level: 'info' })
  ]
});

export default logger;
