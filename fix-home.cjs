const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src', 'components', 'HomeView.tsx');

let code = fs.readFileSync(p, 'utf8');

// I will just read lines, find where `<span>Phân tích hiệu suất</span>` is, and exactly what follows.
const lines = code.split('\n');
const idx = lines.findIndex(l => l.includes('<span>Phân tích hiệu suất</span>'));

// The lines after idx are:
// idx+1: </button>
// idx+2: </div>
// idx+3: </div>
// idx+4: </div>
// idx+5: </div>
// Let's remove any extra `</div>` so there's exactly 2 before `{/* Sub-navigation Tabs */}`

let removeCount = 0;
let i = idx + 2;
while (lines[i].includes('</div>')) {
   i++;
}

// We want exactly 2 `</div>` between `</button>` and `{/* Sub-navigation Tabs */}` (excluding empty lines)
lines.splice(idx + 2, i - (idx + 2), '          </div>', '        </div>', '      </div>');
// Wait! `</button>` is inside `<div className="flex space-x-3 shrink-0">`
// so we need 1 `</div>` for that flex container, 1 `</div>` for the flex row container, 1 `</div>` for the banner container!
// Total 3 `</div>`s!

lines.splice(idx + 2, i - (idx + 2), '          </div>', '        </div>', '      </div>');

fs.writeFileSync(p, lines.join('\n'));
