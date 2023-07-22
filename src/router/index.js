import {lazy} from 'react'
let router = [
    {
        path: "/login",
        component: lazy(()=>import('@/views/Login')),
        redirect: true,// 默认打开登录页
        exact: true //是否为严格匹配
    },
    {
        path: '/',
        component: lazy(()=>import('@/views/MyView')),
        exact: false,
        routes: [  /** 嵌套路由 */
            {
                path: '/home',
                component: lazy(()=>import('@/pages/Home')),
                exact: false
            },
            {
                path: '/layout',
                component: lazy(()=>import('@/pages/Layout')),
                exact: false
            },
            {
                path: '/basicForm',
                component: lazy(()=>import('@/pages/form/BasicForm')),
                exact: false
            },
            {
                path: '/customVerif',
                component: lazy(()=>import('@/pages/form/CustomVerif')),
                exact: false
            },
            {
                path: '/basicTable',
                component: lazy(()=>import('@/pages/table/BasicTable')),
                exact: false
            },
            {
                path: '/complexTable',
                component: lazy(()=>import('@/pages/table/ComplexTable')),
                exact: false
            },
            {
                path: '/rotation',
                component: lazy(()=>import('@/pages/Rotation')),
                exact: false
            },
            {
                path: '/redirect',
                component: lazy(()=>import('@/pages/Redirect')),
                exact: false
            },
            {
                path: '/charts',
                component: lazy(()=>import('@/pages/Chart')),
                exact: false
            },
            {
                path: '*',
                component: lazy(()=>import('@/compontens/MyNotFound')),
                meta: {
                    title: '404'
                }
            },
        ]
    },
];

export default router;