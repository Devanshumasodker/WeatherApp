# WeatherApp
I created this app using React Native Expo. I learned a lot of new things while making this application, such as how styled components work, how to use ChatGPT efficiently to implement my own features, and how to handle deprecated methods by learning from documentation and searching for alternatives. I also added a feature to exit the keyboard when you click anywhere on the screen without entering any message.

## Introduction
WeatherApp is a simple application that provides weather updates for different locations. It fetches data from a weather API and displays the current weather conditions, forecast, and other relevant information.

## Features
- Ask for location permission from the user
- Show the weather report of the current location
- Hide the API key 😅, so no one can copy my free API
- Configure the API in the .env file
- Search and find the location to check the weather
- User-friendly interface

## Unique Features Added By Me
- Added a feature to exit the keyboard if you click anywhere without entering a message
- When you press enter, it will search the entered input
- Works on case sensitivity

## Installation
To install and run the WeatherApp, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/DevanshuMasodkar/WeatherApp.git
    ```

2. Navigate to the project directory:
    ```sh
    cd WeatherApp
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage
To start the application, use the following command:
```sh
npm start
```

# Application View

<!-- The alternative approach is to use Giphy or another website to convert the gif to a URL
and then use it this way 
-->

![Application View](./Application.gif)

## Future Scope
- Add city suggestions
- Weekly weather report
- Notifications if there is a chance of rain in   your city
- Auto-correction in city names if someone types a name incorrectly, e.g., "Canada" to "Cannnda," so it will understand
