const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'components');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const p = path.join(dir, file);
  let code = fs.readFileSync(p, 'utf8');

  // Look for:
  // <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
  // ...
  // </div> (the closing div of the banner)
  
  // Actually, wait. It's easier:
  // 1. Find the start of the banner inner div for tabs: `<div className="mt-6 pt-4 border-t border-white/10`
  const splitIndex = code.indexOf('<div className="mt-6 pt-4 border-t border-white/10');
  if (splitIndex !== -1) {
    // 2. Find the closing </div> of that block. We can just count divs.
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
      
      // Insert right after the banner's closing div.
      // The banner closing div should be the very next `</div>` after endIdx (ignoring whitespace).
      const bannerCloseMatch = code.substring(endIdx - tabsBlock.length).match(/^\s*<\/div>/);
      
      if (bannerCloseMatch) {
         // Create the new styled block
         // Just extract the inner content of tabsBlock
         let innerContent = tabsBlock.substring(tabsBlock.indexOf('>') + 1, tabsBlock.lastIndexOf('</div>'));
         
         // Fix the CSS classes of elements inside innerContent
         innerContent = innerContent.replace(/text-white/g, 'text-slate-800 dark:text-slate-200');
         innerContent = innerContent.replace(/text-gray-400/g, 'text-slate-500 dark:text-slate-400');
         innerContent = innerContent.replace(/text-gray-300/g, 'text-slate-500 dark:text-slate-400');
         innerContent = innerContent.replace(/text-blue-200/g, 'text-slate-500 font-semibold');
         innerContent = innerContent.replace(/bg-white\/10/g, 'bg-slate-100 dark:bg-slate-800');
         innerContent = innerContent.replace(/bg-white\/15/g, 'bg-slate-200 dark:bg-slate-700');
         innerContent = innerContent.replace(/border-white\/10/g, 'border-slate-200/50');
         
         // Specifically replace the text "pb-1 border-b-2 border-orange-500 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center space-x-1" 
         // or similar with the new button classes. Actually, we can just wrap it in our new container and let it be, as long as it's outside.
         
         const newBlock = `
      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full px-2 py-1">
          ${innerContent}
        </div>
      </div>
`;
         
         const insertPos = endIdx - tabsBlock.length + bannerCloseMatch[0].length;
         code = code.substring(0, insertPos) + '\n' + newBlock + code.substring(insertPos);
         
         fs.writeFileSync(p, code);
         console.log(`Successfully refactored ${file}`);
      }
    }
  }
}

