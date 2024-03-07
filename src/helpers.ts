const CURRENCY_FORMATTER = new Intl.NumberFormat('en', {
  currency: 'USD',
  style: 'currency',
  maximumFractionDigits: 0,
});

export function formatPrice(price: number) {
  return CURRENCY_FORMATTER.format(price);
}
