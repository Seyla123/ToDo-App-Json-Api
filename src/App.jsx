import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TodoApp from './pages/TodoApp';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          
        </Route>
        <Route path="/TodoApp" element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;
