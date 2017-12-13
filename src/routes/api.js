import { Router } from 'express';
import config from '../config/app';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import PostsController from '../controllers/PostsController';
import { validateAccessToken } from '../validators/TokenValidator';

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

router.use('/', AuthController);

router.use('/users', validateAccessToken, UsersController);
router.use('/posts', validateAccessToken, PostsController);

export default router;
