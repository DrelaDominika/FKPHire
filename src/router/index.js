import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreateCareerField from '../views/careerFields/CreateCareerField.vue'
import EditCareerField from '../views/careerFields/EditCareerField.vue'
import CareerFieldDetails from '../views/careerFields/CareerFieldDetails.vue'
import UserCareerFields from '../views/careerFields/UserCareerFields.vue'

//route guard
import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/careerFields/create',
    name: 'CreateCareerField',
    component: CreateCareerField,
    beforeEnter: requireAuth
  },
  {
    path: '/careerFields/edit/:id',
    name: 'EditCareerField',
    component: EditCareerField,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/careerFields/:id',
    name: 'CareerFieldDetails',
    component: CareerFieldDetails,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/careerFields/user',
    name: 'UserCareerFields',
    component: UserCareerFields,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
