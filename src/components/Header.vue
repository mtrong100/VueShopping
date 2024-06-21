<script setup>
import { RouterLink } from 'vue-router'
import { useWishlistStore } from '@/store/wishlist'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const userStore = useUserStore()
</script>

<template>
  <header class="bg-slate-50 shadow-sm">
    <div class="page-container flex items-center justify-between">
      <h2>VueStore</h2>

      <div class="flex items-center gap-5">
        <RouterLink class="text-gray-800 font-semibold" to="/">Home</RouterLink>
        <RouterLink class="text-gray-800 font-semibold" to="/product">Products</RouterLink>

        <RouterLink
          v-if="!userStore.currentUser?.isLogin"
          class="text-gray-800 font-semibold"
          to="/login"
          >Login</RouterLink
        >
        <RouterLink
          v-if="userStore.currentUser?.isLogin"
          class="text-gray-800 font-semibold"
          to="/profile"
          >Profile</RouterLink
        >
        <RouterLink
          v-if="userStore.currentUser?.isLogin"
          class="text-gray-800 font-semibold"
          to="/myorder"
          >My Orders</RouterLink
        >
      </div>

      <div class="flex items-center gap-6">
        <RouterLink class="text-gray-800 font-semibold" to="/wishlist">
          <i
            v-badge.danger="wishlistStore.wishlist.length"
            class="pi pi-heart"
            style="font-size: 25px"
          ></i>
        </RouterLink>
        <RouterLink class="text-gray-800 font-semibold" to="/cart">
          <i
            v-badge.danger="cartStore.cart.length"
            class="pi pi-shopping-cart"
            style="font-size: 25px"
          ></i>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
