<template>
  <div class="container">
    <h2>{{ $store.state.user.name }}'s To Do</h2>
    <div class="todos">
      <ToDoCard v-for="(todo, key) in todos" :key="key" :todo="todo" />
      <template v-if="todos.length < 1">
        <center>No To Do.</center>
      </template>
    </div>
  </div>
</template>

<script>
import ToDoCard from '@/components/ToDoCard.vue'
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  components: {
    ToDoCard
  },
  computed: {
    ...mapState(['todos'])
  },
  created() {
    this.$store.dispatch('fetchToDos')
    console.log(this.$store.getters.todos)
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 20px;
  text-align: center;
}
</style>
