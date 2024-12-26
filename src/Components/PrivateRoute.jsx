import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../FirebaseProvider/FirebaseProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return null;
    }

    if (user) {
        return children;
    } else {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }
}

export default PrivateRoute
