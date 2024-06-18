import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import './assets/style.css'
import BadgeDirective from 'primevue/badgedirective'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(PrimeVue)

app.use(ToastService)
app.directive('badge', BadgeDirective)

app.mount('#app')
