const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
	res.render('auth/auth', {
		title: 'Authorization',
		isAuth: true,
	})
})

router.get('/login', async (req, res) => {
	try {
		req.session.isAuthenticated = true
		res.redirect('/')
	} catch (e) {
		console.log(e)
	}
})

router.get('/logout', async (req, res) => {
	try {
		req.session.destroy(() => {
			res.redirect('/')
		})
	} catch (e) {
		console.log(e)
	}
})

module.exports = router
