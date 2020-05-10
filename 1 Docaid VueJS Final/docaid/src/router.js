import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './Home.vue'
import About from './About.vue'
import Note from './Note.vue'
Vue.use(VueRouter)

const routes =
[
{ path: "/", component: Home},
{ path: '/home/:user?', component: Home },
{ path: '/note', component: Note},
{ path: '/about', name: 'about',component: About }
]
export default new VueRouter( { routes })