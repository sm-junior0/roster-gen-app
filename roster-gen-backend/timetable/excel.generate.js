const xlsx = require('xlsx');
const fs = require('fs');
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()
const createExcelFile = (timetable, year, month) => {
    const ws_data = [['Nurse']];

    const daysInMonth = new Date(year, month, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        ws_data[0].push(i.toString());
    }

    timetable.forEach((nurse) => {
        const row = [nurse.nurse].concat(nurse.schedule);
        ws_data.push(row);
    });

    const ws = xlsx.utils.aoa_to_sheet(ws_data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Timetable');

    const filePath = `public/timetable_${year}_${month}.xlsx`
    xlsx.writeFile(wb, filePath);

    return filePath;
};

module.exports = createExcelFile;
