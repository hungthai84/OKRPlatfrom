const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'components');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const p = path.join(dir, file);
  let code = fs.readFileSync(p, 'utf8');

  // Look for:
  const searchStr = '<div className="flex bg-white/10 p-1 rounded-xl border border-white/10 self-start md:self-auto shrink-0">';
  const splitIndex = code.indexOf(searchStr);
  
  if (splitIndex !== -1) {
    let depth = 0;
    let endIdx = -1;
    let started = false;
    
    for (let i = splitIndex; i < code.length; i++) {
      if (code.substring(i, i + 4) === '<div') {
        depth++;
        started = true;
      } else if (code.substring(i, i + 5) === '</div') {
        depth--;
        if (started && depth === 0) {
          endIdx = i + 6;
          break;
        }
      }
    }
    
    if (endIdx !== -1) {
      const tabsBlock = code.substring(splitIndex, endIdx);
      
      // Remove it from inside the banner
      code = code.replace(tabsBlock, '');
      
      // Make sure banner has shrink-0
      code = code.replace('overflow-hidden transition-all duration-300"', 'overflow-hidden transition-all duration-300 shrink-0"');
      
      // The banner closing div should be exactly two `</div>` away (one for the flex row, one for the banner wrapper).
      // Let's just find the end of the banner by looking for `      </div>` that closes it.
      // A better way is to find the exact match of `</div>\n      </div>` after the replacement.
      
      // Let's find the closing of the banner:
      const bannerMatch = code.substring(0, splitIndex).match(/<div className="bg-gradient-to-r[^>]+>/);
      if (bannerMatch) {
         let d = 0;
         let bannerEndIdx = -1;
         let s = false;
         const bannerStart = code.indexOf(bannerMatch[0]);
         for (let i = bannerStart; i < code.length; i++) {
           if (code.substring(i, i + 4) === '<div') { d++; s = true; }
           else if (code.substring(i, i + 5) === '</div') {
             d--;
             if (s && d === 0) { bannerEndIdx = i + 6; break; }
           }
         }
         
         if (bannerEndIdx !== -1) {
           let innerContent = tabsBlock.substring(tabsBlock.indexOf('>') + 1, tabsBlock.lastIndexOf('</div>'));
           
           innerContent = innerContent.replace(/text-white/g, 'text-indigo-700 shadow-sm');
           innerContent = innerContent.replace(/text-slate-100/g, 'text-slate-500 hover:text-slate-700');
           innerContent = innerContent.replace(/text-blue-100/g, 'text-slate-500 hover:text-slate-700');
           innerContent = innerContent.replace(/text-orange-100/g, 'text-slate-500 hover:text-slate-700');
           innerContent = innerContent.replace(/text-amber-100/g, 'text-slate-500 hover:text-slate-700');
           innerContent = innerContent.replace(/text-violet-100/g, 'text-slate-500 hover:text-slate-700');
           innerContent = innerContent.replace(/bg-white\s/g, 'bg-white '); // this handles bg-white text-indigo-700
           
           const newBlock = `
      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 self-start md:self-auto shrink-0">
          ${innerContent}
        </div>
      </div>
`;
           
           code = code.substring(0, bannerEndIdx) + '\n' + newBlock + code.substring(bannerEndIdx);
           
           fs.writeFileSync(p, code);
           console.log(`Successfully refactored ${file}`);
         }
      }
    }
  }
}
