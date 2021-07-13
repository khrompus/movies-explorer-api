const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./User');
const movieRouter = require('./Movie');
const auth = require('../middlewares/Auth');
const { createUser, login } = require('../controllers/User');

const signUpValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const signInValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

router.post('/signup', signUpValidate, createUser);
router.post('/signin', signInValidate, login);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
