<script setup>
import { RouterLink } from 'vue-router'
import { useProductStore } from '@/store/useProductStore'
const store = useProductStore()
</script>

<template>
  <header class="bg-slate-50 shadow-sm">
    <div class="page-container flex items-center justify-between">
      <h2>Shopping</h2>

      <div class="flex items-center gap-5">
        <RouterLink class="text-gray-800 font-semibold" to="/">Home</RouterLink>
        <RouterLink class="text-gray-800 font-semibold" to="/product">Products</RouterLink>
      </div>

      <div class="flex items-center gap-6">
        <RouterLink class="text-gray-800 font-semibold" to="/wishlist">
          <i v-badge.danger="store.wishlist.length" class="pi pi-heart" style="font-size: 25px"></i>
        </RouterLink>
        <RouterLink class="text-gray-800 font-semibold" to="/cart">
          <i v-badge.danger="2" class="pi pi-shopping-cart" style="font-size: 25px"></i>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped></style>
