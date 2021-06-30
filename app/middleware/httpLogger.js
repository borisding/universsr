import morgan from 'morgan';
import logger from '../logger';
import { isDev } from '../../config';

// winston logger writable stream for morgan
logger.stream = {
  write: message => {
    logger.info(message);
  }
};

const httpLogger = () =>
  morgan(isDev ? 'tiny' : 'combined', {
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400
  });

export default httpLogger;
