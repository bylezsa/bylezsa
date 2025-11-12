exports.sendOrderToWhatsapp = (order, user) => {
  const productos = order.products.map(p => `- ${p.name} x${p.quantity} ($${p.price})`).join('\n');
  const mensaje = `🛒 Nueva orden de ${user.name} (${user.email}):\n${productos}\nTotal: $${order.total}`;
  console.log('Enviando a WhatsApp:', mensaje);
  return true;
};
