import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useLocation = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [address, setAddress] = useState(null);

    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let { coords } = await Location.getCurrentPositionAsync();
            if (coords) {
                setLongitude(coords.longitude);
                setLatitude(coords.latitude);

                let response = await Location.reverseGeocodeAsync({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });

                if (response.length > 0) {
                    setAddress(response[0]); // Store the address object
                }
            }
        } catch (error) {
            setErrorMsg("Error getting location");
            console.error(error);
        }
    };

    // Fetch location when the hook is first used
    useEffect(() => {
        getLocation();
    }, []);

    return { longitude, latitude, address, errorMsg, getLocation };
};

export default useLocation;
