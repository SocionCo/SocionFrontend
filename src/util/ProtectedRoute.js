import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAgencySettings } from "../services/agencyServices";



export const SettingsContext = React.createContext();

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [agencySettings, setAgencySettings] = React.useState(null);

    

    const checkUserToken = useCallback(async () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            navigate('/login');
            return false;
        }
        const newSettings = await getAgencySettings();
        setAgencySettings(newSettings);
        return true;
        
    }, [navigate]);

    useEffect(() => {
        checkUserToken();
    }, [checkUserToken]);

    return (
        <SettingsContext.Provider value={agencySettings}>
            {
                checkUserToken() ? props.children : null
            }
        </SettingsContext.Provider>
    );
}

export default ProtectedRoute;
