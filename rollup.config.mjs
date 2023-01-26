import crypto from 'node:crypto';

import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
import styles from 'rollup-plugin-styles';
import watch from 'rollup-plugin-watch-assets';

const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);
const hash = crypto.randomUUID();
const mainJsFile = isProduction ? `main-${hash}.js` : 'main.js';

export default {
  input: 'src/index.jsx',
  output: {
    dir: 'dist/',
    format: 'iife',
    name: 'tweetMaker',
    sourcemap: true,
    entryFileNames: mainJsFile,
  },
  plugins: [
    alias({
      entries: [
        { find: 'utils', replacement: './src/utils' },
        { find: 'components', replacement: './src/components' },
        {
          find: 'context',
          replacement: './src/context',
        },
        { find: 'hooks', replacement: './src/hooks' },
        { find: 'utils', replacement: './src/utils' },
      ],
    }),
    json(),
    styles({
      plugins: [autoprefixer()],
      modules: true,
      mode: 'inject',
    }),
    nodeResolve({ extensions: ['.js', '.jsx', '.json'] }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': isProduction
        ? JSON.stringify('production')
        : JSON.stringify('development'),
      preventAssignment: true,
    }),
    babel(),
    copy({
      targets: [
        {
          src: 'statics/index.html',
          dest: 'dist',
          transform: (contents, filename) =>
            contents.toString().replace('__SCRIPT__', mainJsFile),
        },
        {
          src: 'statics/manifest.json',
          dest: 'dist',
        },
        {
          src: 'statics/assets',
          dest: 'dist',
        },
      ],
    }),
    watch({ assets: ['src'] }),
  ],
};
