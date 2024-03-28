import React, { useContext, useEffect, useState } from 'react';
import style from '../style/pending.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { TaskContext } from '../context/context.jsx';
import EditTask from './EditTask.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Pending = () => {
  const { tasks, editTask, deleteTask, filteredTasks, priorityFilteredTasks } = useContext(TaskContext);
  const [deployedTasks, setDeployedTasks] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [editableTask, setEditableTask] = useState(null); // Store editable task
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    // Initialize filtered tasks based on all tasks
    let filteredPendingTasks;

    if (filteredTasks.length > 0) {
      filteredPendingTasks = filteredTasks.filter(task => task.taskStatus === 'In Progress');
    } else if (priorityFilteredTasks.length > 0) {
      filteredPendingTasks = priorityFilteredTasks.filter(task => task.taskStatus === 'In Progress');
    } else {
      filteredPendingTasks = tasks.filter(task => task.taskStatus === 'In Progress');
    }
    

    setDeployedTasks(filteredPendingTasks);
  }, [tasks, filteredTasks, priorityFilteredTasks]);


  const toggleActiveCard = (index) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
  };

  const handleEdit = (task) => {
    setEditableTask(task);
    setModalIsOpen(true); // Open the modal when Edit is clicked
  };

  const handleEditTask = (editedTask) => {
    editTask(editableTask.id, editedTask);
    setModalIsOpen(false); // Close the modal after editing task
  };

  const handleDelete = (id) => {
    deleteTask(id);
  };

  return (
    <div className={style.pending}>
      <div className={style.board}>
        <h1 className={style.heading} style={{ backgroundColor: 'orange' }}>In Progress</h1>
        {deployedTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          deployedTasks.map(task => (
            <div key={task.id} className={style.card}>
              <div className={style.taskDetails}>
                <div className={style.titleAndPriority}>
                  <h3 className={style.taskTitle}>{task.taskTitle}</h3>
                  <p className={style.taskPriority}>{task.taskPriority}</p>
                </div>
                <div className={style.description}>
                  <h4>{task.taskDescription}</h4>
                </div>
                <div className={style.assignee}>
                  <h2>{task.assignPerson}</h2>
                  <button className={style.actionsButton} onClick={() => toggleActiveCard(task.id)}>
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                  {activeCardIndex === task.id && (
                    <div className={style.actions}>
                      <button className={style.editButton} onClick={() => handleEdit(task)}>Edit</button>
                      <button className={style.deleteButton} onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                  )}
                </div>
                <p>{task.startDate}</p>
                <button className={style.statusButton}>{task.taskStatus}</button>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Edit Task Modal"
        className={style.editModal}
      >
        {/* Pass editable task and handleEditTask function */}
        {editableTask && <EditTask task={editableTask} onSave={handleEditTask} />}
      </Modal>
    </div>
  );
};

export default Pending;
