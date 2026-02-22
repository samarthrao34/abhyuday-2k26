const events = require('./src/data/events.json');
const dates = {};
events.forEach(e => {
    const day = e.date || 'TBA';
    if (!dates[day]) dates[day] = [];
    dates[day].push({ name: e.name, time: e.time, venue: e.venue, dept: e.departmentId });
});
Object.keys(dates).sort().forEach(day => {
    console.log(`\n=== ${day} (${dates[day].length} events) ===`);
    dates[day].sort((a, b) => a.time.localeCompare(b.time));
    dates[day].forEach(e => console.log(`  ${e.time.padEnd(25)} | ${e.name.substring(0, 40).padEnd(42)} | ${e.venue}`));
});
