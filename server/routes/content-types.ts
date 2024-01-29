export default {
  routes: [
    {
      method: 'GET',
      path: '/content-types',
      handler: 'contentTypes.get',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
