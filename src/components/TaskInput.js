import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, fetchWeather } from '../redux/taskSlice';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const dispatch = useDispatch();
  const weather = useSelector(state => state.tasks.weather);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const tasks = useSelector(state => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  const handleAddTask = () => {
    if (task.trim() && isAuthenticated) {
      const timestamp = new Date().toLocaleString();
      dispatch(addTask({
        id: Date.now(),
        text: task,
        priority,
        user,
        timestamp
      }));
      setTask('');
      setPriority('Medium');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-600 text-white';
      case 'Medium': return 'bg-yellow-500 text-black';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="h-[600] bg-gray-300 flex flex-col items-center p-6">
      <div className="max-w-4xl  w-full bg-white shadow-lg rounded-lg p-6">
        {isAuthenticated ? (
          <>
            <p className="text-lg font-semibold text-gray-700 mb-4">Logged in as: <span className="text-blue-600">{user}</span></p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="Enter a task..." 
              />

              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded-lg ${priority === 'High' ? 'bg-red-600 text-white' : 'bg-gray-300'}`}
                  onClick={() => setPriority('High')}
                >🔥 High</button>

                <button 
                  className={`px-4 py-2 rounded-lg ${priority === 'Medium' ? 'bg-yellow-500 text-black' : 'bg-gray-300'}`}
                  onClick={() => setPriority('Medium')}
                >⚡ Medium</button>

                <button 
                  className={`px-4 py-2 rounded-lg ${priority === 'Low' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => setPriority('Low')}
                >✅ Low</button>
              </div>

              <button 
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
                onClick={handleAddTask}
              >
                ➕ Add Task
              </button>
            </div>

            {/* Task List */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Your Tasks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {tasks.filter(task => task.user === user).map((task) => (
                  <div key={task.id} className={`p-4 rounded-lg shadow-md ${getPriorityColor(task.priority)}`}>
                    <p className="text-lg font-semibold">{task.text}</p>
                    <p className="text-sm">Priority: {task.priority}</p>
                    <p className="text-xs text-gray-200">Created: {task.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-red-600 text-lg">🚫 You must be logged in to add tasks.</p>
        )}
      </div>

      {/* Weather Information */}
      {weather && weather.weather && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md flex items-center space-x-4">
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" className="w-14 h-14" />
          <div>
            <p className="text-lg font-bold">{weather.weather[0].description}</p>
            <p className="text-gray-700">🌡 {weather.main.temp}°C</p>
            <p className="text-gray-700">💧 Humidity: {weather.main.humidity}%</p>
            <p className="text-gray-700">🌬 Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskInput;
