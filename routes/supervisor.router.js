const Router = require('express');
const supervisorController = require('../controllers/supervisor.controller');

const router = new Router();

router.get('/projects', supervisorController.getProjects);

module.exports = router;
