import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthProvider from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/signin' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/account' 
                element={<ProtectedRoute>
                  <Signup />
                </ProtectedRoute>}></Route>
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
