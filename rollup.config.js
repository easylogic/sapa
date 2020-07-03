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
    }
]