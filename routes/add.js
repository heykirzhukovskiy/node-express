const { Router } = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res, next) => {
	res.render('add', {
		title: 'Add Course',
		isAdd: true,
	})
})

router.post('/', (req, res) => {
	const { title, price, img } = req.body

	const course = new Course(title, price, img)
	course.save()

	res.redirect('/courses')
})

module.exports = router
