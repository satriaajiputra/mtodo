<template>
  <div id="app">
    <NavBar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  created() {
    this.$store.dispatch(
      'fetchUser',
      !localStorage.getItem('auth')
        ? {}
        : JSON.parse(localStorage.getItem('auth'))
    )
  }
}
</script>

<style lang="scss">
* {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  box-sizing: border-box;
  color: #888;
}
a {
  text-decoration: none;
}
body {
  margin: 0;
}
.form-group {
  margin: 0 0 15px 0;
  label {
    margin: 0 0 8px 0;
    display: inline-block;
  }
  input,
  select,
  textarea {
    width: 100%;
    outline: none;
    border: 1px solid #ccc;
    padding: 8px 10px;
    &:focus {
      border-color: #1978e4;
    }
  }
}
.btn {
  background-color: #1978e4;
  color: #fff;
  border: 1px solid transparent;
  padding: 8px 20px;
  margin: 0 5px 5px 0;
  cursor: pointer;
  display: inline-block;
  transition: color 0.2s ease, background-color 0.2s ease;
  &:hover {
    background-color: #156ed3;
  }
  &.btn-link {
    background-color: transparent;
    color: #1978e4;
    text-decoration: underline;
  }
}
.container {
  max-width: 600px;
  width: 100%;
  margin: 15px auto;
}
.fade-enter-active {
  animation: fade-in 0.2s;
}
.fade-leave-active {
  animation: fade-in 0.2s reverse;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
