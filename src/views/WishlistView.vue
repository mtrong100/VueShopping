<script setup>
import { onMounted, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useWishlistStore } from '@/store/wishlist'
import { formatCurrency } from '@/helper'
import { useCartStore } from '@/store/cart'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const onMoveToCart = (product) => {
  cartStore.addToCart(product)
  wishlistStore.removeProduct(product.id)
}

const onRemoveProduct = (productId) => {
  wishlistStore.removeProduct(productId)
}

onMounted(() => {
  wishlistStore.fetchWishlist()
})
</script>

<template>
  <div class="my-10">
    <div class="page-container">
      <h1>My wishlist</h1>

      <div class="mt-5">
        <DataTable
          :value="wishlistStore.wishlist"
          tableStyle="min-width: 50rem"
          stripedRows
          showGridlines
        >
          <Column field="id" header="ID" sortable></Column>
          <Column header="Image">
            <template #body="slotProps">
              <img
                :src="slotProps.data.image"
                :alt="slotProps.data.title"
                class="w-[70px] h-[70px] object-contain"
              />
            </template>
          </Column>
          <Column field="title" header="Title" sortable></Column>
          <Column field="category" header="Category" sortable></Column>
          <Column field="price" header="Price" sortable>
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column header="Action" :exportable="false" style="min-width: 8rem; text-align: center">
            <template #body="slotProps">
              <Button
                icon="pi pi-shopping-cart"
                outlined
                rounded
                class="mr-2"
                @click="onMoveToCart(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="onRemoveProduct(slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
