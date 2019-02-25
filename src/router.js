import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'todo-list',
      component: () => import('@/views/ToDoList.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/todo/create',
      name: 'todo-create',
      component: () => import('@/views/ToDoCreate.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login-page',
      component: () => import('@/views/LoginUser.vue'),
      meta: {
        mustNotLogedIn: true
      }
    },
    {
      path: '/register',
      name: 'register-page',
      component: () => import('@/views/RegisterUser.vue'),
      meta: {
        mustNotLogedIn: true
      }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

routes.beforeEach((to, from, next) => {
  if (
    !localStorage.getItem('auth') &&
    to.matched.some(record => record.meta.requiresAuth)
  ) {
    next({ name: 'login-page' })
  } else if (
    localStorage.getItem('auth') &&
    to.matched.some(record => record.meta.mustNotLogedIn)
  ) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default routes
