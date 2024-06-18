<script setup>
import { onMounted, ref, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

const wishlist = ref([])

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const removeFromWishlist = (product) => {
  wishlist.value = wishlist.value.filter((item) => item.id !== product.id)
}

const moveToCart = (product) => {
  wishlist.value = wishlist.value.filter((item) => item.id !== product.id)
  const saveCart = JSON.parse(localStorage.getItem('cart')) || []

  if (!saveCart.some((item) => item.id === product.id)) {
    saveCart.push(product)
  } else {
    saveCart.forEach((item) => {
      if (item.id === product.id) {
        item.quantity += 1
      }
    })
  }

  localStorage.setItem('cart', JSON.stringify(saveCart))
}

onMounted(() => {
  const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || []
  if (savedWishlist) {
    wishlist.value = savedWishlist
  }
})

watch(wishlist, (newWishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(newWishlist))
})
</script>

<template>
  <div class="my-10">
    <div class="page-container">
      <h1>My wishlist</h1>

      <div class="mt-5">
        <DataTable :value="wishlist" tableStyle="min-width: 50rem" stripedRows showGridlines>
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
          <Column header="Action" :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
              <Button
                icon="pi pi-shopping-cart"
                outlined
                rounded
                class="mr-2"
                @click="moveToCart(slotProps.data)"
              />
              <Button
                icon="pi pi-trash"
                outlined
                rounded
                severity="danger"
                @click="removeFromWishlist(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
