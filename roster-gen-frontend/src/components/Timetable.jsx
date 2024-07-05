import React, { useState } from 'react';
import axios from 'axios';

function Timetable() {
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState(null);

  const generateTimetable = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate-timetable/generate');
      const data = response.data;

      if (data && data.filePath) {
        setFilePath(data.filePath);
      } else {
        console.error('Error generating timetable');
      }
    } catch (error) {
      console.error('Error fetching timetable data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadTimetable = async () => {
    try {
      const response = await axios.get('http://localhost:5000/generate-timetable/download', {
        params: { filePath },
        responseType: 'blob', // Important
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'timetable.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading timetable: ', error);
    }
  };

  return (
    <div className="timetable-container">
      <h2>Timetable</h2>
      <div className="timetable-actions">
        {!filePath && (
          <button className="btn-generate" onClick={generateTimetable} disabled={loading}>
            Generate Timetable
          </button>
        )}
        {filePath && (
          <div>
            <h3>Timetable generated successfully.</h3>
            <button className="btn-download" onClick={downloadTimetable}>
              Download Timetable
            </button>
          </div>
        )}
      </div>
      {loading && <div className="spinner"></div>}
    </div>
  );
}

export default Timetable;
