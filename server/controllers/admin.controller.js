const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const orderModel = require('../models/order.model')
const transactionModel = require('../models/transaction.model')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
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
		const { searchQuery, filter, category, page, pageSize } = req.query
		const skipAmmount = (+page - 1) * +pageSize
		const query = {}

		try {
			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&'
				)
				query.$or = [{ title: { $regex: new RegExp(escapedSearchQuery, 'i') } }]
			}
			if (category === 'All') query.category = { $exists: true }
			else if (category !== 'All') {
				if (category) query.category = category
			}
			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }
			const products = await productModel
				.find(query)
				.sort(sortOptions)
				.skip(skipAmmount)
				.limit(+pageSize)

			const totalProducts = await productModel.countDocuments(query)
			const isNext = totalProducts > skipAmmount + +products.length
			return res.json({ products, isNext })
		} catch (error) {
			next(error)
		}
	}

	//{GET} /admin/getCustomers
	async getCustomers(req, res, next) {
		try {
			const { searchQuery, filter, category, page, pageSize } = req.query
			const skipAmmount = (+page - 1) * +pageSize
			const query = {}
			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&'
				)
				query.$or = [
					{ fullName: { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ email: { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}
			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }
			const customers = await userModel.aggregate([
				{ $match: query },
				{
					$lookup: {
						from: 'orders',
						localField: '_id',
						foreignField: 'user',
						as: 'orders',
					},
				},
				{ $addFields: { orderCount: { $size: '$orders' } } },
				{ $unwind: { path: '$orders', preserveNullAndEmptyArrays: true } },
				{
					$group: {
						_id: '$_id',
						email: { $first: '$email' },
						fullName: { $first: '$fullName' },
						role: { $first: '$role' },
						createdAt: { $first: '$createdAt' },
						updatedAt: { $first: '$updatedAt' },
						totalPrice: { $sum: '$orders.price' },
						orderCount: { $first: '$orderCount' },
						isDeleted: { $first: '$isDeleted' },
					},
				},
				{ $sort: sortOptions },
				{ $skip: skipAmmount },
				{ $limit: +pageSize },
			])

			const totalCustomers = await userModel.countDocuments(query)
			const isNext = totalCustomers > skipAmmount + +customers.length
			return res.json({ customers, isNext })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /admin/orders
	async getOrders(req, res, next) {
		try {
			const { searchQuery, filter, page, pageSize } = req.query
			const skipAmount = (page - 1) * pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&'
				)
				query.$or = [
					{ 'user.fullName': { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ 'user.email': { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ 'product.title': { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }
			const orders = await orderModel.aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'user',
					},
				},
				{ $unwind: '$user' },
				{
					$lookup: {
						from: 'products',
						localField: 'product',
						foreignField: '_id',
						as: 'product',
					},
				},
				{ $unwind: '$product' },
				{ $match: query },
				{ $sort: sortOptions },
				{ $skip: skipAmount },
				{ $limit: +pageSize },
				{
					$project: {
						'user.email': 1,
						'user.fullName': 1,
						'product.title': 1,
						price: 1,
						createdAt: 1,
						status: 1,
					},
				},
			])
			const totalOrders = await orderModel.countDocuments(query)
			const isNext = totalOrders > skipAmount + +orders.length
			return res.json({ orders, isNext })
		} catch (error) {
			next(error)
		}
	}
	// [GET] /admin/transactions
	async getTransactions(req, res, next) {
		try {
			const { searchQuery, filter, page, pageSize } = req.query
			const skipAmount = (page - 1) * pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&'
				)
				query.$or = [
					{ 'user.fullName': { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ 'user.email': { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ 'product.title': { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const transactions = await transactionModel.aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'user',
					},
				},
				{ $unwind: '$user' },
				{
					$lookup: {
						from: 'products',
						localField: 'product',
						foreignField: '_id',
						as: 'product',
					},
				},
				{ $unwind: '$product' },
				{ $match: query },
				{ $sort: sortOptions },
				{ $skip: skipAmount },
				{ $limit: +pageSize },
				{
					$project: {
						'user.email': 1,
						'user.fullName': 1,
						'product.title': 1,
						'product.price': 1,
						amount: 1,
						createdAt: 1,
						state: 1,
						provider: 1,
					},
				},
			])

			const totalTransactions = await transactionModel.countDocuments(query)
			const isNext = totalTransactions > skipAmount + +transactions.length

			return res.json({ transactions, isNext })
		} catch (error) {
			next(error)
		}
	}

	// {POST} /admin/create-product
	async createProduct(req, res, next) {
		try {
			const userId = req.user._id
			const newProduct = await productModel.create(req.body)

			if (!newProduct)
				return res.json({ failure: 'Failed while creating product' })
			const product = await stripe.products.create({
				name: newProduct.title,
				images: [newProduct.image],
				metadata: {
					productId: newProduct._id.toString(),
					userId: userId.toString(),
				},
			})
			const exchangeRate = 12850
			const amountInUSD = newProduct.price / exchangeRate
			const price = await stripe.prices.create({
				product: product.id,
				unit_amount: amountInUSD.toFixed(0) * 100,
				currency: 'usd',
				metadata: {
					productId: newProduct._id.toString(),
					userId: userId.toString(),
				},
			})
			await productModel.findByIdAndUpdate(newProduct._id, {
				stripeProductId: product.id,
				stripePriceId: price.id,
			})
			return res.json({ status: 201 })
		} catch (error) {
			console.log(error)
			next(error)
		}
	}

	// {PUT} /admin/update-product/:id
	async updateProduct(req, res, next) {
		try {
			const data = req.body
			const { id } = req.params
			const updateProduct = await productModel.findByIdAndUpdate(id, data)
			if (!updateProduct)
				return res.json({ failure: 'Failed while Product Update' })
			return res.json({ status: 200 })
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
			const deletedProduct = await productModel.findByIdAndDelete(id)
			if (!deletedProduct)
				return res.json({ failure: 'Failed while deleting product' })
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
})()
module.exports = AdminController
