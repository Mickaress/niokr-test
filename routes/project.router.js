const Router = require('express');
const projectController = require('../controllers/project.controller.js');

const router = new Router();

router.get('/', projectController.getAll);
router.get('/:id', projectController.getOne);

module.exports = router;
