import React, { useState, useEffect } from "react";
import axios from "axios";
import './profile.css';

function AddNewNurse({ onAddNurse, onUpdateNurse, editingNurse }) {
  const [nurse, setNurse] = useState({
    name: "",
    department: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingNurse) {
      setNurse(editingNurse);
    } else {
      setNurse({
        name: "",
        department: ""
      });
    }
  }, [editingNurse]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNurse((prevNurse) => ({ ...prevNurse, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    console.log("Form submitted");

    try {
      if (editingNurse) {
        await axios.put(`http://localhost:5000/update/${editingNurse._id}`, nurse, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        onUpdateNurse(nurse);
      } else {
       onAddNurse(nurse);
      }
    } catch (error) {
      console.error("Error submitting nurse:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={nurse.name}
          onChange={handleChange}
        />
        <label htmlFor="department">Department:</label>
        <input
          type="text"
          name="department"
          value={nurse.department}
          onChange={handleChange}
        />
        <button type="submit" disabled={isSubmitting}>
          {editingNurse ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddNewNurse;
