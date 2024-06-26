<script setup>
import { onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { formatCurrency } from '@/helper'
import { useCartStore } from '@/store/cart'
import RadioButton from 'primevue/radiobutton'
import { SHIPPING_METHODS, COUPON_CODES } from '../constant.js'
import Dropdown from 'primevue/dropdown'
import Divider from 'primevue/divider'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { useUserStore } from '@/store/user'

const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()
const userStore = useUserStore()

const onRemoveProduct = (productId) => {
  cartStore.removeFromCart(productId)
}

const onIncrease = (productId) => {
  cartStore.increaseQuantity(productId)
}

const onDecrease = (productId) => {
  cartStore.decreaseQuantity(productId)
}

const moveToCheckout = () => {
  if (userStore.currentUser?.isLogin === false) {
    toast.add({
      severity: 'error',
      summary: 'Please login first',
      life: 1500
    })

    router.push('/login')
    return
  }

  if (cartStore.selectedProduct.length === 0) {
    toast.add({
      severity: 'error',
      summary: 'Please select some products',
      life: 1500
    })
    return
  }

  if (!cartStore.selectedShippingMethod) {
    toast.add({
      severity: 'error',
      summary: 'Please select shipping method',
      life: 1500
    })
    return
  }

  const body = {
    products: cartStore.selectedProduct,
    coupon: cartStore.selectedCoupon,
    shippingMethod: cartStore.selectedShippingMethod,
    subTotal: cartStore.subTotal,
    total: cartStore.total
  }

  localStorage.setItem('VUE_CART_VALUE', JSON.stringify(body))

  router.push('/checkout')
}

onMounted(() => {
  cartStore.fetchCart()
})
</script>

<template>
  <div class="my-10">
    <div class="page-container">
      <h1>My cart</h1>
      <Toast />

      <section class="mt-5 grid grid-cols-[minmax(0,1fr),_300px] gap-5 items-start">
        <!-- Cart table -->
        <div>
          <DataTable
            v-model:selection="cartStore.selectedProduct"
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
            <Column field="title" headerStyle="width: 350px" header="Title" sortable></Column>
            <Column field="price" header="Price" sortable>
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.price * slotProps.data.quantity) }}
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
            <Column header="Action" :exportable="false" style="min-width: 8rem; text-align: center">
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
        </div>

        <!-- Order summary -->
        <div class="bg-white rounded-sm shadow-sm p-5" style="border: 1px solid #dee2e6">
          <h2>Order summary</h2>

          <div class="text-lg font-medium flex items-center justify-between">
            <p>Subtotal</p>
            <p>{{ formatCurrency(cartStore.subTotal) }}</p>
          </div>

          <Divider />

          <div class="flex flex-col gap-3">
            <p class="text-lg font-medium mb-1">Shipping methods</p>

            <div v-for="item in SHIPPING_METHODS" :key="item.id" class="flex align-items-center">
              <RadioButton
                v-model="cartStore.selectedShippingMethod"
                :inputId="item.name"
                :name="item.name"
                :value="item"
              />
              <label :for="item.name" class="ml-2"
                >{{ item.name }} - {{ formatCurrency(item.cost) }}</label
              >
            </div>
          </div>

          <Divider />

          <div>
            <p class="text-lg font-medium mb-2">Coupon code applied</p>
            <Dropdown
              v-model="cartStore.selectedCoupon"
              :options="COUPON_CODES"
              optionLabel="code"
              placeholder="Select coupon code"
              class="w-full"
            />
          </div>

          <Divider />

          <div class="text-lg font-medium flex items-center justify-between">
            <p>Total</p>
            <p>{{ formatCurrency(cartStore.total) }}</p>
          </div>

          <Button
            @click="moveToCheckout"
            class="w-full"
            label="Checkout"
            severity="contrast"
            size="large"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
