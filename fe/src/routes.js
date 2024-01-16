export const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Events' },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/UsersView.vue'),
  },
  {
    path: '/events',
    name: 'Events',
    props: true,
    component: () => import('@/views/MainDashboard.vue'),
    redirect: '/events/my-events',
    children: [
      {
        path: 'my-events',
        name: 'MyEvents',
        component: () => import('@/components/EventsTable.vue'),
        props() {
          return {
            eventsType: 'myEvents',
          };
        },
      },
      {
        path: 'past-events',
        name: 'PastEvents',
        component: () => import('@/components/EventsTable.vue'),
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
