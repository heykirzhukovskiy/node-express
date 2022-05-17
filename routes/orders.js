const { Router } = require('express')
const Order = require('../models/order')
const router = Router()

router.get('/', async (req, res) => {
	try {
		const { user } = req
		const orders = await Order.find({ 'user.id': user._id })

		res.render('orders', {
			title: 'Заказы',
			isOrders: true,
			orders: orders.map(o => ({
				...o._doc,
				price: o.courses.reduce((total, c) => total + c.course.price * c.count, 0),
			})),
		})
	} catch (e) {
		console.log(e)

		res.redirect('/')
	}
})

router.post('/', async (req, res) => {
	try {
		const user = await req.user.populate('cart.items.courseId')

		const courses = user.cart.items.map(({ count, courseId }) => {
			return {
				count: count,
				course: { ...courseId._doc },
			}
		})

		const order = new Order({ user: { name: user.name, id: user._id }, courses })

		await order.save()
		await user.clearCart()

		res.redirect('/orders')
	} catch (e) {
		console.log(e)

		res.redirect('/')
	}
})

module.exports = router
