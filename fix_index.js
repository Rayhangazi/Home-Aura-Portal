const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The file currently has syntax errors because sed just deleted lines.
// It's probably easier to restore index.html from my workspace memory? 
// No, I don't have it in memory.
