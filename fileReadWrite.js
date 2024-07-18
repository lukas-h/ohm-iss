const fs = require('node:fs/promises');

const readFile = async function (filePath) {
    try {
        // Read the file contents
        const fileContents = await fs.readFile(filePath, 'utf8');

        // Parse the JSON contents
        const jsonData = JSON.parse(fileContents);

        return jsonData;
    } catch (error) {
        console.error('Error loading or parsing JSON file:', error);
        throw error;
    }
}

const writeFile = async function (filePath, data) {
    try {
        const jsonString = JSON.stringify(data, null, 2);

        // Write the JSON string to the file
        await fs.writeFile(filePath, jsonString, 'utf8');

        console.log('Data successfully written to file');
    } catch (error) {
        console.error('Error writing to file:', error);
        throw error;
    }
}

module.exports = {
    readFile,
    writeFile
}; 