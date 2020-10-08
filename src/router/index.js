import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import WeatherPage from "@/views/WeatherPage";
import SearchPage from "@/views/SearchPage";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: Home
    },
    {
        path: '/weather/:woeid',
        name: 'WeatherPage',
        component: WeatherPage
    },
    {
        path: '/search/:keyword',
        name: 'SearchPage',
        component: SearchPage
    }
]

const router = new VueRouter({
    routes
})

export default router
