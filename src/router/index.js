import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store/index.js'

Vue.use(VueRouter);

/* Layout */
import Layout from '@/layout/index.vue'

const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/index1',
        children: [
            {
                path: '/index1',
                name: '后台基础设置',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {title: '后台基础设置', icon: 'el-icon-s-tools', img: ''}
            },
            { // 特殊情况，如果需要子节点隐藏
                path: '/index2',
                name: '后台基础设置',
                component: () => import('@/views/dashboard/index.vue'),
                meta: {title: '后台基础设置', icon: 'el-icon-s-tools', img: ''},
                hidden: true
            }
        ]
    },
    {
        path: '/example',
        component: Layout,
        roleTypePermission: [1], // 权限控制，只有roleTypePermission中包含的角色才能访问
        redirect: '/example/menu1/menu1-1',
        meta: {title: '示例菜单', icon: 'el-icon-menu', img: ''},
        name: 'example',
        children: [
            {
                path: 'menu1',
                name: 'menu1',
                component: () => import('@/views/example/menu1/index.vue'),
                meta: {title: '示例菜单1', icon: 'el-icon-menu', img: ''},
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/example/menu1/menu1-1/index.vue'),
                        name: 'menu1-1',
                        meta: {title: '示例菜单1-1', icon: 'el-icon-menu', img: ''},
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/example/menu1/menu1-2/index.vue'),
                        name: 'menu1-2',
                        meta: {title: '示例菜单1-2', icon: 'el-icon-menu', img: ''},
                    }
                ]
            },
            {
                path: 'menu2',
                name: 'menu2',
                component: () => import('@/views/example/menu2/index.vue'),
                meta: {title: '示例菜单2', icon: 'el-icon-menu', img: ''},
            }
        ]
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index.vue')
            }
        ]
    },
    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true,
    }
];

const router = new VueRouter({
    mode: "history",
    // base: import.meta.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    let roleType = Number(localStorage.getItem(store.state.settings.LocalstorgePermission))
    routes.forEach(data1 => {
        if (data1.children) {
            data1.children.forEach(data2 => {
                if (data2.path == to.path) {
                    if (data1.roleTypePermission && data1.roleTypePermission.length > 0) {
                        if (data1.roleTypePermission.indexOf(roleType) == -1) {
                            if (roleType) {
                                next("/404")
                            } else {
                                next("/login")
                            }
                        }
                    }
                }
            })
        }
    })
    next();
});

// 防止连续点击多次路由报错
let routerPush = VueRouter.prototype.push;
let routerReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location) {
    return routerReplace.call(this, location).catch(err => err)
}

export default router;
