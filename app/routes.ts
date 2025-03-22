import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes'

export default [
  // Authenticated
  layout('./routes/authenticated/layout.tsx', [
    index('./routes/authenticated/dashboard/route.tsx'),
    route('/apps', './routes/authenticated/apps/route.tsx'),
    route('/chats', './routes/authenticated/chats/route.tsx'),

    // Users
    layout('./routes/authenticated/users/layout/route.tsx', [
      route('/users', './routes/authenticated/users/index.tsx'),
      route('/users/add', './routes/authenticated/users/add/route.tsx'),
      route(
        '/users/:user/delete',
        './routes/authenticated/users/delete/route.tsx',
      ),
      route('/users/invite', './routes/authenticated/users/invite/route.tsx'),
      route(
        '/users/:user/update',
        './routes/authenticated/users/update/route.tsx',
      ),
    ]),

    // Tasks
    layout('./routes/authenticated/tasks/layout/route.tsx', [
      route('/tasks', './routes/authenticated/tasks/index/route.tsx'),
      route('/tasks/create', './routes/authenticated/tasks/create/route.tsx'),
      route(
        '/tasks/:task/delete',
        './routes/authenticated/tasks/delete/route.tsx',
      ),
      route('/tasks/import', './routes/authenticated/tasks/import/route.tsx'),
      route(
        '/tasks/:task/label',
        './routes/authenticated/tasks/label/route.ts',
      ),
    ]),
    route('/help-center', './routes/authenticated/help-center/route.tsx'),

    // Settings
    layout('./routes/authenticated/settings/layout.tsx', [
      route('/settings', './routes/authenticated/settings/profile/route.tsx'),
      route(
        '/settings/account',
        './routes/authenticated/settings/account/route.tsx',
      ),
      route(
        '/settings/appearance',
        './routes/authenticated/settings/appearance/route.tsx',
      ),
      route(
        '/settings/notifications',
        './routes/authenticated/settings/notifications/route.tsx',
      ),
      route(
        '/settings/display',
        './routes/authenticated/settings/display/route.tsx',
      ),
    ]),

    // Error routes
    route('/401', './routes/errors/401.tsx'),
    route('/403', './routes/errors/403.tsx'),
    route('/404', './routes/errors/404.tsx'),
    route('/500', './routes/errors/500.tsx'),
    route('/503', './routes/errors/503.tsx'),
  ]),

  // Auth layout with sign-in route
  layout('./routes/auth/layout.tsx', [
    route('/otp', './routes/auth/otp/route.tsx'),
    route('/sign-up', './routes/auth/sign-up/route.tsx'),
    route('/sign-in', './routes/auth/sign-in/route.tsx'),
    route('/sign-out', './routes/auth/sign-out/route.tsx'),
    route('/sign-in-2', './routes/auth/sign-in-2/route.tsx'),
    route('/forgot-password', './routes/auth/forgot-password/route.tsx'),
  ]),
] satisfies RouteConfig
