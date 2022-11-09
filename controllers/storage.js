const fs = require('fs')
const { matchedData } = require('express-validator')
const { storageModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`

/**
 * Obtener lista de la db.
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send({data})
    } catch(e) {
        handleHttpError(res, 'ERROR_LIST_ITEMS')
    }
}

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await storageModel.findById(id)
        res.send({data})
    } catch(e) {
        handleHttpError(res, 'ERROR_DETAIL_ITEMS')
    }
}

/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const { file } = req
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})
    } catch(e) {
        handleHttpError(res, 'ERROR_CREATE_ITEMS')

    }
}

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {}

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const dataFile = await storageModel.findById(id)
        // await storageModel.deleteOne(id) // borrado fisico, no logico.
        await storageModel.delete({_id:id}) // soft delete, logico.
        const { filename } = dataFile
        const filePath = `${MEDIA_PATH}/${filename}` // ruta completa de la pc. 

        // fs.unlinkSync(filePath) // parte del borrado fisico.
        const data = {
            filePath,
            deleted: 1
        }
        res.send({data})
    } catch(e) {
        handleHttpError(res, 'ERROR_DELETE_ITEMS')
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };