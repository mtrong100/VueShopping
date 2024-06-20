export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    estimatedDelivery: '5-7 business days',
    cost: 5.99
  },
  {
    id: 'express',
    name: 'Express Shipping',
    estimatedDelivery: '2-3 business days',
    cost: 15.99
  },
  {
    id: 'international',
    name: 'International Shipping',
    estimatedDelivery: '7-14 business days',
    cost: 29.99
  },
  {
    id: 'free',
    name: 'Free Shipping',
    estimatedDelivery: '7-10 business days',
    cost: 0.0
  }
]

export const COUPON_CODES = [
  {
    code: 'SUMMER20',
    discountValue: 20
  },
  {
    code: 'WELCOME10',
    discountValue: 10
  },
  {
    code: 'SAVE15',
    discountValue: 15
  },
  {
    code: 'BLACKFRIDAY',
    discountValue: 30
  }
]
