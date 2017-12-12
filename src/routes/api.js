import { Router } from 'express';
import config from '../config/app';
import UsersController from '../controllers/UsersController';
import PostsController from '../controllers/PostsController';
import LoginController from '../controllers/LoginController';
import RegisterController from '../controllers/RegisterController';

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

router.use('/login', LoginController);
router.use('/register', RegisterController);

router.use('/users', UsersController);
router.use('/posts', PostsController);

export default router;
