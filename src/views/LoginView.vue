<script setup>
import InputText from 'primevue/inputtext'
import { reactive } from 'vue'
import Button from 'primevue/button'
import { useUserStore } from '@/store/user'

const form = reactive({
  email: '',
  password: ''
})

const userStore = useUserStore()

const login = () => {
  if (!form.email || !form.password) {
    alert('Please fill all required fields')
    return
  }

  if (
    form.email !== userStore.currentUser.email ||
    form.password !== userStore.currentUser.password
  ) {
    alert('Invalid email or password')
    return
  }

  const body = {
    ...userStore.currentUser,
    isLogin: true
  }

  userStore.saveUser(body)

  window.location.href = '/'
}
</script>

<template>
  <div class="my-10">
    <div class="w-full max-w-md mx-auto px-5">
      <!-- Form  -->
      <div class="space-y-7">
        <h1 class="text-center">Login to your account</h1>
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
          <RouterLink class="text-green-500 font-semibold" to="/signup">Sign up</RouterLink>
        </div>

        <Button @click="login" class="w-full mt-5" label="Login" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
