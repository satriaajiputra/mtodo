<template>
  <div class="login-form">
    <h1 class="title">Register Page</h1>
    <AuthForm @submitted="register" :user="user" />
  </div>
</template>

<script>
import request from '@/services/Services'
import AuthForm from '@/components/AuthForm.vue'

export default {
  data() {
    return {
      user: this.resetUser()
    }
  },
  components: {
    AuthForm
  },
  methods: {
    register() {
      if (!this.user.username || !this.user.name)
        return alert('Username and Name must filled!')

      request.getUser(this.user.username).then(resp => {
        if (resp.data.length > 0) {
          alert('Username  used by another account!')
          this.user = this.resetUser()
        } else {
          this.saveUser()
        }
      })
    },
    saveUser() {
      request
        .saveUser(this.user)
        .then(resp => {
          localStorage.setItem('auth', JSON.stringify(resp.data))
          this.$store.dispatch('fetchUser', resp.data)
          this.user = this.resetUser()
          this.$router.push({ path: '/' })
        })
        .catch(error => {
          console.error('Error: ' + error.message)
        })
    },
    resetUser() {
      return {
        username: null,
        name: null
      }
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
