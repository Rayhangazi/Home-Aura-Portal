const fs = require('fs');
let js = fs.readFileSync('src/main.js', 'utf8');

js = js.replace("const appsScriptUrl = ref(await localforage.getItem('homeaura_apps_script_url') || 'https://script.google.com/macros/s/AKfycbzfm2zfRIZpmRHfwfCa6G3JgCWk2dH6GEP_bXozSggC70jUjNKqG1gJEkDhw9zLkbd8xw/exec');", 
"const appsScriptUrl = ref('https://script.google.com/macros/s/AKfycbzfm2zfRIZpmRHfwfCa6G3JgCWk2dH6GEP_bXozSggC70jUjNKqG1gJEkDhw9zLkbd8xw/exec');");

js = js.replace("const isDarkMode = ref(await localforage.getItem('homeaura_dark') === 'true');", 
"const isDarkMode = ref(false);");

// Now inject their loading into loadInitialData
const loadInitialDataBlock = `
        const loadInitialData = async () => {
            const dark = await localforage.getItem('homeaura_dark');
            isDarkMode.value = dark === 'true';
            applyDarkMode();

            const scriptUrl = await localforage.getItem('homeaura_apps_script_url');
            if (scriptUrl) appsScriptUrl.value = scriptUrl;
`;
js = js.replace("const loadInitialData = async () => {", loadInitialDataBlock);

fs.writeFileSync('src/main.js', js);
