const express = require('express');
const Router = express.Router();
const authorizeAdmin = require('../../middlewares/authorizeAdmin');

/* ----------------------------------- Routes --------------------------------------- */

Router.get(
  '/dashboard',
  authorizeAdmin,
  require('../../controllers/admin/profile')
);

Router.post(
  '/change-password',
  authorizeAdmin,
  require('../../controllers/admin/changePassword')
);

Router.post(
  '/change-info',
  authorizeAdmin,
  require('../../controllers/admin/changeinfo')
);

Router.delete(
  '/delete-account',
  authorizeAdmin,
  require('../../controllers/admin/deleteAccount')
);

Router.get(
  '/settings',
  authorizeAdmin,
  require('../../controllers/client/settings')
);

Router.get(
  '/get-users',
  authorizeAdmin,
  require('../../controllers/admin/manageUsers').getAllUsers
);

Router.post(
  '/remove-user',
  authorizeAdmin,
  require('../../controllers/admin/manageUsers').deleteUserAccount
);

Router.get(
  '/get-admins',
  authorizeAdmin,
  require('../../controllers/admin/manageAdmins').getAllAdmins
);

Router.post(
  '/remove-admin',
  authorizeAdmin,
  require('../../controllers/admin/manageAdmins').deleteAdminAccount
);

Router.post(
  '/add-admin',
  authorizeAdmin,
  require('../../controllers/admin/manageAdmins').addAdminUser
);

Router.get(
  '/get-images',
  authorizeAdmin,
  require('../../controllers/admin/manageFiles').getImages
);

Router.get(
  '/get-videos',
  authorizeAdmin,
  require('../../controllers/admin/manageFiles').getVideos
);

Router.get(
  '/get-documents',
  authorizeAdmin,
  require('../../controllers/admin/manageFiles').getDocuments
);

Router.post(
  '/remove-image',
  authorizeAdmin,
  require('../../controllers/admin/manageFiles').removeImage
);

Router.post(
  '/remove-video',
  authorizeAdmin,
  require('../../controllers/admin/manageFiles').removeVideos
);

Router.post(
  '/remove-document',
  authorizeAdmin,
  require('../../controllers/admin/manageFiles').removeDocument
);

module.exports = Router;
