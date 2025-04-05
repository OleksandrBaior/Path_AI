const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://staging.empath-ai-mvp.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    ADMIN: "/admin/login",
    CCM: "/ccm/login",
  },
});
