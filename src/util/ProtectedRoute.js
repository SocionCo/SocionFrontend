import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAgencySettings } from "../services/agencyServices";
import { isTokenValid } from "./JWTUtil";

export const SettingsContext = React.createContext();

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [agencySettings, setAgencySettings] = useState(null);
    const [loading, setLoading] = useState(true);  // <-- Added this loading state

    const checkUserToken = useCallback(async () => {
        console.log("Checking token");
        const userToken = localStorage.getItem('user-token');
        console.log("Is token valid? : " + isTokenValid(userToken));
        if (!userToken ||userToken === 'undefined' ) { 
            navigate('/login');
        }
        if (!isTokenValid(userToken)) {
            navigate('/login?reason=expired');
            return false;
        }
        const newSettings = await getAgencySettings();
        setAgencySettings(newSettings);
        setLoading(false);  // <-- Update loading state after checking
        return true;
        
    }, [navigate]);

    useEffect(() => {
        checkUserToken();
    }, [checkUserToken]);

    return (
        <SettingsContext.Provider value={agencySettings}>
            {
                !loading ? props.children : null  // <-- Render children only if not loading
            }
        </SettingsContext.Provider>
    );
}

export default ProtectedRoute;
