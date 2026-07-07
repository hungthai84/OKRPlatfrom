const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src', 'components', 'TaskSettingView.tsx');
let code = fs.readFileSync(p, 'utf8');

code = code.replace('{!hideHeader ? (', '{!hideHeader ? (<>');
// We need to find the first ) : (
const lines = code.split('\n');
const idx = lines.findIndex((l, i) => i > 380 && i < 410 && l.includes(') : ('));
if (idx !== -1) {
  lines[idx] = lines[idx].replace(') : (', '</>\n      ) : (');
}
fs.writeFileSync(p, lines.join('\n'));
