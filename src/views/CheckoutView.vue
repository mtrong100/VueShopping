<script setup>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { onMounted, reactive, ref } from 'vue'
import { formatCurrency } from '@/helper'
import Divider from 'primevue/divider'
import { v4 as uuidv4 } from 'uuid'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()
const cartDetail = ref(null)
const form = reactive({
  fullname: '',
  email: '',
  phone: null,
  address: '',
  note: ''
})

const checkoutOrder = () => {
  if (!form.fullname || !form.email || !form.phone || !form.address) {
    alert('Please fill all required fields')
    return
  }

  const body = {
    orderId: uuidv4(),
    fullname: form.fullname,
    email: form.email,
    phone: form.phone,
    address: form.address,
    note: form.note,
    ...cartDetail.value,
    createdAt: Date.now()
  }

  cartStore.updateCart(cartDetail.value?.products)
  localStorage.removeItem('VUE_CART_VALUE')

  let saveOrder = JSON.parse(localStorage.getItem('VUE_ORDER')) || []
  saveOrder.push(body)
  localStorage.setItem('VUE_ORDER', JSON.stringify(saveOrder))

  toast.add({
    severity: 'success',
    summary: 'Place an order successfully',
    life: 1500
  })

  router.push('/')
}

onMounted(() => {
  const saveCartDetail = JSON.parse(localStorage.getItem('VUE_CART_VALUE')) || null
  if (saveCartDetail) cartDetail.value = saveCartDetail
})
</script>

<template>
  <div class="my-10">
    <div class="page-container">
      <h1>Checkout your order</h1>
      <Toast />

      <section class="grid grid-cols-2 items-start gap-5 mt-5">
        <!-- Form  -->
        <div class="space-y-5">
          <!-- Fullname -->
          <div class="flex flex-col gap-2">
            <label for="fullname">Full name</label>
            <InputText
              size="large"
              id="fullname"
              v-model="form.fullname"
              aria-describedby="fullname-help"
              required
            />
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <InputText
              type="email"
              size="large"
              id="email"
              v-model="form.email"
              aria-describedby="email-help"
              required
            />
          </div>

          <!-- Address -->
          <div class="flex flex-col gap-2">
            <label for="address">Address</label>
            <InputText
              size="large"
              id="address"
              v-model="form.address"
              aria-describedby="address-help"
              required
            />
          </div>

          <!-- Phone number -->
          <div class="flex flex-col gap-2">
            <label for="phone">Phone number</label>
            <InputNumber size="large" v-model="form.phone" inputId="phone" required />
          </div>

          <!-- Note -->
          <div class="flex flex-col gap-2">
            <label for="phone">Note</label>
            <Textarea v-model="form.note" rows="5" cols="30" />
          </div>
        </div>

        <!-- Detail -->
        <div class="bg-white px-5 rounded-sm shadow-sm p-5" style="border: 1px solid #dee2e6">
          <h2>Order details</h2>
          <div class="mt-3">
            <DataTable
              dataKey="id"
              stripedRows
              showGridlines
              :value="cartDetail?.products"
              tableStyle="min-width: 50rem"
            >
              <Column header="Image">
                <template #body="slotProps">
                  <img
                    :src="slotProps.data.image"
                    :alt="slotProps.data.title"
                    class="w-[70px] h-[70px] object-contain"
                  />
                </template>
              </Column>
              <Column field="title" headerStyle="width: 250px" header="Title" sortable></Column>
              <Column field="category" header="Category"></Column>
              <Column field="quantity" header="Quantity"></Column>
              <Column field="price" header="Price" sortable>
                <template #body="slotProps">
                  {{ formatCurrency(slotProps.data.price * slotProps.data.quantity) }}
                </template>
              </Column>
            </DataTable>
          </div>

          <Divider class="mb-4 mt-8" />

          <div class="space-y-3">
            <div class="text-lg mt-5 font-medium flex items-center justify-between">
              <p>Subtotal</p>
              <p>{{ formatCurrency(cartDetail?.subTotal) }}</p>
            </div>

            <Divider />

            <!-- Shipping -->
            <div class="flex flex-col gap-3">
              <p class="text-lg font-medium">Shipping method</p>

              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <p>Name</p>
                  <p>{{ cartDetail?.shippingMethod?.name }}</p>
                </div>
                <div class="flex items-center justify-between">
                  <p>Cost</p>
                  <p>{{ formatCurrency(cartDetail?.shippingMethod?.cost) }}</p>
                </div>
                <div class="flex items-center justify-between">
                  <p>Estimated delivery</p>
                  <p>{{ cartDetail?.shippingMethod?.estimatedDelivery }}</p>
                </div>
              </div>
            </div>

            <Divider />

            <!-- Coupon code -->
            <div v-if="cartDetail?.coupon" class="flex flex-col gap-3">
              <p class="text-lg font-medium">Coupon code</p>

              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <p>Code</p>
                  <p>{{ cartDetail?.coupon?.code }}</p>
                </div>
                <div class="flex items-center justify-between">
                  <p>Discount</p>
                  <p>{{ cartDetail?.coupon?.discountValue + '%' }}</p>
                </div>
              </div>
            </div>

            <Divider />

            <!-- Total -->
            <div class="text-lg font-medium flex items-center justify-between">
              <p>Total</p>
              <p>{{ formatCurrency(cartDetail?.total) }}</p>
            </div>
          </div>

          <Button
            @click="checkoutOrder"
            class="w-full mt-5"
            label="Place an order"
            severity="contrast"
            size="large"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
