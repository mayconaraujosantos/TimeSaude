module.exports = {
  uiPort: process.env.PORT || 1880,
  uiHost: '0.0.0.0',

  httpAdminRoot: '/',
  httpNodeRoot: '/',

  httpNodeCors: {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
  },

  functionGlobalContext: {},

  logging: {
    console: {
      level: 'info',
      metrics: false,
      audit: false,
    },
  },

  editorTheme: {
    projects: {
      enabled: false,
    },
  },
};
