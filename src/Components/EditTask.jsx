import React, { useState } from 'react';
import style from '../style/edit.module.css';

const EditTask = ({ task, onSave }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };
  const handleStatusChange = (e) => {
    const { value } = e.target;
    const currentDate = new Date().toISOString().slice(0, 10); // Get current date
  
    if (value === "Completed") {
      // Set End Date to current date
      setEditedTask({ ...editedTask, taskStatus: value, endDate: currentDate });
    } else {
      setEditedTask({ ...editedTask, taskStatus: value });
    }
  };
  

  return (
    <div className={style.editTask}>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Task Title input field */}
        <div className={style.inputGroup}>
          <label className={style.label}>Task Title:</label>
          <input
            type="text"
            className={style.input}
            name="taskTitle"
            value={editedTask.taskTitle}
            onChange={handleInputChange}
            required={!editedTask.taskStatus === "Completed"} // Required if not "Completed"
            disabled={editedTask.taskStatus === "Completed"} // Disabled if "Completed"
          />
        </div>
        {/* Task Description input field */}
        <div className={style.inputGroup}>
          <label className={style.label}>Task Description:</label>
          <textarea
            className={style.input}
            name="taskDescription"
            value={editedTask.taskDescription}
            onChange={handleInputChange}
            required={!editedTask.taskStatus === "Completed"} // Required if not "Completed"
            disabled={editedTask.taskStatus === "Completed"} // Disabled if "Completed"
          />
        </div>
        {/* Assign Person input field */}
        <div className={style.inputGroup}>
          <label className={style.label}>Assign Person:</label>
          <input
            type="text"
            className={style.input}
            name="assignPerson"
            value={editedTask.assignPerson}
            onChange={handleInputChange}
            required={!editedTask.taskStatus === "Completed"} // Required if not "Completed"
            disabled={editedTask.taskStatus === "Completed"} // Disabled if "Completed"
          />
        </div>
        {/* Task Priority input field */}
        <div className={style.inputGroup}>
          <label className={style.label}>Task Priority:</label>
          <select
            className={style.select}
            name="taskPriority"
            value={editedTask.taskPriority}
            onChange={handleInputChange}
            required
          >
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
        <div className={style.inputGroup}>
          <label className={style.label}>Task Status:</label>
          <select className={style.select} name="taskStatus" value={editedTask.taskStatus} onChange={handleStatusChange} required>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Deployed">Deployed</option>
            <option value="Deferred">Deferred</option>
          </select>
        </div>
        {/* Render endDate input field if task status is "Completed" */}
        {editedTask.taskStatus === "Completed" && (
          <div className={style.inputGroup}>
            <label className={style.label}>End Date:</label>
            <input type="date" className={style.input} name="endDate" value={editedTask.endDate || ''} onChange={handleInputChange} required />
          </div>
        )}
        <button className={style.button} type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
