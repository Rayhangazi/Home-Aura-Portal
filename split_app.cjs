const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Extract CSS
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch) {
    fs.writeFileSync('src/index.css', cssMatch[1].trim());
    html = html.replace(cssMatch[0], '<link rel="stylesheet" href="/src/index.css" />');
}

// 2. Extract JS
const jsMatch = html.match(/<script>([\s\S]*?)<\/script>/g);
let vueJs = '';
if (jsMatch && jsMatch.length > 1) {
    // The last script tag is usually the Vue app
    const appScript = jsMatch[jsMatch.length - 1];
    vueJs = appScript.replace(/<\/?script>/g, '').trim();
    html = html.replace(appScript, '<script type="module" src="/src/main.js"></script>');
}

// Write the new HTML
fs.writeFileSync('index.html', html);

// 3. Apply LocalForage patch to JS
// We need to inject localforage CDN into index.html
html = html.replace('</head>', '  <script src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js"></script>\n</head>');
fs.writeFileSync('index.html', html);

// Replace localStorage with localforage in JS
// Since localforage is async, we need to handle loading slightly differently, but for saving we can just fire and forget.
vueJs = vueJs.replace(/localStorage\.setItem/g, 'localforage.setItem');
vueJs = vueJs.replace(/localStorage\.removeItem/g, 'localforage.removeItem');

// Patch loadInitialData to be async
vueJs = vueJs.replace('const loadInitialData = () => {', 'const loadInitialData = async () => {');
vueJs = vueJs.replace(/localStorage\.getItem/g, 'await localforage.getItem');

fs.writeFileSync('src/main.js', vueJs);
console.log("Splitting complete!");
