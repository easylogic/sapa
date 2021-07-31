import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/index.js',
        output: [
            {
                dir: 'module',
                format: 'es',
            }
        ],
        preserveModules: true,
        external: [/@babel\/runtime/],
        plugins: [
            // https://velog.io/@peterkimzz/rollup-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8
            // CommonJS 로 작성된 모듈들을 ES6 바꾸어서 rollup이 해석할 수 있게 도와줍니다.
            commonjs({
                extensions: ['.js'],
            }),            
            babel({ babelHelpers: 'bundled' }),
            nodeResolve(),
            peerDepsExternal(),
            terser(),
        ],
    }
]