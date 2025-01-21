const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const AdminController = new (class {
	constructor() {
		this.userId = '678f0308be4994c812397c86'
		this.createProduct = this.createProduct.bind(this)
		this.getProduct = this.getProduct.bind(this)
		this.updateProduct = this.updateProduct.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
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
