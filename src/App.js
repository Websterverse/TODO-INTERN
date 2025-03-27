// src/App.js
import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Auth from './components/Auth';

const App = () => {
  return (
    <div className=" bg-white mx-auto shadow-lg ">
      <Auth />
      {/* <h1 className="text-xl font-bold text-center mb-4">Task Manager</h1> */}
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default App;

// max-w-lg mx-auto mt-10 p-5