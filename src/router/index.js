import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Important from "../components/pages/Important";
import Later from "../components/pages/Later";
import All from "../components/pages/All";
import Auth from "../views/Auth";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Verify from "../views/Verify";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'all',
                name: 'All',
                components: {
                    pages: All
                }
            },
            {
                path: 'important',
                components: {
                    pages: Important
                }
            }, {
                path: 'later',
                components: {
                    pages: Later
                }
            }]
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
        children: [
            {
                path: 'register',
                name: 'register',
                components: {
                    default: Register,
                    auth: Register
                }
            },
            {
                path: 'login',
                name: 'login',
                components: {
                    auth: Login
                }
            }]
    },
    {
        path: '/verify',
        name: 'verify',
        component: Verify
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
