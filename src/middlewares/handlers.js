import Youch from 'youch';
import HttpStatus from 'http-status-codes';

/**
 * Convert exception to HTMLResponse
 *
 * @param error
 * @param request
 * @param response
 * @param next
 */
export function convertExceptionToHTMLResponse(error, request, response, next) {
  const youch = new Youch(error, request);

  youch
    .toHTML()
    .then((html) => {
      response.writeHead(200, { 'content-type': 'text/html' });
      response.write(html);
      response.end();
    });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export function errorHandler(err, req, res, next) {
  let error = convertExceptionToJSONResponse(err);
  res.status(error.code).json({ error });
}

/**
 * Build error response for validation errors.
 *
 * @param  {Error} error
 * @return {Object}
 */
export function convertExceptionToJSONResponse(error) {
  // Validation errors
  if (error.isJoi) {
    return {
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: HttpStatus.getStatusText(HttpStatus.UNPROCESSABLE_ENTITY),
      details:
      error.details &&
      error.details.map(error => {
        return {
          message: error.message,
          param: error.path.join('.')
        };
      })
    };
  }

  // HTTP errors
  if (error.isBoom) {
    return {
      code: error.output.statusCode,
      message: error.output.payload.message || error.output.payload.error
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
  };
}
