const router = require('express').Router()
const adminController = require('../controllers/admin.controller')

router.get('/products', adminController.getProducts)
router.post('/create-product', adminController.getProducts)
router.put('/update-product/:id', adminController.getProducts)
router.get('/delete-product/:id', adminController.getProducts)

module.exports = router
