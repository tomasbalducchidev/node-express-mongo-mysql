const express = require('express');
const { matchedData } = require('express-validator');
const router = express.Router();
const { validatorRegister, validatorLogin } = require('../validators/auth')
const { encrypt, compare } = require('../utils/handlePassword')
const { usersModel } = require('../models')
const { tokenSign } = require('../utils/handleJwt')
const { registerCtrl, loginCtrl } = require('../controllers/auth')


router.post('/register', validatorRegister, registerCtrl)
router.post('/login', validatorLogin, loginCtrl)

module.exports = router