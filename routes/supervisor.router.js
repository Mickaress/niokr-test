const Router = require('express');
const supervisorController = require('../controllers/supervisor.controller');

const router = new Router();

router.get('/projects', supervisorController.getProjects);
router.post('/vacancy/create', supervisorController.createVacancies);
router.get('/project/vacancies', supervisorController.getProjectVacancies);
router.get('/active/projects', supervisorController.getActiveProjects);
router.get('/vacancy/:vacancyId/responses', supervisorController.getVacancyResponses);

module.exports = router;
