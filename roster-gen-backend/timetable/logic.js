const Nurse = require('../models/data.model.js');
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()

const generateTimetable = async (year, month) => {
    const nurses = await Nurse.find();
    const daysInMonth = new Date(year, month, 0).getDate();
    const timetable = [];

    // Initialize timetable
    for (let nurse of nurses) {
        timetable.push({
            nurse: nurse.name,
            schedule: Array(daysInMonth).fill('O'),
        });
    }

    const scheduleOrder = ['D1', 'D1', 'O', 'N1', 'N1', 'O'];
    let scheduleIndex = 0;

    for (let day = 0; day < daysInMonth; day++) {
        let dayAssignments = Array(14).fill(0);  // Track day assignments for each site
        let nightAssignments = Array(14).fill(0);  // Track night assignments for each site

        for (let nurse of timetable) {
            const siteIndex = scheduleIndex % 14;

            if (scheduleOrder[scheduleIndex] === 'D1' && dayAssignments[siteIndex] < 2) {
                nurse.schedule[day] = `D${siteIndex + 1}`;
                dayAssignments[siteIndex]++;
            } else if (scheduleOrder[scheduleIndex] === 'N1' && nightAssignments[siteIndex] < 2) {
                nurse.schedule[day] = `N${siteIndex + 1}`;
                nightAssignments[siteIndex]++;
            } else {
                nurse.schedule[day] = 'O';
            }

            scheduleIndex = (scheduleIndex + 1) % (scheduleOrder.length * 14);
        }
    }

    return timetable;
};

module.exports = generateTimetable;
