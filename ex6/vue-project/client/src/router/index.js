import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CommentsView from '../views/CommentsView.vue'
import DetailsView from '../views/DetailsView.vue'
import DatabaseView from '@/views/DatabaseView.vue'
import ErrorPage from '../views/ErrorPage.vue'
import axios from 'axios';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/comments',
    name: 'comments',
    component: CommentsView
  },
  {
    path: '/comments/:id',
    name: 'DetailsView',
    component: DetailsView,
    beforeEnter: (to, from, next) => {
      const { id } = to.params;
      // axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`)
      axios.get(`http://192.168.107.121:3000/comments/${id}`)
        .then(reponse => {
          if (reponse.status === 200) {
            next(); }
          else {
            next({ name: 'ErrorPage' });
          }
        })
        .catch(error => {
          console.error('Error:', error);
          next({ name: 'ErrorPage' });
        });

    },
  },
  {
    path: '/database',
    name: 'DatabaseView',
    component: DatabaseView
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: ErrorPage
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
