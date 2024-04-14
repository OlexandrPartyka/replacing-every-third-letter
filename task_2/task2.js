const fs = require('fs');
const EventEmitter = require('events');

// Create an event emitter object
const fileEmitter = new EventEmitter();

// File path
const filePath = 'file.txt'; // Change the file name as needed

// Function to replace every third letter with its uppercase counterpart
function replaceEveryThirdLetter(data) {
    let modifiedContent = '';
    for (let i = 0; i < data.length; i++) {
        if ((i + 1) % 3 === 0) {
            modifiedContent += data[i].toUpperCase();
        } else {
            modifiedContent += data[i];
        }
    }
    return modifiedContent;
}

// Read the content of the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        // If an error occurs, emit an error event
        fileEmitter.emit('error', err);
        return;
    }
    
    // Replace every third letter
    const modifiedContent = replaceEveryThirdLetter(data);
    
    // Emit an event with the modified content
    fileEmitter.emit('modifiedContent', modifiedContent);
});

// Listen for the 'modifiedContent' event
fileEmitter.on('modifiedContent', (modifiedContent) => {
    console.log("Modified file content:", modifiedContent);
});

// Listen for the 'error' event
fileEmitter.on('error', (err) => {
    console.error("Error reading the file:", err);
});
