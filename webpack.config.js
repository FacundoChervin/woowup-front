const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/script.js', // Adjust this path according to the location of your main JavaScript file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src', to: path.resolve(__dirname, 'dist', 'src') }
            ]
        })
    ]
};