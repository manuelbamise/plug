import { createApp } from 'vue'
import './assets/main.css'
import vuetify from './plugins/vuetify'
import App from './App.vue'

const app = createApp(App)
app.use(vuetify)
app.mount('#app')
