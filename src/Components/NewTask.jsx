import React, { useContext, useState } from 'react';
import style from '../style/newtask.module.css';
import Swal from 'sweetalert2'; // Import SweetAlert
import { TaskContext } from '../context/context.jsx';

const NewTask = ({closeModal}) => {
  const{addTask}  = useContext(TaskContext); // Use useContext hook here

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignPerson, setAssignPerson] = useState('');
  const [taskPriority, setTaskPriority] = useState('P0');
  const [taskStatus, setTaskStatus] = useState('Pending');
  const [startDate, setStartDate] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().slice(0, 10);
   
    function generateRandomID() {
      return Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
    }
  
    const id = generateRandomID();
    setStartDate(currentDate); // Set the startDate here
  
    const newTask = {
      taskTitle,
      taskDescription,
      assignPerson,
      taskPriority,
      taskStatus,
      startDate: currentDate, // Update startDate with currentDate
      id
    };
    addTask(newTask);
    console.log(newTask);
  
    // Show SweetAlert confirmation
    Swal.fire({
      icon: 'success',
      title: 'Task Created!',
      text: 'Your new task has been successfully created.',
      confirmButtonColor: '#28a745', // Green color for confirm button
    }).then(() => {
      // Reset form fields
      setTaskTitle('');
      setTaskDescription('');
      setAssignPerson('');
      setTaskPriority('P0');
      setTaskStatus('Pending');
      // Close the modal
      closeModal();
    });
  };
  
  return (
    <div className={style.newtask}>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.inputGroup}>
          <label className={style.label}>Task Title:</label>
          <input type="text" className={style.input} value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
        </div>
        <div className={style.inputGroup}>
          <label className={style.label}>Task Description:</label>
          <textarea className={style.input} value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} required />
        </div>
        <div className={style.inputGroup}>
          <label className={style.label}>Assign Person:</label>
          <input type="text" className={style.input} value={assignPerson} onChange={(e) => setAssignPerson(e.target.value)} required />
        </div>
        <div className={style.inputGroup}>
          <label className={style.label}>Task Priority:</label>
          <select className={style.select} value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} required>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
        <div className={style.inputGroup}>
          <label className={style.label}>Task Status:</label>
          <select className={style.select} value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} required>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Deployed">Deployed</option>
            <option value="Deferred">Deferred</option>
          </select>
        </div>
        <button className={style.button} type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default NewTask;
