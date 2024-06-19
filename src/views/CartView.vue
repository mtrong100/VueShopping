<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { formatCurrency } from '@/helper'
import { useCartStore } from '@/store/cart'

const selectedProduct = ref([])

const cartStore = useCartStore()

const onRemoveProduct = (productId) => {
  cartStore.removeFromCart(productId)
}

const onIncrease = (productId) => {
  cartStore.increaseQuantity(productId)
}

const onDecrease = (productId) => {
  cartStore.decreaseQuantity(productId)
}

onMounted(() => {
  cartStore.fetchCart()
})

const totalMoney = computed(() => {
  return selectedProduct.value.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)
})

watch(
  () => cartStore.cart,
  (newCart) => {
    localStorage.setItem('VUE_CART', JSON.stringify(newCart))
  },
  { deep: true }
)
</script>

<template>
  <div class="my-10">
    <div class="page-container">
      <h1>My cart</h1>

      <div class="mt-5">
        <DataTable
          v-model:selection="selectedProduct"
          :value="cartStore.cart"
          dataKey="id"
          tableStyle="min-width: 50rem"
          stripedRows
          showGridlines
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
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
          <Column field="title" headerStyle="width: 400px" header="Title" sortable></Column>
          <Column field="category" header="Category" sortable></Column>
          <Column field="price" header="Price" sortable>
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column field="quantity" header="Quantity">
            <template #body="slotProps">
              <div class="grid grid-cols-3 items-center gap-1 place-items-center">
                <Button
                  icon="pi pi-minus"
                  rounded
                  text
                  severity="contrast"
                  @click="onDecrease(slotProps.data.id)"
                />
                <p>{{ slotProps.data.quantity }}</p>
                <Button
                  icon="pi pi-plus"
                  rounded
                  text
                  severity="contrast"
                  @click="onIncrease(slotProps.data.id)"
                />
              </div>
            </template>
          </Column>
          <Column header="Action" :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
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

        <div class="mt-5 text-right">
          <h2>Total Money: {{ formatCurrency(totalMoney) }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
