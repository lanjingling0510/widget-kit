import babel from 'rollup-plugin-babel';
import memory from 'rollup-plugin-memory';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
const objectToStringPolyfillPath = require.resolve('core-js/library/modules/es6.object.to-string.js');

export default {
  input: 'src/index.js',
  exports: 'default',
  plugins: [
    postcss({
      plugins: [
        require('postcss-import')(),
        require('postcss-cssnext')(),
        require('postcss-nested')()
      ],
      extensions: ['.css']
    }),
    replace({
      'process.env.NODE_ENV': '"production"'
    }),
    memory({
      path: 'src/index',
      contents: "export { default } from './index'"
    }),
    babel({
      runtimeHelpers: true,
      babelrc: true,
      exclude: 'node_modules/**'
    }),
    {
      load(id) {
        // core-js/library/modules/es6.object.to-string.js is a zero-length file
        if (id === objectToStringPolyfillPath) {
          return 'export default undefined';
        }
      }
    },
    cjs({
      include: 'node_modules/**'
    }),
    resolve({
      jsnext: true,
      main: true
    })
  ]
};
