import { format, transports, createLogger } from 'winston';
import { isDev, syspath } from '../../config';

const { combine, json, timestamp, label } = format;

const winstonLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      level: 'info',
      filename: `${syspath.storage}/logs/access.log`
    }),
    new transports.File({
      level: 'error',
      filename: `${syspath.storage}/logs/errors.log`,
      format: combine(
        label({ label: 'ERROR:' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
      )
    })
  ]
});

// add console only for development
if (isDev) {
  winstonLogger.add(
    new transports.Console({
      handleExceptions: true
    })
  );
}

export default winstonLogger;
