const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'components');

const checkFiles = ['GoalSettingView.tsx', 'DevGoalSettingView.tsx', 'KpiSettingView.tsx', 'MeetingSettingView.tsx', 'TaskSettingView.tsx'];

for (const file of checkFiles) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  console.log(file, 'has mt-6 pt-4 border-t:', content.includes('mt-6 pt-4 border-t'));
}
