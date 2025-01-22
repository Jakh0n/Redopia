const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const orderModel = require('../models/order.model')
const transactionModel = require('../models/transaction.model')
const AdminController = new (class {
	constructor() {
		this.userId = '678f0308be4994c812397c86'
		this.createProduct = this.createProduct.bind(this)
		this.getProduct = this.getProduct.bind(this)
		this.updateProduct = this.updateProduct.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
		this.getCustomers = this.getCustomers.bind(this)
		this.getOrders = this.getOrders.bind(this)
		this.getTransactions = this.getTransactions.bind(this)
		this.updateOrder = this.updateOrder.bind(this)
	}

	// {GET} /admin/products
	async getProduct(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const products = await productModel.find()
			return res.json({ success: 'Get products successfully', products })
		} catch (error) {
			next(error)
		}
	}

	//{GET} /admin/getCustomers
	async getCustomers(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'user not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not Admin' })
			const customers = await userModel.find({ role: 'user' })
			return res.json({ success: 'Get customers succesfully', customers })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /admin/orders
	async getOrders(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res, json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failrue: 'User is not Admin' })
			const orders = await orderModel.find()
			return res.json({ success: 'Ger order successfully', orders })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /admin/transactions
	async getTransactions(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const transactions = await transactionModel.find()
			return res.json({
				success: 'Get transactions successfully',
				transactions,
			})
		} catch (error) {
			next(error)
		}
	}

	// {POST} /admin/create-product
	async createProduct(req, res, next) {
		try {
			const data = req.body
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not  found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const newProduct = await productModel.create({
				...data,
				price: parseInt(data.price),
			})
			if (!newProduct)
				return res.json({ failure: 'Failed while product creation' })
			return res.json({ success: 'Product created Successfully' })
		} catch (error) {
			next(error)
		}
	}

	// {PUT} /admin/update-product/:id
	async updateProduct(req, res, next) {
		try {
			const data = req.body
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const updateProduct = await productModel.findByIdAndUpdate(id, data)
			if (!updateProduct)
				return res.json({ failure: 'Failed while Product Update' })
			return res.json({ success: 'Updated Successfully' })
		} catch (error) {
			next(error)
		}
	}
	// [PUT] /admin/update-order/:id
	async updateOrder(req, res, next) {
		try {
			const { status } = req.body
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const updatedOrder = await orderModel.findByIdAndUpdate(id, { status })
			if (!updatedOrder)
				return res.json({ failure: 'Failed while updating order' })
			return res.json({ success: 'Order updated successfully' })
		} catch (error) {
			next(error)
		}
	}

	// {DELETE} /admin/delete-product/:id
	async deleteProduct(req, res, next) {
		try {
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const deletedProduct = await productModel.findByIdAndDelete(id)
			if (!deletedProduct)
				return res.json({ failure: 'Failed while deleting product' })
			return res.json({ success: 'Product deleted successfully' })
		} catch (error) {
			next(error)
		}
	}
})()
module.exports = AdminController
