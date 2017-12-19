import { Router } from 'express';
import config from '../config/app';
import * as HTTPStatus from 'http-status-codes';
import * as SearchService from '../services/SearchService';
import TagsController from '../controllers/TagsController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import PostsController from '../controllers/PostsController';
import { validateAccessToken } from '../validators/TokenValidator';

/**
 * Contains all API routes for the application.
 */
let router = Router();

router.get('/', validateAccessToken, (request, response, next) => {
  if (!request.query.search) {
    next();
  } else {
    SearchService.search(request.query.search, request.query.page)
      .then(data => response.status(HTTPStatus.OK).json(data))
      .catch(error => next(error));
  }
});

router.get('/', (request, response) => {
  response.json({
    app: config.APP_NAME,
    apiVersion: config.APP_VERSION
  });
});

router.use('/', AuthController);

router.use('/tags', validateAccessToken, TagsController);
router.use('/users', validateAccessToken, UsersController);
router.use('/posts', validateAccessToken, PostsController);
                                                                                                                                                                                                                                                                                                                                                                                    
export default router;
