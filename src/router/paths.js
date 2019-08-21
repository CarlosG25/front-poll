export default [

  {
    path: '*',
    meta: {
      public: true,
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import(
      `@/pages/error/NotFound.vue`
    )
  },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: () => import(
      `@/pages/commons/Login.vue`
    )
  },
  {
    path: '/',
    meta: {},
    name: 'Root',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/dashboard',
    meta: { 
      requiresAuth: true
    },
    name: 'Dashboard',
    component: () => import(
      '@/pages/dashboard/Dashboard.vue'
    )
  },
  {
    path: '/list-polls',
    meta: { 
      requiresAuth: true,
    },
    name: 'ListPolls',
    component: () => import(
      '@/pages/polls/Index.vue'
    )
  },
  {
    path: '/list-users',
    meta: { 
      requiresAuth: true,
    },
    name: 'ListUsers',
    component: () => import(
      '@/pages/users/Index.vue'
    )
  },
];
