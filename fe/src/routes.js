/**
 * Direct user to sign in page depending on if user is authenticated and confirmed
 *
 * @param {object} to
 * @param {object} from
 * @param {Function} next
 */
function requireAuth(to, from, next) {
  const auth = window.localStorage.getItem('auth') === 'true';

  if (auth) {
    next();
  } else {
    next({
      path: '/sign-in',
      query: { redirect: to.fullPath },
    });
  }
}
export const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: requireAuth,
    redirect: { name: 'Events' },
  },
  {
    path: '/sign-in',
    alias: '/login',
    name: 'SignInPage',
    component: () => import('@/views/SignInView.vue'),
    meta: { pageType: 'authentication' },
  },
  {
    path: '/users',
    beforeEnter: requireAuth,
    component: () => import('@/views/MainDashboard.vue'),
    children: [
      {
        path: '',
        name: 'Users',
        component: () => import('@/components/tables/UsersTable.vue'),
      },
    ],
  },
  {
    path: '/events',
    name: 'Events',
    props: true,
    beforeEnter: requireAuth,
    component: () => import('@/views/MainDashboard.vue'),
    redirect: '/events/my-events',
    children: [
      {
        path: 'my-events',
        name: 'MyEvents',
        beforeEnter: requireAuth,
        component: () => import('@/components/tables/EventsTable.vue'),
        props() {
          return {
            eventsType: 'myEvents',
          };
        },
      },
      {
        path: 'past-events',
        name: 'PastEvents',
        beforeEnter: requireAuth,
        component: () => import('@/components/tables/EventsTable.vue'),
        props() {
          return {
            eventsType: 'pastEvents',
          };
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*/',
    component: import('@/views/NotFound.vue'),
  },
];
