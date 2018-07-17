export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/auth/login')
  },
  {
    path: '/success',
    component: () => import('pages/auth/success'),
    meta: {
      requiresAuth: true
     }
  },
  {
    path: '/verifyEmail',
    component: () => import('pages/auth/verifyEmail'),
    meta: {
      requiresAuth: true
     }
  },
  {
    path: '/completeAccount',
    component: () => import('pages/auth/completeAccount'),
    meta: {
      requiresAuth: true
     }
  },
  {
    path: '*',
    component: () => import('layouts/default'), 
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  }
]
