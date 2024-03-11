const Router = require('express');
const candidateController = require('../controllers/candidate.controller');

const router = Router();

router.post('/responses/:id', candidateController.createResponse);
router.get('/responses', candidateController.getResponses);

module.exports = router;
