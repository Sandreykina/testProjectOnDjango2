import PostsPage from '@/components/pages/PostsPage'
import PostsPageWithStore from '@/components/pages/PostsPageWithStore'
import PostDetail from '@/components/pages/PostDetail'
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'posts',
        component: PostsPage
    },
    {
        path: '/post/:id',
        component: PostDetail
    },
    {
        path: '/store',
        name: 'store',
        component: PostsPageWithStore
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router