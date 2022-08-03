import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ component: Component } : any) {
    
    const { user } = useAuth();


    if (!user) {
        return <Navigate to='/' />;
    }else {
        return <Component />;
    }

}

export default ProtectedRoute;