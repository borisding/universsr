import express from 'express';
import cors from 'cors';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import config, { DEV } from '@config';
import { logger } from '@middlewares/express';
import routers from './routers';

const api = express();

api
  .set('etag', !DEV)
  .set('json spaces', 2)
  .disable('x-powered-by')
  .use(logger())
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp()) // after parsed body
  .use(cookieParser(config['SECRET_KEY']))
  .use(`/api/${config['API_VERSION']}`, routers);

export default api;
