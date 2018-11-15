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

const logger = {
  // logging http request with winston writable stream for morgan
  http() {
    winstonLogger.stream = {
      write: message => {
        winstonLogger.info(message);
      }
    };

    if (DEV) {
      return morgan('short', {
        stream: winstonLogger.stream
      });
    }

    return morgan('combined', {
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
