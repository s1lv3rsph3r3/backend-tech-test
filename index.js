#!/usr/bin/env node
const expressApp = require('./app');
const { bindToPort } = require('./utility/os-bind');
const { router } = require('./endpoints');

expressApp.get('/', (req, res) => {
  return res.status(200).json('Welcome to the backend-tech-test API');
});

expressApp.use('/', router);

// Catch all for any routes not listed
expressApp.use((req, res) => {
  return res.status(404).json('Unhappy Face :(');
});

// We need an external function to
// handle this business logic so we can mock
// the app to test the endpoints.
bindToPort(expressApp);

module.exports = expressApp;
