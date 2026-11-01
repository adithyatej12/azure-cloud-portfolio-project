const fs = require('fs');
const path = require('path');

const dataPath = path.join(process.cwd(), 'data', 'github-contributions.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Flatten weeks into a flat array of days ordered chronologically
const days = [];
data.weeks.forEach(week => {
  week.forEach(day => {
    if (day && day.date) {
      days.push(day);
    }
  });
});

// Sort by date ascending
days.sort((a, b) => new Date(a.date) - new Date(b.date));

let currentStreak = 0;
let longestStreak = 0;
let tempStreak = 0;

// Calculate streaks
const today = new Date().toISOString().split('T')[0];
const activeDays = days.filter((d) => d.date <= today);

days.forEach((day) => {
  if (day.count > 0) {
    tempStreak++;
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
  } else {
    tempStreak = 0;
  }
});

// Calculate current streak working backwards from today/yesterday
let streakCount = 0;
for (let i = activeDays.length - 1; i >= 0; i--) {
  const d = activeDays[i];
  if (d.count > 0) {
    streakCount++;
  } else {
    // Allow today to be 0 if yesterday was active
    if (i === activeDays.length - 1 && d.date === today) {
      continue;
    }
    break;
  }
}
currentStreak = streakCount;

console.log('Total Days Evaluated:', days.length);
console.log('Total Commits / Contributions:', data.total);
console.log('Current Streak:', currentStreak, 'days');
console.log('Longest Streak:', longestStreak, 'days');
