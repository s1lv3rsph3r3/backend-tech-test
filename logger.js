const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.metadata(),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'backend-tech-test' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
      ),
      timestamp: true,
    }),
  ],
});

module.exports = logger;
