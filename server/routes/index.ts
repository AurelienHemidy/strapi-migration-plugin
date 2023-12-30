export default [
  {
    method: 'GET',
    path: '/find',
    handler: 'migrations.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/config',
    handler: 'migrationsConfig.find',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PATCH',
    path: '/config/toggle-dry-mode',
    handler: 'migrationsConfig.toggleDryMode',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/deprecated-fields/find',
    handler: 'deprecatedFields.find',
    config: {
      policies: [],
      auth: false,
    },
  },
];
