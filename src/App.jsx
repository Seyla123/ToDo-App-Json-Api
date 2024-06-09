import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TodoApp from './pages/TodoApp';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';


const App = () => {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route element={<ProtectedRoute />}>
            <Route path="/TodoApp" element={<TodoApp />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
    </>
  );
};

export default App;
