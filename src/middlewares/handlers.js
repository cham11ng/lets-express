import Youch from 'youch';

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
