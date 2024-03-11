const Router = require('express');
const skillController = require('../controllers/skill.controller');

const router = Router();

router.get('/', skillController.getAll);

module.exports = router;
