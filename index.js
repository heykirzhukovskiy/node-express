const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose')
const path = require('path')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const coursesRoutes = require('./routes/courses')
const homeRoutes = require('./routes/home')
const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
	handlebars: allowInsecurePrototypeAccess(Handlebars),
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
	try {
		const user = await User.findById('626c8941cd7ffa0456bd2a56')

		req.user = user

		next()
	} catch (e) {
		console.log(e)
	}
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

const start = async () => {
	const url = `mongodb+srv://kpetunin:Mongo-Admin01@cluster0.a1bkr.mongodb.net/shop`

	try {
		await mongoose.connect(url, { useNewUrlParser: true })

		const candidate = await User.findOne()

		if (!candidate) {
			const user = new User({ email: 'zhuwork@yandex.ru', name: 'Kirill', cart: { items: [] } })

			await user.save()
		}

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()
