const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /{ id: 'ORD-101[0-3]'.*?},\n/g;
html = html.replace(regex, '');
// Also remove trailing comma from the last remaining order ORD-1009 if needed
html = html.replace(/(INV-1009.*?2026-08-09\.jpg' })\s*,/, '$1');

fs.writeFileSync('index.html', html);
