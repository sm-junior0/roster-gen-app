import React, { useState, useEffect } from 'react';
import { Table, Modal, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AddNewNurse from './AddNewNurse';
import './profile.css';
function Page2() {
  const [nurses, setNurses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNurse, setEditingNurse] = useState(null);
  useEffect(() => {
    fetchNurses();
  }, []);
  const fetchNurses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/all");
      const nursesWithIds = response.data.map((nurse, index) => ({
        ...nurse,
        id: index + 1,
      }));
      setNurses(nursesWithIds);
    } catch (error) {
      console.error('Error fetching nurses:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (record) => {
    setEditingNurse(record);
    setIsModalVisible(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this nurse?')) {
      try {
        await axios.delete(`http://localhost:5000/delete/${id}`);
        message.success('Nurse deleted successfully');
        fetchNurses();
      } catch (error) {
        console.error('Error deleting nurse:', error);
        message.error('Failed to delete nurse');
      }
    }
  };
  const handleAddNurse = async (newNurse) => {
    try {
      await axios.post("http://localhost:5000/New", newNurse);
      message.success('Nurse added successfully');
      fetchNurses();
    } catch (error) {
      console.error('Error adding nurse:', error);
      message.error('Failed to add nurse');
    }
    setIsModalVisible(false);
  };
  const handleUpdateNurse = async (updatedNurse) => {
    try {
      await axios.put(`http://localhost:5000/update/${editingNurse._id}`, updatedNurse);
      message.success('Nurse updated successfully');
      fetchNurses();
    } catch (error) {
      console.error('Error updating nurse:', error);
      message.error('Failed to update nurse');
    }
    setIsModalVisible(false);
    setEditingNurse(null);
  };
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span className="action-icons">
          <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(record)} className="edit-icon" />
          <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(record._id)} className="delete-icon" />
        </span>
      ),
    },
  ];
  return (
    <div>
      <h2>NURSES</h2>
      <button className="btn-add" onClick={() => { setEditingNurse(null); setIsModalVisible(true); }}>
        <FontAwesomeIcon icon={faPlus} className="add-icon" />
        Add New Nurse
      </button>
      <Table dataSource={nurses} columns={columns} loading={loading} rowKey="_id" />
      <Modal
        title={editingNurse ? "Edit Nurse" : "Add New Nurse"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddNewNurse
          onAddNurse={handleAddNurse}
          onUpdateNurse={handleUpdateNurse}
          editingNurse={editingNurse}
        />
      </Modal>
    </div>
  );
}
export default Page2;