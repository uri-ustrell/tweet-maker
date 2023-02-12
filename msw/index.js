/* eslint-disable global-require */
const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const isTestEnv = process.env.NODE_ENV === 'test';

if (isDevelopmentEnv && process.env.MSW !== 'disable') {
  module.exports = require('./browser');
} else if (isTestEnv) {
  // module.exports = require('./server');
}
