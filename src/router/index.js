import { createRouter, createWebHashHistory } from 'vue-router'
import vCatalog from '../pages/v-catalog.vue'
const routes = [
    {
        path: '/',
        name: 'catalog',
        component: vCatalog
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router