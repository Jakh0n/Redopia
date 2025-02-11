const router = require('express').Router()
const adminController = require('../controllers/admin.controller')
const userMiddleware = require('../middlewares/user.middleware')

router.get('/products', adminController.getProduct)
router.get('/customers', adminController.getCustomers)
router.get('/orders', adminController.getOrders)
router.get('/transactions', adminController.getTransactions)

router.post('/create-product', userMiddleware, adminController.createProduct)

router.put('/update-product/:id', userMiddleware, adminController.updateProduct)
router.put('/update-order/:id', adminController.updateOrder)

router.delete('/delete-product/:id', adminController.deleteProduct)

module.exports = router
