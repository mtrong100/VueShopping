<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import Image from 'primevue/image'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Carousel from 'primevue/carousel'
import ProgressSpinner from 'primevue/progressspinner'

const product = ref(null)
const relatedProducts = ref([])
const route = useRoute()
const loadingProduct = ref(false)

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
      <ProgressSpinner v-if="loadingProduct" class="my-20 flex items-center justify-center" />

      <!-- Product detail -->
      <section v-else>
        <div class="grid grid-cols-2 gap-5">
          <Image
            :src="product?.image"
            :alt="product?.title"
            preview
            width="400"
            height="400"
            class="mx-auto"
          />

          <div>
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
                <div class="cursor-pointer">
                  <i class="pi pi-plus"></i>
                </div>
                <div class="font-semibold text-xl">1</div>
                <div class="cursor-pointer">
                  <i class="pi pi-minus"></i>
                </div>
              </div>

              <Button icon="pi pi-heart" severity="secondary" outlined size="large" />
            </div>

            <!-- Add to cart -->
            <Button
              size="large"
              class="w-full mt-5"
              label="Add to cart"
              icon="pi pi-cart-plus"
              raised
            />
          </div>
        </div>

        <!-- Related products -->
        <div class="mt-28">
          <div class="card">
            <Carousel :value="relatedProducts" :numVisible="3" :numScroll="1">
              <template #item="slotProps">
                <div class="border-1 surface-border border-round m-2 p-3">
                  <RouterLink class="text-gray-800" :to="`/product/${slotProps.data?.id}`">
                    <div class="mb-3">
                      <div class="relative mx-auto">
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
                      <Button icon="pi pi-heart" severity="secondary" outlined />
                      <Button icon="pi pi-shopping-cart" class="ml-2" />
                    </span>
                  </div>
                </div>
              </template>
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
