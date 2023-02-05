import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './routes/Signup.jsx';
import Login from './routes/Login.jsx';
import Root from './routes/root.jsx';
import ErrorPage from "./routes/error-page.jsx";
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Root/>}/>
      <Route path='*' element={<ErrorPage/>}/>
    </Routes>
  );
};

export default App;
