<script setup>
import { onMounted, watch } from 'vue'
import RadioButton from 'primevue/radiobutton'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import ProductCard from '../components/ProductCard.vue'
import Toast from 'primevue/toast'
import { useProductStore } from '@/store/product'
import { useWishlistStore } from '@/store/wishlist'
import Button from 'primevue/button'
import { useCartStore } from '@/store/cart'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const productStore = useProductStore()
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

const startSearch = () => {
  productStore.startSearch()
}

const toggleWishlist = (productItem) => {
  wishlistStore.toggleFavorite(productItem)
}

const isFavoriteProduct = (productId) => {
  return wishlistStore.isFavoriteProduct(productId)
}

onMounted(() => {
  productStore.fetchProducts()
  productStore.fetchCategories()
})

watch(
  () => productStore.selectedCategory,
  (newVal) => {
    productStore.fetchProducts({ category: newVal })
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
              <p>{{ productStore.loadingCategories ? 'Loading categories...' : '' }}</p>

              <div v-for="category in productStore.categories" :key="category">
                <RadioButton
                  v-model="productStore.selectedCategory"
                  :name="category"
                  :value="category"
                  :inputId="category"
                />
                <label :for="category" class="ml-2 capitalize">{{ category }}</label>
              </div>
            </div>
          </div>

          <Button
            @click="productStore.resetFilter"
            class="w-full"
            label="Reset filter"
            severity="contrast"
          />
        </aside>

        <div>
          <IconField iconPosition="left">
            <InputIcon class="pi pi-search"></InputIcon>
            <InputText
              v-model="productStore.query"
              placeholder="Search for products..."
              class="w-full"
              @change="startSearch"
            />
          </IconField>

          <p
            class="text-center my-5"
            v-if="!productStore.loadingProducts && productStore.products.length === 0"
          >
            Products not found...
          </p>

          <p v-if="productStore.loadingProducts" class="text-center my-5">Loading products...</p>

          <div v-else class="mt-5 grid grid-cols-3 gap-3">
            <ProductCard
              v-for="product in productStore.products"
              :key="product.id"
              :product="product"
              :isInWishlist="isFavoriteProduct(product.id)"
              @toggle-wishlist="toggleWishlist"
              @add-to-cart="addProductToCart"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
