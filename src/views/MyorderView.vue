<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'
import { formatCurrency, formatDate } from '@/helper'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'

const myorders = ref([])
const orderDetail = ref(null)
const visible = ref(false)

const showModal = (orderId) => {
  visible.value = true

  const orderIndex = myorders.value.findIndex((order) => order.orderId === orderId)
  const orderItem = myorders.value[orderIndex]

  orderDetail.value = orderItem
}

onMounted(() => {
  const saveOrders = JSON.parse(localStorage.getItem('VUE_ORDER')) || []
  if (saveOrders) myorders.value = saveOrders
})
</script>

<template>
  <div class="my-10">
    <div class="page-container">
      <h2>My orders</h2>

      <div class="mt-5">
        <DataTable
          dataKey="id"
          stripedRows
          showGridlines
          :value="myorders"
          tableStyle="min-width: 50rem"
        >
          <Column field="orderId" header="ID" sortable></Column>
          <Column field="fullname" header="Buyer" sortable></Column>
          <Column field="products.length" header="Total products" sortable></Column>
          <Column field="total" header="Total money" sortable>
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.total) }}
            </template>
          </Column>
          <Column
            field="shippingMethod.estimatedDelivery"
            header="Estimated Delivery"
            sortable
          ></Column>
          <Column field="createdAt" header="CreatedAt" sortable>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createdAt) }}
            </template>
          </Column>
          <Column header="Action" :exportable="false" style="min-width: 8rem; text-align: center">
            <template #body="slotProps">
              <Button icon="pi pi-eye" raised @click="showModal(slotProps.data.orderId)" />
            </template>
          </Column>
        </DataTable>
      </div>

      <Dialog
        v-model:visible="visible"
        modal
        header="Order detail"
        :style="{ width: '60rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <div>
          <div class="text-lg flex items-center justify-between">
            <p>Order ID</p>
            <p>{{ orderDetail?.orderId }}</p>
          </div>
          <div class="text-lg flex items-center justify-between">
            <p>Buyer</p>
            <p>{{ orderDetail?.fullname }}</p>
          </div>
          <div class="text-lg flex items-center justify-between">
            <p>Email</p>
            <p>{{ orderDetail?.email }}</p>
          </div>
          <div class="text-lg flex items-center justify-between">
            <p>Phone number</p>
            <p>{{ orderDetail?.phone }}</p>
          </div>
          <div class="text-lg flex items-center justify-between">
            <p>Address</p>
            <p>{{ orderDetail?.address }}</p>
          </div>
          <div class="text-lg flex items-center justify-between">
            <p>Date ordered</p>
            <p>{{ formatDate(orderDetail?.createdAt) }}</p>
          </div>
        </div>

        <Divider />

        <div>
          <DataTable
            dataKey="id"
            stripedRows
            showGridlines
            :value="orderDetail?.products"
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
            <Column field="category" header="Category" sortable></Column>
            <Column field="quantity" header="Quantity" sortable></Column>
            <Column field="price" header="Price" sortable>
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.price * slotProps.data.quantity) }}
              </template>
            </Column>
          </DataTable>
        </div>

        <Divider />

        <!-- Detail -->
        <div>
          <div class="text-lg font-medium flex items-center justify-between">
            <p>Subtotal</p>
            <p>{{ formatCurrency(orderDetail?.subTotal) }}</p>
          </div>

          <Divider />

          <!-- Shipping -->
          <div class="flex flex-col">
            <p class="text-lg font-medium">Shipping method</p>

            <div>
              <div class="flex items-center justify-between">
                <p>Name</p>
                <p>{{ orderDetail?.shippingMethod?.name }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p>Cost</p>
                <p>{{ formatCurrency(orderDetail?.shippingMethod?.cost) }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p>Estimated delivery</p>
                <p>{{ orderDetail?.shippingMethod?.estimatedDelivery }}</p>
              </div>
            </div>
          </div>

          <Divider />

          <!-- Coupon code -->
          <div v-if="orderDetail?.coupon" class="flex flex-col">
            <p class="text-lg font-medium">Coupon code</p>

            <div>
              <div class="flex items-center justify-between">
                <p>Code</p>
                <p>{{ orderDetail?.coupon?.code }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p>Discount</p>
                <p>{{ orderDetail?.coupon?.discountValue + '%' }}</p>
              </div>
            </div>
          </div>

          <Divider />

          <!-- Total -->
          <div class="text-lg font-medium flex items-center justify-between">
            <p>Total</p>
            <p class="font-bold text-xl">{{ formatCurrency(orderDetail?.total) }}</p>
          </div>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
