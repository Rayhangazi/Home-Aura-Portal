const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/const saveOrders = \(\) => \{\n\s+else localStorage\.setItem/g, 
`const saveOrders = () => {\n          localStorage.setItem`);
html = html.replace(/const saveOrderLogs = \(\) => \{\n\s+else localStorage\.setItem/g, 
`const saveOrderLogs = () => {\n          localStorage.setItem`);
html = html.replace(/const saveDeletedOrders = \(\) => \{\n\s+else localStorage\.setItem/g, 
`const saveDeletedOrders = () => {\n          localStorage.setItem`);
html = html.replace(/const saveUsers = \(\) => \{\n\s+else localStorage\.setItem/g, 
`const saveUsers = () => {\n          localStorage.setItem`);
html = html.replace(/const saveCategories = \(\) => \{\n\s+else localStorage\.setItem/g, 
`const saveCategories = () => {\n          localStorage.setItem`);
html = html.replace(/const saveFactoryBills = \(\) => \{\n\s+else localStorage\.setItem/g, 
`const saveFactoryBills = () => {\n          localStorage.setItem`);
html = html.replace(/const saveFactories = \(\) => \{\n\s+else localStorage\.setItem/g, 
`const saveFactories = () => {\n          localStorage.setItem`);

fs.writeFileSync('index.html', html);
