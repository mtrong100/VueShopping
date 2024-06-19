import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlist: JSON.parse(localStorage.getItem('VUE_WISHLIST')) || []
  }),
  actions: {
    toggleFavorite(product) {
      const productIndex = this.wishlist.findIndex((item) => item.id === product.id)
      if (productIndex > -1) {
        this.wishlist.splice(productIndex, 1)
      } else {
        this.wishlist.push(product)
      }
      localStorage.setItem('VUE_WISHLIST', JSON.stringify(this.wishlist))
    },
    isFavoriteProduct(productId) {
      return this.wishlist.some((item) => item.id === productId)
    },
    fetchWishlist() {
      this.wishlist = JSON.parse(localStorage.getItem('VUE_WISHLIST')) || []
    },
    removeProduct(productId) {
      const productIndex = this.wishlist.findIndex((item) => item.id === productId)
      if (productIndex > -1) {
        this.wishlist.splice(productIndex, 1)
        localStorage.setItem('VUE_WISHLIST', JSON.stringify(this.wishlist))
      }
    }
  }
})
