const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const port = "3000";
      const configOverrides = {
        baseUrl: `http://localhost:${port}`,
        video: !process.env.CI,
        screenshotOnRunFailure: !process.env.CI,
      };

      return { ...config, ...configOverrides };
    },
  },
});
