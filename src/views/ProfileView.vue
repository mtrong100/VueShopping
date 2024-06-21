<script setup>
import InputText from 'primevue/inputtext'
import { onMounted, reactive } from 'vue'
import Button from 'primevue/button'
import { useUserStore } from '@/store/user'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const userStore = useUserStore()
const toast = useToast()
const form = reactive({
  username: '',
  email: '',
  phone: null,
  address: ''
})

const onUpdateProfile = () => {
  if (!form.username || !form.email || !form.phone || !form.address) {
    alert('Please fill all required fields')
    return
  }

  const body = {
    ...userStore.currentUser,
    username: form.username,
    email: form.email,
    phone: form.phone,
    address: form.address
  }

  userStore.saveUser(body)

  toast.add({
    severity: 'success',
    summary: 'Update profile successfully',
    life: 1500
  })
}

const onLogout = () => {
  const body = {
    ...userStore.currentUser,
    isLogin: false
  }

  userStore.saveUser(body)

  window.location.href = '/'
}

onMounted(() => {
  const saveUser = JSON.parse(localStorage.getItem('VUE_USER')) || null
  if (saveUser) {
    form.username = saveUser.username
    form.email = saveUser.email
    form.phone = saveUser.phone
    form.address = saveUser.address
  }
})
</script>

<template>
  <div class="my-10">
    <div class="page-container">
      <h1>My profile</h1>
      <Toast />

      <div class="w-full max-w-md mx-auto space-y-5">
        <!-- Username -->
        <div class="flex flex-col gap-2">
          <label for="username">Username</label>
          <InputText
            id="username"
            v-model="form.username"
            aria-describedby="username-help"
            required
          />
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <InputText
            type="email"
            id="email"
            v-model="form.email"
            aria-describedby="email-help"
            required
          />
        </div>

        <!-- Address -->
        <div class="flex flex-col gap-2">
          <label for="address">Address</label>
          <InputText id="address" v-model="form.address" aria-describedby="address-help" required />
        </div>

        <!-- Phone number -->
        <div class="flex flex-col gap-2">
          <label for="phone">Phone number</label>
          <InputNumber v-model="form.phone" inputId="phone" required />
        </div>

        <Button @click="onUpdateProfile" class="w-full" label="Update profile" />
        <Button @click="onLogout" class="w-full" label="Log out" severity="contrast" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
