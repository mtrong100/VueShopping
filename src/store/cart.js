import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('VUE_CART')) || [],
    selectedProduct: [],
    selectedCoupon: null,
    selectedShippingMethod: null
  }),
  getters: {
    subTotal: (state) => {
      return state.selectedProduct.reduce((acc, product) => {
        return acc + product.price * product.quantity
      }, 0)
    },
    total: (state) => {
      const shippingCost = state.selectedShippingMethod ? state.selectedShippingMethod.cost : 0
      const couponDiscount = state.selectedCoupon
        ? (state.subTotal * state.selectedCoupon.discountValue) / 100
        : 0
      return state.subTotal + shippingCost - couponDiscount
    }
  },
  actions: {
    addToCart(product) {
      const productIndex = this.cart.findIndex((item) => item.id === product.id)

      if (productIndex > -1) {
        this.cart[productIndex].quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }

      localStorage.setItem('VUE_CART', JSON.stringify(this.cart))
    },
    removeFromCart(productId) {
      const productIndex = this.cart.findIndex((item) => item.id === productId)
      if (productIndex > -1) {
        this.cart.splice(productIndex, 1)
        localStorage.setItem('VUE_CART', JSON.stringify(this.cart))
      }

      localStorage.setItem('VUE_CART', JSON.stringify(this.cart))
    },
    increaseQuantity(productId) {
      const productIndex = this.cart.findIndex((item) => item.id === productId)
      if (productIndex > -1) {
        this.cart[productIndex].quantity++
      }

      localStorage.setItem('VUE_CART', JSON.stringify(this.cart))
    },
    decreaseQuantity(productId) {
      const productIndex = this.cart.findIndex((item) => item.id === productId)
      if (productIndex > -1) {
        if (this.cart[productIndex].quantity > 1) {
          this.cart[productIndex].quantity--
        } else {
          this.removeFromCart(productId)
        }
      }

      localStorage.setItem('VUE_CART', JSON.stringify(this.cart))
    },
    fetchCart() {
      this.cart = JSON.parse(localStorage.getItem('VUE_CART')) || []
    },
    updateCart(products) {
      products.forEach((product) => {
        const productIndex = this.cart.findIndex((item) => item.id === product.id)
        if (productIndex > -1) {
          this.cart.splice(productIndex, 1)
        }
      })

      localStorage.setItem('VUE_CART', JSON.stringify(this.cart))
    }
  }
})
