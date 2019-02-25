import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/services/Services'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    siteName: 'MToDo',
    user: {},
    todos: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TODOS(state, todos) {
      state.todos = todos
    },
    SAVE_TODO(state, todo) {
      state.todos = state.todos.map(row => {
        if (parseInt(row.id) == parseInt(todo.id)) {
          row = todo
        }
        return row
      })
    },
    UNSET_TODO(state, id) {
      state.todos = state.todos.filter(row => parseInt(row.id) != parseInt(id))
    },
    CLEAR_USER(state) {
      state.user = {}
      localStorage.removeItem('auth')
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit('SET_USER', user)
    },
    fetchToDos({ commit, state }) {
      request
        .getToDos(state.user.id)
        .then(resp => commit('SET_TODOS', resp.data))
    },
    setCompletedToDo({ commit }, { id, todo }) {
      request.setCompleted(id, todo).then(resp => {
        commit('SAVE_TODO', resp.data)
      })
    },
    deleteToDo({ commit }, id) {
      request.deleteToDo(id).then(() => {
        commit('UNSET_TODO', id)
      })
    },
    createToDo({ dispatch }, todo) {
      return request.saveToDo(todo).then(() => {
        dispatch('fetchToDos')
      })
    },
    logout({ commit }) {
      commit('CLEAR_USER')
      commit('SET_TODOS', [])
      return true
    }
  }
})
