import isDev from 'isdev';
import express from 'express';
import hpp from 'hpp';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import serveApi from '@bin/serveApi';
import { secretKey, apiVersion } from '@config/properties';
import { logger } from '@server/middlewares';
import routers from './routers';

const app = express();

// may add more middlewares based on the context
app
  .set('etag', !isDev)
  .set('json spaces', 2)
  .disable('x-powered-by')
  .use(logger())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
  .use(hpp()) // after parsed body
  .use(cookieParser(secretKey))
  .use(`/api/${apiVersion}`, routers);

serveApi(app);

export default app;
