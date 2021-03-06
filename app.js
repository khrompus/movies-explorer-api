require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/index');
const errorRouter = require('./routes/Error');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const { settingCors, mongodbUrl, mongodbSetting } = require('./utils/const');
const { limiter } = require('./utils/rateLimiter');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(mongodbUrl, mongodbSetting);
app.use('*', cors(settingCors));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use(router);
router.use('/', errorRouter);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Active!');
});
