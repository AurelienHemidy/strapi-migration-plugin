export default {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/migrations',
      handler: 'migrations.get',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/migrations/:id',
      handler: 'migrations.delete',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/migrations/run',
      handler: 'migrations.run',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
