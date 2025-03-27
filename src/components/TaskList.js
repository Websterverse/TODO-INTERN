import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask } from '../redux/taskSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const user = useSelector(state => state.auth.user);

  // Show only tasks created by the logged-in user
  const userTasks = tasks.filter(task => task.user === user);

  return (
    <div className="mt-4">
      {userTasks.length > 0 ? (
        userTasks.map(task => (
          <div key={task.id} className="p-2 bg-gray-100 border rounded mb-2">
            <p>{task.text} - <span className="text-sm text-gray-500">{task.priority}</span></p>
            <button onClick={() => dispatch(removeTask(task.id))} className="text-red-500">Delete</button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
