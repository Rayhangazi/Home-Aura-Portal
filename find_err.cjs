const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/) || html.match(/<script>([\s\S]*?)<\/script>/g);
let code = scriptMatch[scriptMatch.length - 1].replace(/<\/?script>/g, '');
let lines = code.split('\n');
for(let i=0; i<lines.length; i++) {
  if (lines[i].includes('else {')) {
    console.log("Line " + i + ": " + lines[i]);
  }
}
