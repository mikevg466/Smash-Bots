
const createStore = require('redux').createStore;
// const applyMiddleware = require('redux').applyMiddleware;
// const createLogger = require('redux-logger');
// const thunkMiddleware = require('redux-thunk');
const reducer = require('../redux');

module.exports = createStore(
  reducer
)
  // applyMiddleware(
  //   thunkMiddleware,
  //   createLogger({ collapsed: true })
  // )
