const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

const mapCartItems = cart =>
	cart.items.map(({ courseId, count }) => ({
		...courseId._doc,
		id: courseId._id,
		count,
	}))

const computeCartTotal = courses => courses.reduce((total, course) => total + course.price * course.count, 0)

router.post('/add', async (req, res) => {
	try {
		const course = await Course.findById(req.body.id)
		await req.user.addToCart(course)
		res.redirect('/cart')
	} catch (error) {
		console.log(error)
	}
})

router.delete('/remove/:id', async (req, res) => {
	try {
		await req.user.removeFromCart(req.params.id)

		const user = await req.user.populate('cart.items.courseId')
		const items = mapCartItems(user.cart)
		const cart = {
			items,
			price: computeCartTotal(items),
		}

		res.status(200).json(cart)
	} catch (error) {
		console.log(error)
	}
})

router.get('/', async (req, res) => {
	try {
		const user = await req.user.populate('cart.items.courseId')

		const courses = mapCartItems(user.cart)

		res.render('cart', {
			title: 'Корзина',
			isCart: true,
			courses,
			price: computeCartTotal(courses),
		})
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
