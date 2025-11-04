
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const accessToken = localStorage.getItem('accessToken');
    const isAuthenticated = !!accessToken;
    if (isAuthenticated) {
        return <Outlet />;
    }
    else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;