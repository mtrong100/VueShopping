export const formatCurrency = (value) => {
  if (!value) {
    return '$0.00'
  }

  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
