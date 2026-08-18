const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/) || html.match(/<script>([\s\S]*?)<\/script>/g);
if (scriptMatch) {
  let code = scriptMatch[scriptMatch.length - 1]; // last script tag is usually the Vue app
  code = code.replace(/<\/?script>/g, '');
  try {
    new Function(code);
    console.log("Syntax OK");
  } catch (e) {
    console.log("Syntax Error:", e.message);
  }
}
