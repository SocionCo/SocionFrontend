import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();

    const checkUserToken = useCallback(() => {
        const userToken = localStorage.getItem('user-token');
        console.log(userToken);
        if (!userToken || userToken === 'undefined') {
            navigate('/login');
            return false;
        }
        return true;
    }, [navigate]);

    useEffect(() => {
        checkUserToken();
    }, [checkUserToken]);

    return (
        <React.Fragment>
            {
                checkUserToken() ? props.children : null
            }
        </React.Fragment>
    );
}

export default ProtectedRoute;
