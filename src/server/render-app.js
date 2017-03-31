import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/util';

function renderApp(title) {
  return `<!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <link rel="stylesheet" href="${STATIC_PATH}/css/styles.css">
        <script src="https://use.fontawesome.com/118cccce43.js"></script>

      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS}"></div>
        <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
      </body>
    </html>`;
}

export default renderApp;
