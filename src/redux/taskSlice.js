import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch weather data
export const fetchWeather = createAsyncThunk('tasks/fetchWeather', async () => {
  const API_KEY = '0b8db2d2c9bfe319eb47d07fcae227f6';  // Replace with your API Key
  const CITY = 'Delhi'; // Change as needed
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return await response.json();
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    weather: null, // Store weather data
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Persist tasks
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Persist tasks
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weather = action.payload;
    });
  }
});

export const { addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
