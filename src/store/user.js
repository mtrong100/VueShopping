import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('VUE_USER')) || null
  }),
  actions: {
    saveUser(user) {
      this.currentUser = user
      localStorage.setItem('VUE_USER', JSON.stringify(user))
    }
  }
})
