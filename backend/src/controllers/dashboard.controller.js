const Order = require('../models/order.model');
const { prisma } = require('../config/db');

// Dashboard: métricas principales
exports.metrics = async (req, res) => {
	try {
		// Ingresos totales
		const orders = await Order.find({ status: 'PAID' });
		const totalIncome = orders.reduce((sum, o) => sum + o.total, 0);

		// Ventas por día (últimos 7 días)
		const now = new Date();
		const last7Days = Array.from({ length: 7 }).map((_, i) => {
			const d = new Date(now);
			d.setDate(now.getDate() - i);
			return d.toISOString().slice(0, 10);
		}).reverse();
		const salesByDay = last7Days.map(date => ({
			date,
			total: orders.filter(o => o.createdAt.toISOString().slice(0, 10) === date).reduce((sum, o) => sum + o.total, 0)
		}));

		// Ventas por categoría
		const categories = await prisma.category.findMany();
		const products = await prisma.product.findMany();
		const salesByCategory = categories.map(cat => {
			const catProducts = products.filter(p => p.categoryId === cat.id);
			const catProductIds = catProducts.map(p => p.id);
			const catOrders = orders.flatMap(o => o.products.filter(p => catProductIds.includes(p.productId)));
			const total = catOrders.reduce((sum, p) => sum + (p.price * p.quantity), 0);
			return { category: cat.name, total };
		});

		// Totales
		const usersCount = await prisma.user.count();
		const productsCount = await prisma.product.count();
		const ordersCount = await Order.countDocuments();

		res.json({
			totalIncome,
			salesByDay,
			salesByCategory,
			usersCount,
			productsCount,
			ordersCount
		});
	} catch (err) {
		res.status(500).json({ message: 'Error en dashboard', error: err.message });
	}
};
