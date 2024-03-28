// TaskProvider.js
import React, { createContext, useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert
import data from '../Data/Data';

// Create the context
const TaskContext = createContext();

// Create the context provider
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(data);
  const [filteredTasks, setFilteredTasks] = useState(filterTask);
  const [priorityFilteredTasks, setPriorityFilteredTasks] = useState([]);
  
const filterTask=[
  {
    startDate:"",
    endDate:"",
    assigne:""
  }
]

  // Function to add a new task
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Function to edit an existing task
  const editTask = (id, newTask) => {
    const newText = tasks.map(task => {
      if (task.id === id) {
        return { ...task, ...newTask };
      }
      return task;
    });
    setTasks(newText);
  };

  // Function to delete a task
  const deleteTask = (id) => {
    // Show SweetAlert confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Filter out the task with the given id
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        // Show success message using SweetAlert
        Swal.fire(
          'Deleted!',
          'Your task has been deleted.',
          'success'
        );
      }
    });
  };
  
// Function to filter tasks based on provided criteria
const filterTasks = (sd, ed, assignee) => {
  setFilteredTasks(tasks.filter(task => {

if(task.startDate===sd){
  filterTask.startDate[sd]
}
if( task.endDate===ed){
  filterTask.endDate[ed]
}
if(task.assignPerson===assignee){
  filterTask.assignPerson(assignee)
}

  })
)
};

console.log(filteredTasks)
// Function to filter tasks by priority
const filterPriority = (fpriority) => {
  const priorityFilteredTasks = tasks.filter(task => task.taskPriority === fpriority);
  setPriorityFilteredTasks(priorityFilteredTasks);
  setFilteredTasks([]); // Clear assignee filter
};

  return (
    <TaskContext.Provider value={{ tasks, filteredTasks, priorityFilteredTasks, addTask, editTask, deleteTask, filterTasks, filterPriority }}>

    {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
