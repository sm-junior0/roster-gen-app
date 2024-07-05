const express = require('express');
const xlsx = require('xlsx');
const fs = require('fs');
const Nurse = require('../models/data.model.js');  // Adjust the path if necessary
const { Router } = require('express');
const router = Router();
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

router.use(express.json());

// Function to create and save Excel file
const createExcelFile = (timetable, year, month) => {
    const ws_data = [['Nurse']];

    const daysInMonth = new Date(year, month + 1, 0).getDate();
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
    const filePath = `public/timetable_${year}_${month + 1}.xlsx`;
    xlsx.writeFile(wb, filePath);

    return filePath;
};

// Generate Timetable
const generateTimetable = async (year, month) => {
    const nurses = await Nurse.find();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const timetable = [];

    // Initialize timetable
    for (let nurse of nurses) {
        timetable.push({
            nurse: nurse.name,
            schedule: Array(daysInMonth).fill('O'),
        });
    }

    const scheduleOrder = ['D1', 'D1', 'O', 'N1', 'N1', 'O', 'O'];
    let scheduleIndex = 0;

    for (let day = 0; day < daysInMonth; day++) {
        let dayAssignments = Array(14).fill(0);  // Track day assignments for each site
        let nightAssignments = Array(14).fill(0);  // Track night assignments for each site

        for (let nurse of timetable) {
            const siteIndex = Math.floor(scheduleIndex / scheduleOrder.length) % 14;
            const order = scheduleOrder[scheduleIndex % scheduleOrder.length];

            if (order.startsWith('D') && dayAssignments[siteIndex] < 2) {
                nurse.schedule[day] = `D${siteIndex + 1}`;
                dayAssignments[siteIndex]++;
            } else if (order.startsWith('N') && nightAssignments[siteIndex] < 2) {
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

router.post('/generate', async (req, res) => {
    if (!year || !month) {
        return res.status(400).json({ error: 'Year and month are required' });
    }

    try {
        const timetable = await generateTimetable(year, month);

        // Save timetable to Excel file
        const filePath = createExcelFile(timetable, year, month);
        
        res.status(200).json({ filePath });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.get('/download', (req, res) => {
    const filePath = req.query.filePath;

    if (!filePath) {
        return res.status(400).json({ error: 'File path is required' });
    }

    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
        }
        fs.unlinkSync(filePath); // Delete the file after download
    });
});

module.exports = router;
