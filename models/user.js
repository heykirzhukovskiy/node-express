const { Schema, model } = require('mongoose')

const user = new Schema({
	name: { type: String, required: true },
	// nickname: { type: String, required: true },
	// pass: { type: String, required: true },
	email: { type: String, required: true },
	// avatar: String,
	cart: {
		items: [
			{
				count: { type: Number, required: true, default: 1 },
				courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
			},
		],
	},
})

user.methods.addToCart = function (course) {
	const items = [...this.cart.items]
	const idx = items.findIndex(item => item.courseId.toString() === course._id.toString())

	if (idx >= 0) {
		items[idx].count++
	} else {
		items.push({
			courseId: course._id,
			count: 1,
		})
	}

	this.cart = { items }
	return this.save()
}

user.methods.removeFromCart = function (courseId) {
	const items = [...this.cart.items]
	const idx = items.findIndex(item => item.courseId.toString() === courseId.toString())

	if (items[idx].count === 1) {
		items.splice(idx, 1)
	} else {
		items[idx].count--
	}

	this.cart = { items }
	return this.save()
}

module.exports = model('User', user)
