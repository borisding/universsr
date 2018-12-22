import morgan from 'morgan';
import { format, transports, createLogger } from 'winston';
import { DEV, SYSPATH } from '@config';

const { combine, json, timestamp, label } = format;
const winstonLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      level: 'info',
      filename: `${SYSPATH['LOGS']}/access.log`
    }),
    new transports.File({
      level: 'error',
      filename: `${SYSPATH['LOGS']}/errors.log`,
      format: combine(
        label({ label: 'ERROR:' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
      )
    })
  ]
});

// add console only for development
if (DEV) {
  winstonLogger.add(
    new transports.Console({
      handleExceptions: true
    })
  );
}

// winston writable stream for morgan
winstonLogger.stream = {
  write: message => {
    winstonLogger.info(message);
  }
};

const logger = {
  // logging http request with status code lesser than 400
  http() {
    return morgan(DEV ? 'tiny' : 'combined', {
      stream: winstonLogger.stream,
      skip: (req, res) => res.statusCode < 400
    });
  },
  // logging thrown exception error with winston logger
  exception(err) {
    return winstonLogger.error(err);
  }
};

export default logger;
