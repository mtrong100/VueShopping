<script setup>
import { useWishlistStore } from '@/store/wishlist'
import ProductCardSlider from './ProductCardSlider.vue'
import { useCartStore } from '@/store/cart'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const props = defineProps({
  relatedProducts: Array
})

const toast = useToast()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const addProductToCart = (product) => {
  cartStore.addToCart(product)
  toast.add({
    severity: 'success',
    summary: 'Product added to cart',
    life: 1500
  })
}

const toggleWishlist = (productItem) => {
  wishlistStore.toggleFavorite(productItem)
}

const isFavoriteProduct = (productId) => {
  return wishlistStore.isFavoriteProduct(productId)
}
</script>

<template>
  <div class="card">
    <Toast />
    <ProductCardSlider
      :products="relatedProducts"
      :isFavoriteProduct="isFavoriteProduct"
      @toggle-wishlist="toggleWishlist"
      @add-to-cart="addProductToCart"
    />
  </div>
</template>

<style lang="scss" scoped></style>
