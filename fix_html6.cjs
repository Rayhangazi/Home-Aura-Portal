const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/localStorage\.setItem\('homeaura_factory_bills', JSON\.stringify\(factoryBills\.value\)\);\n\s+\}\n\s+alert\('Snapshot/g, 
`localStorage.setItem('homeaura_factory_bills', JSON.stringify(factoryBills.value));\n                \n                alert('Snapshot`);

fs.writeFileSync('index.html', html);
