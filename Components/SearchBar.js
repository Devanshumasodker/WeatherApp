import React, { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Pressable,
    Keyboard
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function SearchBar({ fetchWeatherData }) {
    const [cityName, setCityName] = useState("");

    return (
        <Pressable
            style={styles.searchBar}

            // We create this to ensure that the keyboard dismisses when clicking anywhere outside
            

            onPress={() => Keyboard.dismiss()} 
        >
            <TextInput
                style={styles.input}
                placeholder="Enter City name"
                value={cityName}
                onChangeText={(text) => setCityName(text)}
                onFocus={() => console.log("Focused!")}
                onSubmitEditing={() => fetchWeatherData(cityName)}
            />
            <EvilIcons
                name="search"
                size={28}
                color="black"
                onPress={() => fetchWeatherData(cityName)}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 35,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: Dimensions.get("screen").width - 20,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: "lightgray", 
        borderColor: "lightgray",
    },
    input: {
        flex: 1, 
    }
});
