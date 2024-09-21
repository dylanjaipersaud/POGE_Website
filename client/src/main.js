import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'
import store from './store'
/* eslint-disable */ 
const vuetify = createVuetify({
    components,
    directives
  })

createApp(App).use(store).use(router).use(vuetify, {iconfont: 'mdi'}).mount('#app')
