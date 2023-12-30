import React, { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAgencySettings } from "../services/agencyServices";
import { isTokenValid } from "./JWTUtil";

export const SettingsContext = React.createContext();

const ProtectedRoute = (props) => {
    const { contractId } = useParams();
    console.log("Paramas", contractId);
    const navigate = useNavigate();
    const [agencySettings, setAgencySettings] = useState(null);
    const [loading, setLoading] = useState(true);  // <-- Added this loading state

    const checkUserToken = useCallback(async () => {
        console.log("Checking token");
        const userToken = localStorage.getItem('user-token');
        console.log("Is token valid? : " + isTokenValid(userToken));
        if (!userToken ||userToken === 'undefined' ) { 
            if (!!contractId) { 
                console.log("Navigating puss");
                navigate(`/login?redirect=${contractId}`);
                return false;

            }
            navigate('/login');
            return false;
        }
        if (!isTokenValid(userToken)) {
            if (!!contractId) { 
                console.log("Navigating puss");
                navigate(`/login?redirect=${contractId}&reason=expired`);
            }
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
