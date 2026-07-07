const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'components');

const updateFile = (file, replacer) => {
  const p = path.join(dir, file);
  if (fs.existsSync(p)) {
    const code = fs.readFileSync(p, 'utf8');
    const newCode = replacer(code);
    if (code !== newCode) {
      fs.writeFileSync(p, newCode);
      console.log(`Updated ${file}`);
    } else {
      console.log(`No changes made to ${file}`);
    }
  }
}

// HomeView.tsx
updateFile('HomeView.tsx', code => {
  let res = code.replace(/\{\/\* Banner chứa các nút tính năng như filter, nút tính năng \*\/\}[\s\S]*?<\/div>\s*<\/div>/, '');
  res = res.replace(/<\/div>\s*\{?\/\* BẢNG ĐIỀU KHIỂN CHÍNH/, `</div>\n\n      {/* Sub-navigation Tabs */}\n      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">\n        <div className="flex flex-wrap items-center space-x-2 px-2 py-1">\n          <span className="text-slate-500 font-semibold text-xs mr-2">Phân loại dữ liệu:</span>\n          {['Tất cả', 'Cá nhân', 'Nhóm', 'Công ty'].map((type) => (\n            <button\n              key={type}\n              onClick={() => setFilterType(type)}\n              className={\`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all \${filterType === type ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'}\`}\n            >\n              {type}\n            </button>\n          ))}\n        </div>\n      </div>\n\n      {/* BẢNG ĐIỀU KHIỂN CHÍNH`);
  return res;
});

// Dashboard.tsx
updateFile('Dashboard.tsx', code => {
  let res = code.replace(/\{\/\* SUB NAVIGATION TABS \*\/\}[\s\S]*?<\/div>\s*<\/div>/, '');
  res = res.replace(/<\/div>\s*\{?\/\* LƯỚI THÔNG TIN/, `</div>\n\n      {/* Sub-navigation Tabs */}\n      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">\n        <div className="flex flex-wrap items-center space-x-2 px-2 py-1">\n          <span className="text-slate-500 font-semibold text-xs mr-2">Phân loại dữ liệu:</span>\n          {['Tất cả', 'Cá nhân', 'Nhóm', 'Công ty'].map((type) => (\n            <button\n              key={type}\n              onClick={() => setFilterStatus(filterStatus === type ? null : type)}\n              className={\`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all \${filterStatus === type ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'}\`}\n            >\n              {type}\n            </button>\n          ))}\n        </div>\n      </div>\n\n      {/* LƯỚI THÔNG TIN`);
  return res;
});

