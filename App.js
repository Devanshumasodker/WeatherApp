import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback
} 
from "react-native";
import Weather from "./Components/Weather";
import SearchBar from "./Components/SearchBar";
import * as Location from "expo-location";
import { API_KEY } from "@env";  

export default function App() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    const getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return null;
            }

            let { coords } = await Location.getCurrentPositionAsync();
            if (coords) {
                setLatitude(coords.latitude);
                setLongitude(coords.longitude);

                let response = await Location.reverseGeocodeAsync({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });

                if (response.length > 0) {
                    setAddress(response[0]);
                }

                const city = response[0].city;
                console.log(city);
                return { city };
            }
        } catch (error) {
            setErrorMsg("Error getting location");
            console.error(error);
            return null;
        }
    };

    async function fetchWeatherData(cityName) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
        try {
            const response = await fetch(API);
            if (response.status === 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
        } catch (error) {
            console.log(error);
            setLoaded(true);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const location = await getLocation();
            if (location) {
                fetchWeatherData(location.city);
            }
        };

        fetchData();
    }, []);

    if (!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color="black" size={40} />
            </View>
        );
    } else if (weatherData === null) {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <SearchBar fetchWeatherData={fetchWeatherData} />
                    <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    primaryText: {
        margin: 20,
        fontSize: 28,
    },
});
