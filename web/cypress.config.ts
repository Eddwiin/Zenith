import { defineConfig } from 'cypress'

export default defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on('file:preprocessor', (file) => { })
    },
  },
})

