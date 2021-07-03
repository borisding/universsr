import morgan from 'morgan';
import { env, logger } from '../../utils';

// winston logger writable stream for morgan
logger.stream = {
  write: message => {
    logger.info(message);
  }
};

const httpLogger = () =>
  morgan(env.isDev ? 'tiny' : 'combined', {
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400
  });

export default httpLogger;
