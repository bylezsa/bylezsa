const Joi = require('joi');

const productSchema = Joi.object({
	name: Joi.string().min(2).max(100).required(),
	description: Joi.string().max(500).allow(''),
	price: Joi.number().positive().required(),
	image_url: Joi.string().uri().allow(''),
	categoryId: Joi.number().integer().required(),
});

exports.validateProduct = (req, res, next) => {
	const { error } = productSchema.validate(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });
	next();
};
