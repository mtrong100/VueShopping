<script setup>
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'

const props = defineProps({
  product: Object,
  isInWishlist: Boolean
})

const emit = defineEmits(['toggle-wishlist'])
</script>

<template>
  <div class="p-3 rounded-sm" style="border: 1px solid #dee2e6">
    <RouterLink class="text-gray-800" :to="`/product/${product.id}`">
      <div class="mb-3">
        <div class="relative mx-auto">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-[240px] h-[240px] object-contain border-round"
          />
          <Tag :value="product.category" class="absolute capitalize" style="left: 5px; top: 5px" />
        </div>
      </div>
    </RouterLink>
    <div class="mb-3 font-medium min-h-[43px] line-clamp-2">
      {{ product.title }}
    </div>
    <div class="flex items-center justify-between">
      <div class="mt-0 font-semibold text-xl">${{ product.price }}</div>
      <span>
        <Button
          v-if="isInWishlist"
          icon="pi pi-heart-fill"
          @click="emit('toggle-wishlist', product.id)"
        />
        <Button
          v-else
          @click="emit('toggle-wishlist', product.id)"
          icon="pi pi-heart"
          severity="secondary"
          outlined
        />
        <Button icon="pi pi-shopping-cart" class="ml-2" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
