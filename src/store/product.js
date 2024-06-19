import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    categories: [],
    selectedCategory: null,
    query: '',
    loadingProducts: false,
    loadingCategories: false
  }),
  actions: {
    async fetchProducts({ category, query } = {}) {
      let apiUrl
      this.loadingProducts = true

      if (category) {
        apiUrl = `https://fakestoreapi.com/products/category/${category}`
      } else {
        apiUrl = `https://fakestoreapi.com/products`
      }

      try {
        const res = await fetch(apiUrl)
        const data = await res.json()
        if (data) {
          if (query) {
            this.products = data.filter((product) =>
              product.title.toLowerCase().includes(query.toLowerCase())
            )
          } else {
            this.products = data
          }
        }
      } catch (error) {
        console.log('Error: ', error)
      } finally {
        this.loadingProducts = false
      }
    },
    async fetchCategories() {
      this.loadingCategories = true
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories')
        const data = await res.json()
        if (data) this.categories = data
      } catch (error) {
        console.log('Error: ', error)
      } finally {
        this.loadingCategories = false
      }
    },
    startSearch() {
      this.fetchProducts({ query: this.query })
    },
    resetFilter() {
      this.selectedCategory = null
      this.query = ''
      this.fetchProducts()
    }
  },
  watch: {
    selectedCategory(newVal) {
      this.fetchProducts({ category: newVal })
    }
  }
})
