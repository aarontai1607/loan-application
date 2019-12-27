import LoginPage from '@/components/LoginPage.vue'
import LoanPage from '@/components/LoanPage.vue'
import ServerPage from '@/components/ServerPage.vue'
import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({ routes: [
    {path:'/',component:LoginPage,name:'login-page'},
    {path:'/loan-page',component:LoanPage, name:'loan-page'},
    {path:'/server-page',component:ServerPage,name:'server-page'}
]})