<template>
  <div
    @click.prevent="opened = !opened"
    class="todo-card"
    :class="{ finished: todo.completed }"
  >
    <div class="heading">
      <h3 class="title">{{ todo.title }}</h3>
      <span class="date">{{ todo.date }}</span>
      <div class="control">
        <a
          href="#"
          title="Completed"
          v-if="!todo.completed"
          @click.prevent.stop="completedToDo(todo.id)"
          >&#10003;</a
        >
        <a href="#" title="Delete" @click.prevent.stop="deleteToDo(todo.id)"
          >&times;</a
        >
      </div>
    </div>
    <div class="description" v-if="opened">
      <p>
        {{ todo.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object
  },
  data() {
    return {
      opened: false
    }
  },
  methods: {
    completedToDo(id) {
      if (!confirm('Are you sure this is completed?')) return false
      this.todo.completed = true
      this.$store.dispatch('setCompletedToDo', { id, todo: this.todo })
    },
    deleteToDo(id) {
      if (!confirm('Are you sure deleting this to do?')) return false
      this.$store.dispatch('deleteToDo', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-card {
  user-select: none;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  .heading {
    display: flex;
    align-items: center;
    position: relative;
    .title {
      flex-basis: 70%;
      color: #666;
      font-size: 18px;
      margin: 0;
      transition: all 0.1s ease-in-out;
    }
    .date {
      flex-basis: 30%;
      display: inline-block;
      text-align: right;
      color: #1978e4;
    }
    .control {
      position: relative;
      text-align: center;
      width: 0px;
      overflow: hidden;
      transition: all 0.1s ease-in-out;
      background-color: #1978e4;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px 0px;
      margin-left: 20px;
      a {
        color: #fff;
        display: inline-block;
        border: 1px solid #fff;
        flex-basis: 50%;
        height: 30px;
        font-size: 18px;
        line-height: 30px;
        text-align: center;
        margin: 0 3px;
        &:hover {
          color: #1978e4;
          background: #fff;
        }
      }
    }
  }
  &:hover {
    border-color: #ccc;
  }
  &:hover .control {
    width: 100px;
    padding-left: 10px;
    padding-right: 10px;
  }
  h3.title {
    margin: 0 0 10px 0;
  }
  .description {
    background-color: #f2f2f2;
    padding: 10px;
  }
  &.finished {
    background-color: rgba(#1978e4, 0.1);
  }
}
</style>
