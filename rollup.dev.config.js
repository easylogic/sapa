const serve = require('rollup-plugin-serve')

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: 'dist/sapa.js',
                name: 'sapa',
                format: 'umd',
            },
            {
                file: 'dist/sapa.esm.js',
                format: 'es',
            }
        ],
        plugins: [
            serve({
                
                contentBase: ['.', 'dist'],
                open: true,
                host: 'localhost',
                port: '10001',
            })
        ],
        watch: {
            chokidar: {
                usePolling: true
            }
        }
    }
]