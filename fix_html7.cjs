const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /const formData = new FormData\(\);\n\s+formData\.append\('file', file\);\n\s+formData\.append\('fileName', fileName\);\n\s+try \{\n\s+const response = await fetch\(`\/api\/upload\/\$\{type\}`.*?;\n\s+const data = await response\.json\(\);\n\s+return data\.url;\n\s+\} catch \(err\) \{\n\s+console\.error\('File upload failed', err\);\n\s+return null;\n\s+\}/g;

html = html.replace(regex, `return null;`);

fs.writeFileSync('index.html', html);
