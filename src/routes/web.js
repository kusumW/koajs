const Router = require('koa-router');

const router = new Router();

const getApi = require('../controller/controller');
router.get('/users', getApi.findAll);
router.post('/users', getApi.create);
router.put('/users/:id', getApi.update);
router.delete('/users/:id', getApi.remove);
router.get('/users/:id', getApi.findOne);


module.exports = router;
