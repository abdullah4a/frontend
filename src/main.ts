import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// ag-Grid CSS
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


import DefaultLayout from './layouts/DefaultLayout.vue'

const app = createApp(App)

app.component('DefaultLayout', DefaultLayout)

app.use(router)

app.mount('#app')
