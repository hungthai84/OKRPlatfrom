const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Look for the banner closing div and the mt-6 pt-4 border-t section
  // Wait, regex might be tricky. Let's look for standard patterns.
  
  if (content.includes('bg-gradient-to-r') && content.includes('mt-6 pt-4 border-t border-white/10')) {
     console.log('Matches:', file);
  }
}
