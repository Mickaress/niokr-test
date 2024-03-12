const Router = require('express');
const adminController = require('../controllers/admin.controller');

const router = Router();

router.get('/projects', adminController.getProjectsInterest);

module.exports = router;
