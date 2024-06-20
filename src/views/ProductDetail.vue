<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import Image from 'primevue/image'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { useCartStore } from '@/store/cart'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { useWishlistStore } from '@/store/wishlist'
import RelatedProduct from '@/components/RelatedProduct.vue'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const product = ref(null)
const relatedProducts = ref([])
const route = useRoute()
const loadingProduct = ref(false)
const toast = useToast()
const quantity = ref(1)

const onIncreaseQuantity = () => {
  quantity.value++
}

const onDecreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

const addProductToCart = (product) => {
  cartStore.addProductWithQuantity(product, quantity.value)
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

const fetchProduct = async () => {
  loadingProduct.value = true

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${route.params.id}`)
    const data = await res.json()
    if (data) product.value = data
  } catch (error) {
    console.log('Error: ', error)
  } finally {
    loadingProduct.value = false
  }
}

const fetchRelatedProducts = async () => {
  if (!product.value?.category) return

  try {
    const res = await fetch(`https://fakestoreapi.com/products/category/${product.value?.category}`)
    const data = await res.json()
    if (data) relatedProducts.value = data
    console.log(data)
  } catch (error) {
    console.log('Error: ', error)
  }
}

onMounted(() => {
  fetchProduct()
})

watch(product, (newProduct) => {
  if (newProduct) fetchRelatedProducts()
})

watch(route, (newRoute) => {
  if (newRoute) fetchProduct()
})
</script>

<template>
  <div class="my-10">
    <div class="page-container">
      <Toast />

      <div v-if="loadingProduct" class="my-20 flex items-center justify-center">
        <ProgressSpinner />
      </div>

      <!-- Product detail -->
      <section v-else>
        <div class="grid grid-cols-2 gap-5">
          <Image
            :src="product?.image"
            :alt="product?.title"
            preview
            width="400"
            height="400"
            class="mx-auto object-contain"
          />

          <div class="space-y-5">
            <Tag :value="product?.category" class="capitalize" />
            <h2>{{ product?.title }}</h2>
            <p>{{ product?.description }}</p>
            <h1 class="text-red-500">${{ product?.price }}</h1>

            <!-- Quantity box -->
            <div class="flex items-center gap-5">
              <p>Quantity:</p>
              <div
                class="h-[50px] rounded-md w-[180px] grid grid-cols-3 items-center place-items-center"
                style="border: 1px solid #dee2e6"
              >
                <div @click="onDecreaseQuantity" class="cursor-pointer">
                  <i class="pi pi-minus"></i>
                </div>
                <div class="font-semibold text-xl">{{ quantity }}</div>
                <div @click="onIncreaseQuantity" class="cursor-pointer">
                  <i class="pi pi-plus"></i>
                </div>
              </div>

              <Button
                v-if="isFavoriteProduct(product?.id)"
                icon="pi pi-heart-fill"
                @click="toggleWishlist(product)"
              />
              <Button
                v-else
                icon="pi pi-heart"
                severity="secondary"
                outlined
                @click="toggleWishlist(product)"
              />
            </div>

            <!-- Add to cart -->
            <Button
              size="large"
              class="w-full mt-5"
              label="Add to cart"
              icon="pi pi-cart-plus"
              raised
              @click="addProductToCart(product)"
            />
          </div>
        </div>

        <!-- Related products -->
        <div class="mt-28">
          <RelatedProduct :relatedProducts="relatedProducts" />
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
