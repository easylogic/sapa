import packageJSON from '../package.json'
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

// rollup.config.js
export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/' + packageJSON.name + '.min.js',
    format: 'iife'
  },
  name: 'easylogic',  
  plugins : [
    babel({
      exclude: ['node_modules/**'],
      presets: [
        [ 'es2015', { modules : false } ] 
      ]
      
    }),
    uglify()
  ]
}, {
  input: 'src/index.js',
  output: {
    file: 'dist/' + packageJSON.name + '.js',
    format: 'umd'
  },
  name: 'easylogic',
  plugins : [        
    babel({
      exclude: ['node_modules/**'],
      presets: [
        [ 'es2015', { modules : false } ] 
      ]

    })
  ]
}];