import { format, transports, createLogger } from 'winston';
import { env, paths } from '../../utils';

const { combine, json, timestamp, label } = format;

const winstonLogger = createLogger({
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
  winstonLogger.add(
    new transports.Console({
      handleExceptions: true
    })
  );
}

export default winstonLogger;
