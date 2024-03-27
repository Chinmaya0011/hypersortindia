import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/context';

const TaskList = () => {
  const { tasks, filteredTasks, priorityFilteredTasks, filterTasks, filterPriority } = useContext(TaskContext);
  const [sortBy, setSortBy] = useState(null); // State to manage sorting option

  // Function to handle sorting
  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };

  // Function to handle filter by priority
  const handlePriorityFilter = (priority) => {
    filterPriority(priority);
  };

  // Function to reset filters
  const resetFilters = () => {
    // Reset filters
    // You may need to implement the logic for resetting other filters if needed
    // This example only resets the priority filter
    filterPriority(null);
  };

  return (
    <div>
      {/* Sorting options */}
      <div>
        <button onClick={() => handleSort('priority')}>Sort by Priority</button>
        <button onClick={() => handleSort('startDate')}>Sort by Start Date</button>
        <button onClick={() => handleSort('endDate')}>Sort by End Date</button>
      </div>
      
      {/* Priority Filter */}
      <div>
        <button onClick={() => handlePriorityFilter('P0')}>Priority P0</button>
        <button onClick={() => handlePriorityFilter('P1')}>Priority P1</button>
        <button onClick={() => handlePriorityFilter('P2')}>Priority P2</button>
        {/* Add more priority filter buttons as needed */}
      </div>

      {/* Reset Filters Button */}
      <button onClick={resetFilters}>Reset Filters</button>

      {/* Display tasks */}
      <table>
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Assignee</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over tasks based on filtered state or original tasks */}
          {(filteredTasks.length > 0 ? filteredTasks : (priorityFilteredTasks.length > 0 ? priorityFilteredTasks : tasks)).map(task => (
            <tr key={task.id}>
              <td>{task.taskTitle}</td>
              <td>{task.taskDescription}</td>
              <td>{task.assignPerson}</td>
              <td>{task.taskPriority}</td>
              <td>{task.taskStatus}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
