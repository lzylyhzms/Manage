import { createRouter, createWebHistory } from 'vue-router'

const ApiKeyView = () => import('@/views/ApiKeyView.vue')
const SettingsView = () => import('@/views/SettingView.vue')
const ChatView = () => import('@/views/ChatView.vue')
const StreamView = () => import('@/views/StreamView.vue')
const UsageView = () => import('@/views/UsageView.vue')
const DocsView = () => import('@/views/DocsView.vue')
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const Page403 = () => import('@/views/403.vue')
const Page404 = () => import('@/views/404.vue')
const Users = () => import('@/views/Users.vue')



const routes = [
    {
        path: "/",
        redirect: "/login"   // 默认跳到某个页面，比如 apikey
    },
    {
        path: '/',
        name: 'Main',
        children: [
            { path: 'apikeys', component: ApiKeyView },
            { path: 'dashboard', component: UsageView },
            { path: 'settings', component: SettingsView },
            { path: 'chat', component: ChatView },
            { path: 'stream', component: StreamView },
            { path: 'users', component: Users }
        ],
        meta: { layout: 'default' ,requiresAuth: true },
    },
    {
        path: '/docs',
        name: 'Document',
        component: DocsView, // 独立页面，不走 MainLayout
        meta: { layout: 'none' }
    },
    {
        path: '/login',
        name:'Login',
        component: Login, // 独立页面，不走 MainLayout
        meta: { layout: 'none' }  // 让 Login 页面使用不同布局
    },
    {
        path: '/register',
        name:'Register',
        component: Register, // 独立页面，不走 MainLayout
        meta: { layout: 'none' }
    },
    {
        path: '/403',
        name:'403',
        component: Page403, // 独立页面，不走 MainLayout
        meta: { layout: 'none' }
    },
    {
        path: '/404',
        name:'404',
        component: Page404,
        meta: { layout: 'none' }
    },
    // 通配符路由
    { path: '/:pathMatch(.*)*', redirect: '/404' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// router/index.ts
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token") // 从本地取 JWT

    if (to.meta.requiresAuth && !token) {
        // 如果目标路由需要登录但没有 token，则跳转到登录页
        next("/403")
    } else {
        next()
    }
})


export default router
