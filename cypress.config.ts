const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'pathai',
  chromeWebSecurity: false,

  viewportWidth: 1536,
  viewportHeight: 960,

  e2e: {
    baseUrl: 'https://staging.empath-ai-mvp.com',
    setupNodeEvents(on, config) {},
    experimentalSessionAndOrigin: true,
    supportFile: 'cypress/support/e2e.js',
  },

  env: {
    ADMIN: '/admin',
    CCM: '/ccm',
  },
});
