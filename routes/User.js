const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, updateUser,
} = require('../controllers/User');

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

router.get('/me', getUser);
router.patch('/me', updateUserValidate, updateUser);

module.exports = router;
