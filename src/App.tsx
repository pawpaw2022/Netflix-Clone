import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthProvider from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';

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
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
