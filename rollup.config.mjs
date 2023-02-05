import crypto from 'node:crypto';

import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import autoprefixer from 'autoprefixer';
import * as dotenv from 'dotenv';
import copy from 'rollup-plugin-copy';
import styles from 'rollup-plugin-styles';
import watch from 'rollup-plugin-watch-assets';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isMSW = process.env.MSW !== 'disable';
const hash = crypto.randomUUID();
const mainJsFile = isProduction ? `main-${hash}.js` : 'main.js';

export default {
  input: 'src/index.jsx',
  output: {
    dir: 'dist/',
    format: 'iife',
    name: 'tweetMaker',
    sourcemap: isProduction ? true : 'inline',
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
    nodeResolve({
      extensions: ['.js', '.jsx', '.json'],
      preferBuiltins: false,
      browser: true,
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': isProduction
        ? JSON.stringify('production')
        : JSON.stringify('development'),
      'process.env.MSW': isMSW
        ? JSON.stringify('enable')
        : JSON.stringify('disable'),
      preventAssignment: true,
    }),
    babel(),
    copy({
      targets: [
        {
          src: 'public/*',
          dest: 'dist/',
        },
        {
          src: 'public/index.html',
          dest: 'dist/',
          transform: (contents, filename) =>
            contents.toString().replace('__SCRIPT__', mainJsFile),
        },
      ],
    }),
    watch({ assets: ['src'] }),
  ],
};
