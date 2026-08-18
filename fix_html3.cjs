const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/\s*\} else \{\n\s+localStorage\.setItem\('homeaura_users'/g, 
`\n                  localStorage.setItem('homeaura_users'`);

fs.writeFileSync('index.html', html);
