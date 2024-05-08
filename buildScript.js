// buildScript.js

const fs = require('fs');

// Read environment variables from process.env
const API_KEY = process.env.API_KEY || '';
const BACKEND_URL = process.env.BACKEND_URL || '';

// Read the original script.js file
fs.readFile('src/script.js', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading script.js:', err);
        return;
    }

    // Replace placeholder with actual environment variable value
    let modifiedData = data.replace(/process\.env\.API_KEY/g, JSON.stringify(API_KEY));
    modifiedData = modifiedData.replace(/process\.env\.BACKEND_URL/g, JSON.stringify(BACKEND_URL));

    // Write the modified script.js file
    fs.writeFile('src/script.js', modifiedData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing modified script.js:', err);
            return;
        }
        console.log('Modified script.js file written successfully.');
    });

});