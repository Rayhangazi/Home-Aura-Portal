const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The original sed command deleted lines, but we can just use regex to replace loadInitialData entirely
// Wait, no. I should just use regex to replace the messed up loadInitialData block.

const replaceBlock = `
        const loadInitialData = () => {
            const storedUsers = localStorage.getItem('homeaura_users');
            users.value = storedUsers ? JSON.parse(storedUsers) : defaultUsers;

            const storedOrders = localStorage.getItem('homeaura_orders');
            orders.value = storedOrders ? JSON.parse(storedOrders) : defaultOrders;

            const storedDeletedOrders = localStorage.getItem('homeaura_deleted_orders');
            deletedOrders.value = storedDeletedOrders ? JSON.parse(storedDeletedOrders) : [];

            const storedCats = localStorage.getItem('homeaura_categories');
            categories.value = storedCats ? JSON.parse(storedCats) : defaultCategories;

            const storedFactories = localStorage.getItem('homeaura_factories');
            factories.value = storedFactories ? JSON.parse(storedFactories) : defaultFactories;

            const storedFactoryBills = localStorage.getItem('homeaura_factory_bills');
            factoryBills.value = storedFactoryBills ? JSON.parse(storedFactoryBills) : [];

            // Recover session
            const storedSession = localStorage.getItem('homeaura_session');
            if (storedSession) {
              try {
                const user = JSON.parse(storedSession);
                if (user && user.username) {
                  const freshUser = users.value.find(u => u.username === user.username);
                  if (freshUser && freshUser.active) {
                    currentUser.value = freshUser;
                    activeTab.value = freshUser.role === 'admin' ? 'dashboard' : 'intake';
                  } else {
                    localStorage.removeItem('homeaura_session');
                  }
                } else {
                  localStorage.removeItem('homeaura_session');
                }
              } catch (e) {
                localStorage.removeItem('homeaura_session');
              }
            }
        };
`;

// Find where loadInitialData starts and ends
const startMatch = html.indexOf('const loadInitialData = () => {');
const endMatch = html.indexOf('        const saveOrders = () => {');

if (startMatch !== -1 && endMatch !== -1) {
  html = html.substring(0, startMatch) + replaceBlock + '\n' + html.substring(endMatch);
  fs.writeFileSync('index.html', html);
  console.log("Fixed loadInitialData");
} else {
  console.log("Could not find loadInitialData or saveOrders");
}
