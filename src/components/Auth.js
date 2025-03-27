import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/authSlice';

const Auth = () => {
  const [username, setUsername] = useState('');
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  // Load username from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(login(storedUser));
    }
  }, [dispatch]);

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username));
      localStorage.setItem('user', username); // Save username in localStorage
      setUsername('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user'); // Remove user data from localStorage
  };

  return (
    <div className="p-4 flex justify-between">
          <h1 className='text-black  text-xl font-bold text-center  '>TASK MANAGER</h1>
      {isAuthenticated ? (
        <>
          <p className="text-sm text-gray-600">Welcome, {user}!</p>
          <button className="p-2 bg-red-500 text-white rounded" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <input 
            type="text" 
            className="p-2 border rounded" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter username" 
          />
        
          <button className="p-2 bg-green-500 text-white rounded" onClick={handleLogin}>Login</button>
         
        </>
      )}
    </div>
  );
};

export default Auth;
 