<template>
  <div class="container">
    <h3>Create New To Do</h3>
    <form @submit.prevent="saveToDo">
      <div class="form-group">
        <label>Title</label>
        <input v-model="todo.title" type="text" name="title" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea
          name="description"
          v-model="todo.description"
          rows="3"
        ></textarea>
      </div>
      <div class="form-group">
        <label>Date</label>
        <Datepicker name="date" v-model="todo.date" />
      </div>
      <div class="form-group">
        <button class="btn">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  data() {
    return {
      todo: this.initialToDo(),
      month: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ]
    }
  },
  components: {
    Datepicker
  },
  methods: {
    getDate(selectedDate) {
      let date = new Date(selectedDate)
      return `${date.getDate()} ${
        this.month[date.getMonth()]
      } ${date.getFullYear()}`
    },
    initialToDo() {
      return {
        title: null,
        description: null,
        date: null,
        completed: false,
        author: this.$store.state.user.id
      }
    },
    saveToDo() {
      if (!this.todo.title) {
        alert('Title tidak boleh kosong!')
        return true
      }
      this.todo.date = this.getDate(this.todo.date)
      this.$store.dispatch('createToDo', this.todo).then(() => {
        this.todo = this.initialToDo()
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>

<style scoped></style>
