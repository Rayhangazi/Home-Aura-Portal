const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I will fix the save functions that used ioSocket
html = html.replace(/const saveOrders = \(\) => \{\n\s+else localStorage\.setItem\('homeaura_orders', JSON\.stringify\(orders\.value\)\);\n\s+\};/g, 
`const saveOrders = () => { localStorage.setItem('homeaura_orders', JSON.stringify(orders.value)); };`);

html = html.replace(/const saveOrderLogs = \(\) => \{\n\s+else localStorage\.setItem\('homeaura_orderLogs', JSON\.stringify\(orderLogs\.value\)\);\n\s+\};/g, 
`const saveOrderLogs = () => { localStorage.setItem('homeaura_orderLogs', JSON.stringify(orderLogs.value)); };`);

html = html.replace(/const saveDeletedOrders = \(\) => \{\n\s+else localStorage\.setItem\('homeaura_deleted_orders', JSON\.stringify\(deletedOrders\.value\)\);\n\s+\};/g, 
`const saveDeletedOrders = () => { localStorage.setItem('homeaura_deleted_orders', JSON.stringify(deletedOrders.value)); };`);

html = html.replace(/const saveUsers = \(\) => \{\n\s+else localStorage\.setItem\('homeaura_users', JSON\.stringify\(users\.value\)\);\n\s+\};/g, 
`const saveUsers = () => { localStorage.setItem('homeaura_users', JSON.stringify(users.value)); };`);

html = html.replace(/const saveCategories = \(\) => \{\n\s+else localStorage\.setItem\('homeaura_categories', JSON\.stringify\(categories\.value\)\);\n\s+\};/g, 
`const saveCategories = () => { localStorage.setItem('homeaura_categories', JSON.stringify(categories.value)); };`);

html = html.replace(/const saveFactoryBills = \(\) => \{\n\s+else localStorage\.setItem\('homeaura_factory_bills', JSON\.stringify\(factoryBills\.value\)\);\n\s+\};/g, 
`const saveFactoryBills = () => { localStorage.setItem('homeaura_factory_bills', JSON.stringify(factoryBills.value)); };`);

html = html.replace(/const saveFactories = \(\) => \{\n\s+else localStorage\.setItem\('homeaura_factories', JSON\.stringify\(factories\.value\)\);\n\s+\};/g, 
`const saveFactories = () => { localStorage.setItem('homeaura_factories', JSON.stringify(factories.value)); };`);

// And in importSnapshot
html = html.replace(/factoryBills\.value = snapshot\.factoryBills \|\| \[\];\n\s+\n\s+else \{\n\s+localStorage\.setItem\('homeaura_users'/g, 
`factoryBills.value = snapshot.factoryBills || [];\n\n                  localStorage.setItem('homeaura_users'`);

fs.writeFileSync('index.html', html);
