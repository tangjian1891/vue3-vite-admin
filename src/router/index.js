import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";

// 公共路由
export const constantRoutes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: (resolve) => require(['@/views/redirect'], resolve)
  //     }
  //   ]
  // },
  {
    path: "/login",
    // component: (resolve) => require(['@/views/login'], resolve),
    component: () => import("../views/Login.vue"),
    hidden: true,
  },
  {
    path: "/text",
    name: "text",
    // component: (resolve) => require(['@/views/login'], resolve),
    component: () => import("../views/text.vue"),
  },
  {
    path: '/404',
    // component: (resolve) => require(['@/views/error/404'], resolve),
    component:()=>import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/error/401.vue'], resolve),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        // component: (resolve) => require(['@/views/index'], resolve),
        component: () => import("@/views/index.vue"),
        name: "首页",
        meta: { title: "首页", icon: "dashboard", noCache: true, affix: true },
      },
      {
        path: "/system/user",
        // component: (resolve) => require(['@/views/index'], resolve),
        component: () => import("@/views/system/user/index.vue"),
        name: "user2",
        meta: { title: "首页", icon: "dashboard", noCache: true, affix: true },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        // component: (resolve) => require(['@/views/system/user/profile/index'], resolve),
        component:  ()=>import('@/views/system/user/profile/index.vue'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  // {
  //   path: '/auth',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'role/:userId(\\d+)',
  //       component: (resolve) => require(['@/views/system/user/authRole'], resolve),
  //       name: 'AuthRole',
  //       meta: { title: '分配角色'}
  //     }
  //   ]
  // },
  // {
  //   path: '/auth',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'user/:roleId(\\d+)',
  //       component: (resolve) => require(['@/views/system/role/authUser'], resolve),
  //       name: 'AuthUser',
  //       meta: { title: '分配用户'}
  //     }
  //   ]
  // },
  // {
  //   path: '/dict',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'type/data/:dictId(\\d+)',
  //       component: (resolve) => require(['@/views/system/dict/data'], resolve),
  //       name: 'Data',
  //       meta: { title: '字典数据', icon: '' }
  //     }
  //   ]
  // },
  // {
  //   path: '/job',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'log',
  //       component: (resolve) => require(['@/views/monitor/job/log'], resolve),
  //       name: 'JobLog',
  //       meta: { title: '调度日志' }
  //     }
  //   ]
  // },
  // {
  //   path: '/gen',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'edit/:tableId(\\d+)',
  //       component: (resolve) => require(['@/views/tool/gen/editTable'], resolve),
  //       name: 'GenEdit',
  //       meta: { title: '修改生成配置' }
  //     }
  //   ]
  // }
];



const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
