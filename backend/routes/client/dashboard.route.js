const express = require('express');
const Router = express.Router();

const authorizeUser = require('../../middlewares/authorizeUser');
const { apiLimitter } = require('../../helpers/rateLimitter');

/* ----------------------------------- Routes --------------------------------------- */

Router.get(
  '/user/dashboard',
  authorizeUser,
  require('../../controllers/client/profile')
);

Router.post(
  '/upload',
  apiLimitter,
  authorizeUser,
  require('../../controllers/client/upload')
);

Router.post(
  '/mail',
  apiLimitter,
  authorizeUser,
  require('../../controllers/client/mail')
);

Router.get(
  '/user/settings',
  authorizeUser,
  require('../../controllers/client/settings')
);

Router.post(
  '/user/change-info',
  authorizeUser,
  require('../../controllers/client/changeinfo')
);

Router.delete(
  '/user/remove-history',
  authorizeUser,
  require('../../controllers/client/history').removeHistory
);

Router.delete(
  '/user/delete-account',
  authorizeUser,
  require('../../controllers/client/deleteAccount')
);

Router.get(
  '/user/get-images',
  authorizeUser,
  require('../../controllers/client/history').getImages
);

Router.get(
  '/user/get-videos',
  authorizeUser,
  require('../../controllers/client/history').getVideos
);

Router.get(
  '/user/get-documents',
  authorizeUser,
  require('../../controllers/client/history').getDocuments
);

Router.post(
  '/user/remove-image',
  authorizeUser,
  require('../../controllers/client/history').removeImage
);

Router.post(
  '/user/remove-video',
  authorizeUser,
  require('../../controllers/client/history').removeVideo
);

Router.post(
  '/user/remove-document',
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
