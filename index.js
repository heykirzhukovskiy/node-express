const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const path = require('path')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const coursesRoutes = require('./routes/courses')
const homeRoutes = require('./routes/home')

const app = express()

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

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

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()
