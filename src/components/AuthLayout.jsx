import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Set loading to false once the authentication check is done
        const checkAuthentication = () => {
            if (authentication && authStatus !== authentication) {
                navigate('/login');
            } else if (!authentication && authStatus === authentication) {
                navigate('/');
            }
            setLoading(false); // Stop loading after authentication check
        };

        checkAuthentication();
    }, [authStatus, navigate, authentication]);

    // Show a loading message or spinner while checking authentication
    if (loading) {
        return <h1>Loading...</h1>; // You can replace this with a spinner or loading component
    }

    return <>{children}</>;
}
