const Router = require('express');
const candidateController = require('../controllers/candidate.controller');

const router = Router();

router.post('/responses/:id', candidateController.createResponse);
router.get('/responses', candidateController.getResponses);
router.post('/skills', candidateController.updateSkills);
router.post('/competencies', candidateController.updateCompetencies);

module.exports = router;
