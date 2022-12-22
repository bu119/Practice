import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import MovieView from '@/views/MovieView'
import DetailView from '@/views/DetailView'
import ProfileView from '@/views/ProfileView'
import CategoryLanguageView from '@/views/CategoryLanguageView'
import CategoryGenreView from '@/views/CategoryGenreView'
// import EditProfileView from '@/views/EditProfileView'
import SelectFaceView from '@/views/SelectFaceView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'MovieView',
    component: MovieView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/',
    name: 'LogInView',
    component: LogInView
  },
  {
    path: '/language',
    name: 'CategoryLanguageView',
    component: CategoryLanguageView
  },
  {
    path: '/genre',
    name: 'CategoryGenreView',
    component: CategoryGenreView
  },
  {
    path: '/feeling',
    name: 'SelectFaceView',
    component: SelectFaceView
  },
  {
    path: '/:id',
    name: 'DetailView',
    component: DetailView,
  },
  {
    path: '/:username',
    name: 'ProfileView',
    component: ProfileView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
