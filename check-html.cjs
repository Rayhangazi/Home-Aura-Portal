const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const stack = [];
const regex = /<\/?([a-z0-9A-Z]+)[^>]*>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const tag = match[1].toLowerCase();
  const fullTag = match[0];
  
  if (['br', 'img', 'hr', 'input', 'meta', 'link', 'path', 'svg', 'circle'].includes(tag)) continue;
  if (fullTag.endsWith('/>')) continue;
  
  if (fullTag.startsWith('</')) {
    const last = stack.pop();
    if (last !== tag) {
      console.log(`Mismatch at index ${match.index}: expected </${last}> but found </${tag}>`);
      break;
    }
  } else if (fullTag.startsWith('<')) {
    stack.push(tag);
  }
}
console.log("Remaining stack:", stack.slice(-10));
