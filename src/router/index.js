import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'
import Home from '../views/Home.vue'
import ServiceList from '../views/ServiceList.vue'
import ServiceDetail from '../views/ServiceDetail.vue'
import TutorialList from '../views/TutorialList.vue'
import TutorialDetail from '../views/TutorialDetail.vue'
import Order from '../views/Order.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'services', name: 'ServiceList', component: ServiceList },
      { path: 'service/:id', name: 'ServiceDetail', component: ServiceDetail },
      { path: 'tutorials', name: 'TutorialList', component: TutorialList },
      { path: 'tutorial/:id', name: 'TutorialDetail', component: TutorialDetail },
      { path: 'order', name: 'Order', component: Order },
      { path: 'about', name: 'About', component: About }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
