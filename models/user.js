const { Schema, model } = require('mongoose')

const user = new Schema({
	name: { type: String, required: true },
	nickname: { type: String, required: true },
	pass: { type: String, required: true },
	email: { type: String, required: true },
	avatar: String,
	cart: {
		items: [
			{
				count: { type: Number, required: true, default: 1 },
				courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
			},
		],
	},
})

module.exports = model('User', user)
