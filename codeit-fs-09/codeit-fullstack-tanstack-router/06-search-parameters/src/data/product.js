export const products = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `제품 ${i + 1}`,
  category:
    i % 5 === 0 ? 'electronics' : i % 3 === 0 ? 'furniture' : 'clothing',
  price: (i + 1) * 10,
}));
