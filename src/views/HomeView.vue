<script setup>
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="bg-green-100 min-h-[90vh] flex items-center justify-center">
    <div class="flex flex-col items-center justify-center space-y-5">
      <h1 class="text-7xl font-bold text-gray-800 mb-4 text-center leading-snug">
        Explore our products <br />
        at VueStore
      </h1>
      <p class="text-3xl text-gray-600 mb-6">Welcome to VueStore!</p>
      <Button label="Shop Now" size="large" @click="router.push('/product')" />
    </div>
  </div>
</template>
