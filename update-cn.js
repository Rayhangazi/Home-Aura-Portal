const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const cnNumbers = [
  '276331879',
  '278097551',
  '279816167',
  '279818987',
  '281926578',
  '281927672',
  '282095540',
  '282403020',
  '282531127'
];

for (let i = 0; i < 9; i++) {
  const oldCn = `CN-100${i+1}`;
  html = html.replace(new RegExp(`cnNumber: '${oldCn}'`, 'g'), `cnNumber: '${cnNumbers[i]}'`);
}

fs.writeFileSync('index.html', html);
