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

export default winstonLogger;
