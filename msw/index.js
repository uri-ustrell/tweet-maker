/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development' && process.env.MSW !== 'disable') {
  require('./browser');
}
