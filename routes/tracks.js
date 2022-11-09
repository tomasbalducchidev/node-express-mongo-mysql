const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks');
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks')


/***
 * Lista los items
 */
router.get('/', getItems)

/**
 * Obtener detalle de item
 */
router.get('/:id', validatorGetItem, getItem)


/**
 * Crea un registro
 */
router.post('/', validatorCreateItem, createItem)
/**
 * Actualizar un registro
 */
router.put('/:id', validatorGetItem, validatorCreateItem, updateItem)
/**
 * Eliminar un registro
 */
router.delete('/:id', validatorGetItem, deleteItem)

module.exports = router