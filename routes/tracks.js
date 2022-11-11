const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks');
const router = express.Router();
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks')
const authMiddleware = require('../middlewares/session')
const checkRole = require('../middlewares/role')


/***
 * Lista los items
 */
router.get('/', authMiddleware, authMiddleware, getItems)

/**
 * Obtener detalle de item
 */
router.get('/:id', authMiddleware, validatorGetItem, getItem)


/**
 * Crea un registro
 */
router.post('/', authMiddleware, checkRole(['admin']), validatorCreateItem, createItem)
/**
 * Actualizar un registro
 */
router.put('/:id', authMiddleware, validatorGetItem, validatorCreateItem, updateItem)
/**
 * Eliminar un registro
 */
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem)

module.exports = router