const express = require('express');
const authorizeUser = require('../../middlewares/authorizeUser');
const Router = express.Router();

/* -------------------Routes -----------------------*/

Router.get(
  '/dashboard',
  authorizeUser,
  require('../../controllers/client/profile')
);

Router.post(
  '/upload',
  authorizeUser,
  require('../../controllers/client/upload')
);

Router.post('/mail', authorizeUser, require('../../controllers/client/mail'));

Router.get(
  '/settings',
  authorizeUser,
  require('../../controllers/client/settings')
);

Router.post(
  '/change-info',
  authorizeUser,
  require('../../controllers/client/changeinfo')
);

Router.delete(
  '/remove-history',
  authorizeUser,
  require('../../controllers/client/history').removeHistory
);

Router.delete(
  '/delete-account',
  authorizeUser,
  require('../../controllers/client/deleteAccount')
);

Router.get(
  '/get-images',
  authorizeUser,
  require('../../controllers/client/history').getImages
);

Router.get(
  '/get-videos',
  authorizeUser,
  require('../../controllers/client/history').getVideos
);

Router.get(
  '/get-documents',
  authorizeUser,
  require('../../controllers/client/history').getDocuments
);

Router.post(
  '/remove-image',
  authorizeUser,
  require('../../controllers/client/history').removeImage
);

Router.post(
  '/remove-video',
  authorizeUser,
  require('../../controllers/client/history').removeVideo
);

Router.post(
  '/remove-document',
  authorizeUser,
  require('../../controllers/client/history').removeDocument
);

Router.get(
  '/file/:uuid',
  require('../../controllers/client/download').getdDownloadPage
);

Router.get(
  '/download/:uuid',
  require('../../controllers/client/download').downloadFile
);

module.exports = Router;
