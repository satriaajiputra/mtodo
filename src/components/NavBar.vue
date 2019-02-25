<template>
  <div class="navbar">
    <router-link class="brand" to="/">
      <h3>{{ $store.state.siteName }}</h3>
    </router-link>
    <nav>
      <template v-if="typeof user.id != 'undefined'">
        <router-link active-class="active" exact :to="{ name: 'todo-list' }"
          >Home</router-link
        >
        <router-link active-class="active" exact :to="{ name: 'todo-create' }"
          >Create</router-link
        >
        <a href="javascript:void(0)" @click.prevent="logout">Logout</a>
      </template>
      <template v-else>
        <router-link active-class="active" exact :to="{ name: 'login-page' }"
          >Login</router-link
        >
        <router-link active-class="active" exact :to="{ name: 'register-page' }"
          >Register</router-link
        >
      </template>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login-page' })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  border-bottom: 1px solid #ccc;
  display: flex;
  max-width: 600px;
  width: 100%;
  margin: 30px auto 15px auto;
  .brand {
    flex-basis: 50%;
    display: inline-block;
    font-size: 24px;
    h3 {
      color: #1978e4;
      margin: 15px 0;
    }
  }
  nav {
    flex-basis: 50%;
    text-align: right;
    a {
      margin: 25px 10px;
      display: inline-block;
      color: #999;
      &.active {
        color: #1978e4;
      }
    }
  }
}
</style>
