import { Router } from 'express';
import config from '../config/app';

/**
 * Contains all API routes for the application.
 */
let router = Router();

router.get('/', (request, response) => {
  response.json({
    app: config.APP_NAME,
    apiVersion: config.APP_VERSION
  });
});

export default router;
