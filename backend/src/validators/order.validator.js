const Joi = require('joi');

const orderSchema = Joi.object({
	products: Joi.array().items(
		Joi.object({
			productId: Joi.number().integer().required(),
			name: Joi.string().required(),
			price: Joi.number().positive().required(),
			quantity: Joi.number().integer().min(1).required(),
		})
	).min(1).required(),
	total: Joi.number().positive().required(),
});

exports.validateOrder = (req, res, next) => {
	const { error } = orderSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });
	next();
};
