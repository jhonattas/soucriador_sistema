import Vue from 'vue'
import VueResource from 'vue-resource'
import Meta from 'vue-meta'
import VueQriously from 'vue-qriously'
import App from './App'
import router from './router'
import store from '@/store'
import { sync } from 'vuex-router-sync'

import MainNavigationTop from '@/components/global/MainNavigationTop'
import MainNavigationLeft from '@/components/global/MainNavigationLeft'
import MainFooter from '@/components/global/MainFooter'

import 'jquery'
import 'bootstrap'
import 'popper.js'
import 'qrious'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

// components
Vue.component('main-navigation-top', MainNavigationTop)
Vue.component('main-navigation-left', MainNavigationLeft)
Vue.component('main-footer', MainFooter)

Vue.use(Meta)
Vue.use(VueResource)
Vue.use(VueQriously)
Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})