const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I need to locate where ioSocket was used.
// It was in loadInitialData, around lines 2720-2760
// and in fetchFromGoogleSheets, and save methods.
let lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('// Listen for initial state from server')) {
    console.log(`Found around line ${i}`);
  }
}
