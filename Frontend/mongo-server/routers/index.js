const {errorHandler, respond} = require('../middlewares');

const indexRouter = require('express').Router();

indexRouter.use(respond);
indexRouter.use(errorHandler);

module.exports = indexRouter