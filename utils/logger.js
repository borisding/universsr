import { format, transports, createLogger } from 'winston';
import { env, paths } from './';

const { combine, json, timestamp, label } = format;

const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      level: 'info',
      filename: `${paths.resources}/logs/access.log`
    }),
    new transports.File({
      level: 'error',
      filename: `${paths.resources}/logs/errors.log`,
      format: combine(
        label({ label: 'ERROR:' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
      )
    })
  ]
});

// add console only for development
if (env.isDev) {
  logger.add(
    new transports.Console({
      handleExceptions: true
    })
  );
}

export default logger;
