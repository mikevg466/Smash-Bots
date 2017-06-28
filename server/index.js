const server = require('./app');

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  server.store.sync()
    .then(server.syncDb)
    .then(server.createApp)
    .then(server.listenUp)
} else {
  server.createApp(server.app);
}

module.exports = server.app;
