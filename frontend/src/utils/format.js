// src/utils/format.js
export function formatCurrencyCUP(amount) {
  // amount en unidades (ej 12.34)
  return `${Number(amount).toLocaleString('es-ES', { minimumFractionDigits: 2 })} CUP`;
}


