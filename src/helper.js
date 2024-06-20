export const formatCurrency = (value) => {
  if (!value) {
    return '$0.00'
  }

  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
