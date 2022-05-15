const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

const mapCartItems = cart =>
	cart.items.map(({ courseId, count }) => ({
		...courseId._doc,
		count,
	}))

const computeCartTotal = courses => courses.reduce((total, course) => total + course.price * course.count, 0)

router.post('/add', async (req, res) => {
	const course = await Course.findById(req.body.id)
	await req.user.addToCart(course)
	res.redirect('/cart')
})

router.delete('/remove/:id', async (req, res) => {
	const cart = await cart.remove(req.params.id)
	res.status(200).json(cart)
})

router.get('/', async (req, res) => {
	const user = await req.user.populate('cart.items.courseId')

	const courses = mapCartItems(user.cart)

	res.render('cart', {
		title: 'Корзина',
		isCart: true,
		courses,
		price: computeCartTotal(courses),
	})
})

module.exports = router
