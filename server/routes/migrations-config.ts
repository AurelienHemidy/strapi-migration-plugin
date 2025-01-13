export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/migrations-config',
      handler: 'migrationsConfig.get',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/migrations-config/toggle-dry-mode',
      handler: 'migrationsConfig.toggleDryMode',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
