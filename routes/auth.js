const express = require('express');
const { matchedData } = require('express-validator');
const router = express.Router();
const { validatorRegister, validatorLogin } = require('../validators/auth')
const { encrypt, compare } = require('../utils/handlePassword')
const { usersModel } = require('../models')


router.post('/register', validatorRegister, async (req, res) => {

    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = {...req, password} // body es un nuevo obj con lo que tiene req + la hashPass que reemplazara a la password plana. 
    const data = await usersModel.create(body)
    data.set('password', undefined, { strict: false })
    res.send({data})

})

module.exports = router