<script setup>
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'
import Tag from 'primevue/tag'

const props = defineProps({
  products: Array,
  isFavoriteProduct: Function,
  numVisible: Number,
  numScroll: Number
})

const emit = defineEmits(['toggle-wishlist', 'add-to-cart'])
</script>

<template>
  <Carousel :value="products" :numVisible="numVisible || 3" :numScroll="numScroll || 1">
    <template #item="slotProps">
      <div class="border-1 surface-border border-round m-2 p-3">
        <RouterLink class="text-gray-800" :to="`/product/${slotProps.data?.id}`">
          <div class="mb-3">
            <div class="relative mx-auto flex items-center justify-center">
              <img
                :src="slotProps.data?.image"
                :alt="slotProps.data?.name"
                class="w-[240px] h-[240px] object-contain border-round"
              />
              <Tag
                :value="slotProps.data?.category"
                class="absolute capitalize"
                style="left: 5px; top: 5px"
              />
            </div>
          </div>
        </RouterLink>

        <div class="mb-3 font-medium min-h-[43px] line-clamp-2">
          {{ slotProps.data?.title }}
        </div>
        <div class="flex items-center justify-between">
          <div class="mt-0 font-semibold text-xl">${{ slotProps.data?.price }}</div>
          <span>
            <Button
              v-if="isFavoriteProduct(slotProps.data?.id)"
              icon="pi pi-heart-fill"
              @click="emit('toggle-wishlist', slotProps.data)"
            />
            <Button
              v-else
              @click="emit('toggle-wishlist', slotProps.data)"
              icon="pi pi-heart"
              severity="secondary"
              outlined
            />
            <Button
              icon="pi pi-shopping-cart"
              class="ml-2"
              @click="emit('add-to-cart', slotProps.data)"
            />
          </span>
        </div>
      </div>
    </template>
  </Carousel>
</template>

<style lang="scss" scoped></style>
