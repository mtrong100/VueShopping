<script setup>
import InputText from 'primevue/inputtext'
import { reactive } from 'vue'
import Button from 'primevue/button'
import { useUserStore } from '@/store/user'

const form = reactive({
  username: '',
  email: '',
  password: ''
})

const userStore = useUserStore()

const register = () => {
  if (!form.username || !form.email || !form.password) {
    alert('Please fill all required fields')
    return
  }

  const body = {
    username: form.username,
    email: form.email,
    password: form.password
  }

  userStore.saveUser(body)

  window.location.href = '/login'
}
</script>

<template>
  <div class="my-10">
    <div class="w-full max-w-md mx-auto px-5">
      <!-- Form  -->
      <div class="space-y-7">
        <h1 class="text-center">Rgister to your account</h1>
        <!-- Username -->
        <div class="flex flex-col gap-2">
          <label for="username">Username</label>
          <InputText
            size="large"
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
            size="large"
            id="email"
            v-model="form.email"
            aria-describedby="email-help"
            required
          />
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-2">
          <label for="password">Password</label>
          <InputText
            type="password"
            size="large"
            id="password"
            v-model="form.password"
            aria-describedby="password-help"
            required
          />
        </div>

        <!-- Other links  -->
        <div class="flex items-center gap-2">
          <p>Don't have an account?</p>
          <RouterLink class="text-green-500 font-semibold" to="/login">Login</RouterLink>
        </div>

        <Button @click="register" class="w-full mt-5" label="Sign up" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
