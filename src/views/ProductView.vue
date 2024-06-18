<script setup>
import { onMounted, watch } from 'vue'
import RadioButton from 'primevue/radiobutton'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import ProductCard from '../components/ProductCard.vue'
import Toast from 'primevue/toast'
import { useProductStore } from '@/store/useProductStore'
import Button from 'primevue/button'

const store = useProductStore()

const startSearch = () => {
  store.startSearch()
}

const toggleWishlist = (productId) => {
  store.toggleWishlist(productId)
}

const isProductInWishlist = (productId) => {
  return store.isProductInWishlist(productId)
}

onMounted(() => {
  store.fetchProducts()
  store.fetchCategories()
})

watch(
  () => store.selectedCategory,
  (newVal) => {
    store.fetchProducts({ category: newVal })
  }
)
</script>

<template>
  <main class="py-10">
    <div class="page-container">
      <Toast />

      <div class="grid grid-cols-[250px,minmax(0,1fr)] gap-5 items-start">
        <aside class="space-y-5 h-full">
          <div>
            <h3>Sort by category</h3>

            <div class="list-none mt-4 space-y-3">
              <p>{{ store.loadingCategories ? 'Loading categories...' : '' }}</p>

              <div v-for="category in store.categories" :key="category">
                <RadioButton
                  v-model="store.selectedCategory"
                  :name="category"
                  :value="category"
                  :inputId="category"
                />
                <label :for="category" class="ml-2 capitalize">{{ category }}</label>
              </div>
            </div>
          </div>

          <Button
            @click="store.resetFilter"
            class="w-full"
            label="Reset filter"
            severity="contrast"
          />
        </aside>

        <div>
          <IconField iconPosition="left">
            <InputIcon class="pi pi-search"></InputIcon>
            <InputText
              v-model="store.query"
              placeholder="Search for products..."
              class="w-full"
              @change="startSearch"
            />
          </IconField>

          <p class="text-center my-5" v-if="!store.loadingProducts && store.products.length === 0">
            Products not found...
          </p>

          <p v-if="store.loadingProducts" class="text-center my-5">Loading products...</p>

          <div v-else class="mt-5 grid grid-cols-3 gap-3">
            <ProductCard
              v-for="product in store.products"
              :key="product.id"
              :product="product"
              :isInWishlist="isProductInWishlist(product.id)"
              @toggle-wishlist="toggleWishlist"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
