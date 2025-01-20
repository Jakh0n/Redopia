const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
class AdminController {
	constructor() {
		this.userId = 'qwe7q7as7qwe7as7awq7'
		this.createProduct = this.createProduct.bind(this)
	}
	// {GET} /admin/products
	async getProducts(req, res, next) {
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
	// {Post} /admin/create-product
	async createProducts(req, res, next) {
		try {
			const data = req.body
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin')
				return res.json({ failure: 'User is not admin' })
			const newProduct = await productModel.create({
				...data,
				price: parseInt(data.price),
			})
			if (!newProduct)
				return res.json({ failure: 'Failed while product creation' })
			return res.json({ succes: 'Product created Successfully' })
		} catch (error) {
			next(error)
		}
	}
	// {PUT} /admin/update-product/:id
	async updateProduct(req, res, next) {
		const data = req.body
		const { id } = req.params
		const userId = this.userId
		const user = await userModel.findById(userId)
		if (!userId) return res.json({ failure: 'User not Found' })
		if (user !== 'admin') return res.json({ failure: 'User is not Admin' })
		const updateProduct = await productModel.findByIdAndUpdate(id, data)
		if (!updateProduct)
			return res.json({ failed: 'Failed while Product Update' })
		return res.json('Updated Successfully')
		try {
		} catch (error) {
			next(error)
		}
	}
	// {DELETE} /admin/delete-product/;id
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
}
