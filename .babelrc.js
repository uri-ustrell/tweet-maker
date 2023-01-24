module.exports = {
  exclude: 'node_modules/**',
  plugins: [
    [
      'module-resolver',
      {
        root: ['src'],
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-react',
      {
        development: process.env.BABEL_ENV === 'development',
        runtime: 'automatic',
      },
    ],
  ],
};
