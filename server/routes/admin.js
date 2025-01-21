const router = require('express').Router()
const adminController = require('../controllers/admin.controller')

router.get('/products', adminController.getProduct)
router.post('/create-product', adminController.createProduct)
router.put('/update-product/:id', adminController.updateProduct)
router.delete('/delete-product/:id', adminController.deleteProduct)

module.exports = router
