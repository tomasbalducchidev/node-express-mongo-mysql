const { matchedData } = require('express-validator')
const { tracksModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')

/**
 * Obtener lista de la db.
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {

    try {
        const user = req.user
        const data = await tracksModel.findAllData({})
        res.send({data, user})
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEMS')
    }


}

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {

    try {

        req = matchedData(req)
        const {id} = req
        const data = await tracksModel.findOneData(id)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_GET_ITEM')
    }
}

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {

    try {

        const body = matchedData(req)
        const data = await tracksModel.create(body)
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {

    try {
        const {id, ...body} = matchedData(req) // de matchedData extrae dos const; el id y el resto del body, para asi encontrar por id y actualizar el body sin el id.
        const data = await tracksModel.findOneAndUpdate(
            id, body
        )
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_UPDATE_ITEMS')
    }
}

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {

        req = matchedData(req)
        const {id} = req
        const data = await tracksModel.delete({_id:id})
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };