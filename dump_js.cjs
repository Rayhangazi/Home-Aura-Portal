const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/) || html.match(/<script>([\s\S]*?)<\/script>/g);
let code = scriptMatch[scriptMatch.length - 1].replace(/<\/?script>/g, '');
fs.writeFileSync('app.js', code);
