export default {
  routes: [
    {
      method: 'GET',
      path: '/deprecated-fields',
      handler: 'deprecatedFields.get',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/deprecated-fields',
      handler: 'deprecatedFields.create',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'DELETE',
      path: '/deprecated-fields/:id',
      handler: 'deprecatedFields.delete',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/deprecated-fields/toggle-visibility/:id',
      handler: 'deprecatedFields.toggleVisibility',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
