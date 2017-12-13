import { Router } from 'express';
import config from '../config/app';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import PostsController from '../controllers/PostsController';

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

router.use('/users', UsersController);
router.use('/posts', PostsController);

export default router;
