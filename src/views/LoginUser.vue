<template>
  <div class="login-form">
    <h1 class="title">Login Page</h1>
    <AuthForm @submitted="login" :user="user" />
  </div>
</template>

<script>
import request from '@/services/Services'
import AuthForm from '@/components/AuthForm.vue'

export default {
  data() {
    return {
      user: {
        username: null
      }
    }
  },
  components: {
    AuthForm
  },
  methods: {
    login() {
      if (!this.user.username) return alert('Username tidak boleh kosong!')

      request
        .getUser(this.user.username)
        .then(resp => {
          let auth = resp.data.filter(row => row.username == this.user.username)
          if (auth.length > 0) {
            localStorage.setItem('auth', JSON.stringify(auth[0]))
            this.$store.dispatch('fetchUser', auth[0])
            this.$router.push({ path: '/' })
          } else {
            alert('User tidak ditemukan!')
          }
        })
        .catch(error => {
          console.log('Error: ', error.message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  .title {
    text-align: center;
  }
  max-width: 30%;
  width: 100%;
  margin: 30px auto;
  border: 1.5px dashed #ddd;
  padding: 20px 30px;
}
</style>
