<template>
  <form @submit.prevent="$emit('submitted')">
    <div class="form-group">
      <label>Username</label>
      <input v-model="user.username" type="text" name="username" />
    </div>
    <div v-if="typeof user.name !== 'undefined'" class="form-group">
      <label>Name</label>
      <input v-model="user.name" type="text" name="name" />
    </div>
    <div class="form-group">
      <button class="btn">
        {{ authText.submit }}
      </button>
      <router-link
        class="btn btn-link"
        :to="{
          name: authText.link
        }"
        >{{ authText.submit == 'Register' ? 'Login' : 'Register' }}</router-link
      >
    </div>
  </form>
</template>

<script>
export default {
  props: {
    user: Object
  },
  computed: {
    authText() {
      return {
        submit: this.$route.name == 'register-page' ? 'Register' : 'Login',
        link:
          this.$route.name == 'register-page' ? 'login-page' : 'register-page'
      }
    }
  }
}
</script>

<style scoped></style>
