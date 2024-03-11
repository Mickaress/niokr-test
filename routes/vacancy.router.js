const Router = require('express');
const vacancyController = require('../controllers/vacancy.controller');

const router = new Router();

router.get('/', vacancyController.getAll);
router.get('/:id', vacancyController.getOne);

module.exports = router;
