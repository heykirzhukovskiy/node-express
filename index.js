const express = require('express')
const exphbs = require('express-handlebars')
const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const coursesRouter = require('./routes/courses')
const app = express()

const PORT = process.env.PORT || 3000

const hbs = exphbs.create({
	defaultLayout: 'main',

	extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/', homeRouter)
app.use('/add', addRouter)
app.use('/courses', coursesRouter)

app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`)
})
