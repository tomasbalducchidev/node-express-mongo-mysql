const { handleHttpError } = require("../utils/handleError")

/**
 * Array con los roles permitidos.
 * @param {*} rol 
 * @returns 
 */
const checkRole = (roles) => (req, res, next) => {
    try {
        const { user } = req
        console.log({ user });
        const rolesByUser = user.role // por defecto user.

        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
        if (!checkValueRol) {
            handleHttpError(res, 'USER_NOT_PERMISSIONS', 403)
            return
        }
        next()
    } catch (e) {
        handleHttpError(res, 'ERROR_PERMISSIONS', 403)
        
    } 
}

module.exports = checkRole