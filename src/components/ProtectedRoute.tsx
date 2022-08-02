import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ component } : any) {
    
    const { user } = useAuth();


    if (!user) {
        return <Navigate to='/' />;
    }else {
        return component;
    }

}

export default ProtectedRoute;