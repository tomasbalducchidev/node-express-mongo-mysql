const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: '2h'
        }
    )

    return sign
}


/**
 * Debes pasar el token de sesion
 * @param {*} tokenJWT 
 * @returns 
 */
const verifyToken = async (tokenJWT) => {
    try {
        return jwt.verify(tokenJWT, JWT_SECRET)
    } catch (e) {
        return null
        
    }
}

module.exports = { tokenSign, verifyToken }