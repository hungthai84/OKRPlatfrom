const fs = require('fs');
const path = require('path');

const applyLayout = (filename) => {
  const filepath = path.join(__dirname, 'src', 'components', filename);
  if (!fs.existsSync(filepath)) return;
  let code = fs.readFileSync(filepath, 'utf8');

  // Look for the "mt-6 pt-4 border-t border-white/10" which usually contains the tabs.
  const bannerEndRegex = /\{\/\* Banner chứa các nút tính năng như filter.*\n\s*<div className="mt-6 pt-4 border-t border-white\/10 flex flex-wrap items-center justify-between gap-4">\s*(<div[\s\S]*?)<\/div>\s*<\/div>/;

  const match = code.match(bannerEndRegex);
  if (match) {
    const tabsContent = match[1];
    
    // remove from banner
    code = code.replace(match[0], '');
    
    // add after banner
    const newTabs = `
      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">
        ${tabsContent.replace(/bg-white\/10 text-gray-300 hover:bg-white\/15/g, 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50').replace(/bg-orange-500 text-white/g, 'bg-indigo-600 text-white shadow-sm').replace(/px-3 py-1/g, 'px-6 py-2.5 text-xs font-bold gap-2 flex-1 sm:flex-none flex items-center justify-center')}
      </div>`;
    
    // Find end of banner
    const endBannerRegex = /(<div className="bg-gradient-to-r[^>]+>[\s\S]*?)(\s*<\/div>\s*)(?:{\/\* Banner chứa các nút tính năng như filter|<\!-- Banner|{activeTab)/;
    // this regex is too fragile.
  }
}

