const Router = require('express');
const projectRouter = require('./project.router');
const supervisorRouter = require('./supervisor.router');
const vacancyRouter = require('./vacancy.router');
const skillRouter = require('./skill.router');
const userRouter = require('./user.router');
const candidateRouter = require('./candidate.router');
const adminRouter = require('./admin.router');

const router = new Router();

router.use('/projects', projectRouter);
router.use('/supervisor', supervisorRouter);
router.use('/vacancies', vacancyRouter);
router.use('/skills', skillRouter);
router.use('/user', userRouter);
router.use('/candidate', candidateRouter);
router.use('/admin', adminRouter);

module.exports = router;
