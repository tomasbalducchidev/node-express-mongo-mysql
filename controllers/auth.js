const { matchedData } = require('express-validator')
const { encrypt } = require('../utils/handlePassword')
const { tokenSign } = require('../utils/handleJwt')
const { usersModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { compare } = require('bcryptjs')
 

/**
 * Este controlador es el encargado de registrar un usuario.
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
    const password = await encrypt(req.password)
    const body = {...req, password} // body es un nuevo obj con lo que tiene req + la hashPass que reemplazara a la password plana. 
    const dataUser = await usersModel.create(body)
    dataUser.set('password', undefined, { strict: false })

    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }
    res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_REGISTER_USER')
    }
}

/**
 * Este controlador es el encargado de loguear a un usuario.
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({email: req.email})
        if(!user) {
            handleHttpError(res, 'USER_NOT_FOUND', 404)
            return
        }

        const hashPassword = user.get('password')
        const check = await compare(req.password, hashPassword)

        if(!check) {
            handleHttpError(res, 'PASSWORD_INVALID', 401)
            return
        }

        user.set('password', undefined, {strict:false})

        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data})
        
    } catch (e) {
        handleHttpError(res, 'ERROR_LOGIN_USER')
        
    }

}

module.exports = { registerCtrl, loginCtrl }