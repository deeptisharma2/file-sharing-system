const express = require('express');

const folderRoutes = require('../module/folder/folder.route');
const userRoutes = require('../module/user/user.route');
const fileRoutes = require('../module/file/file.route');
const fileFolderRoutes = require('../module/file_folder/file_folder.route');
const shareRoutes = require('../module/share/share.route');

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/folder', folderRoutes);
router.use('/user', userRoutes);
router.use('/file', fileRoutes);
router.use('/file_folder', fileFolderRoutes);
router.use('/share', shareRoutes);

module.exports = router;
