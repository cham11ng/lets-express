import { Router } from 'express';
import config from '../config/app';
import * as HTTPStatus from 'http-status-codes';
import * as SearchService from '../services/searchService';
import tagsController from '../controllers/tagsController';
import authController from '../controllers/authController';
import usersController from '../controllers/usersController';
import postsController from '../controllers/postsController';
import { validateAccessToken } from '../validators/tokenValidator';

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

router.use('/', authController);

router.use('/tags', validateAccessToken, tagsController);
router.use('/users', validateAccessToken, usersController);
router.use('/posts', validateAccessToken, postsController);

export default router;
