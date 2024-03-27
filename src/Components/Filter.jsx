import React, { useContext, useState } from 'react';
import style from '../style/filter.module.css';
import Modal from 'react-modal';
import NewTask from '../Components/NewTask';
import { TaskContext } from '../context/context';

Modal.setAppElement('#root'); // Set the app element for React Modal

const Filter = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { filterTasks, filterPriority } = useContext(TaskContext);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFilter = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form inputs
    const assignee = event.target.elements.assignee.value;
    const fromDate = event.target.elements.fromDate.value;
    const toDate = event.target.elements.toDate.value;

    // Filter by assignee and date range
    filterTasks(assignee, fromDate, toDate);
  };

  const handleSortByPriority = (event) => {
    const priority = event.target.value;

    // Sort tasks by priority
    filterPriority(priority);
  };

  return (
    <div className={style.filter}>
      <div className={style.filterContent}>
        <form onSubmit={handleFilter}>
          <label htmlFor="assignee" className={style.filterLabel}>Filter By:</label>
          <input type="text" id="assignee" className={style.filterInput} placeholder="Assignee Name" />
          {/* Date Range Inputs */}
          <input type="date" id="fromDate" className={style.filterInput} />
          <input type="date" id="toDate" className={style.filterInput} />
          <br />
          <button type="submit">Filter</button>
        </form>
        <div className={style.sortby}>
          <label htmlFor="sortBy" className={style.filterLabel}>Sort By Priority:</label>
          <select id="sortBy" className={style.filterSelect} onChange={handleSortByPriority}>
            <option value="">All</option>
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
      </div>

      <div className={style.add}>
        <button className={style.addButton} onClick={openModal}>Add New Task</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Task"
        className={style.customModal} // Apply custom class here
      >
        <NewTask closeModal={closeModal} />
        <button className={style.modalButton} onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default Filter;
