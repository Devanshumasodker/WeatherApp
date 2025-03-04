import React from "react";
import { StyleSheet, Text, ImageBackground, View, Dimensions, StatusBar, ActivityIndicator } from "react-native";
import SearchBar from "./SearchBar";
import hazeImage from "../assets/haze.jpg";
import rainy from "../assets/rainy.jpg";
import snow from "../assets/snow.jpg";
import sunny from "../assets/sunny.jpg";

export default function Weather({ weatherData, fetchWeatherData }) {
    if (!weatherData) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    }

    const { weather, name, main: { temp, humidity }, wind: { speed } } = weatherData;
    const [{ main }] = weather;

    function getBackgroundImg(weather) {
        if (weather === "Snow") return snow;
        if (weather === "Clear") return sunny;
        if (weather === "Rain") return rainy;
        if (weather === "Haze") return hazeImage;
        return hazeImage;
    }

    const backgroundImage = getBackgroundImg(main);
    let textColor = backgroundImage !== sunny ? "white" : "black";

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="darkgray" />
            <ImageBackground source={backgroundImage} style={styles.backgroundImg} resizeMode="cover">
                <SearchBar fetchWeatherData={fetchWeatherData} />

                <View style={{ alignItems: "center" }}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: "bold", fontSize: 46 }}>
                        {name}
                    </Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: "bold" }}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: textColor }}>{temp} °C</Text>
                </View>

                <View style={styles.extraInfo}>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: "white" }}>Humidity</Text>
                        <Text style={{ fontSize: 22, color: "white" }}>{humidity} %</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: "white" }}>Wind Speed</Text>
                        <Text style={{ fontSize: 22, color: "white" }}>{speed} m/s</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get("screen").width,
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
    },
    extraInfo: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        padding: 10,
    },
    info: {
        width: Dimensions.get("screen").width / 2.5,
        backgroundColor: "rgba(0,0,0, 0.5)",
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
