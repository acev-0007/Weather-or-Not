# Weather or Not 🌦️

An immersive, visually stunning weather application built with React that dynamically adapts its theme and atmosphere to match real-time weather conditions.

## Features

✨ **Dynamic Theming** - Background and visuals change based on weather (sunny, rainy, cloudy, snowy, etc.)
☀️ **Animated Sun** - Glowing, pulsing sun with rotating rays for clear weather
☁️ **Floating Clouds** - Realistic clouds drift across the sky on cloudy days
🌧️ **Immersive Rain Effects** - Heavy rainfall with realistic raindrops and splash effects
⛈️ **Lightning Strikes** - Dramatic lightning flashes during thunderstorms
❄️ **Falling Snow** - Gentle snowflakes with rotation and varying sizes
🌫️ **Fog Layers** - Moving mist layers for foggy/hazy conditions
🌍 **Global City Search** - Look up weather for any city worldwide
📊 **5-Day Forecast** - View upcoming weather with daily highs and lows
🌡️ **Unit Toggle** - Switch between Fahrenheit and Celsius instantly
💨 **Detailed Conditions** - Temperature, humidity, wind speed, and "feels like" data
🎨 **Beautiful Design** - Glass-morphism effects, smooth animations, and bold typography

## Setup Instructions

### 1. Get an OpenWeatherMap API Key

This application uses the OpenWeatherMap API (free tier) to fetch weather data.

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Create a free account
3. Navigate to your API keys section
4. Copy your API key

### 2. Configure the Application

Open `weather-or-not.html` and find this line (around line 350):

```javascript
const API_KEY = '8f5b3e6a9d2c7f1e4b0a8c3d5e7f9a1b'; // Replace with your API key
```

Replace the placeholder with your actual OpenWeatherMap API key:

```javascript
const API_KEY = 'your_actual_api_key_here';
```

### 3. Run the Application

Simply open `weather-or-not.html` in any modern web browser:

- Double-click the file, or
- Right-click → Open with → Your preferred browser
- Or drag and drop into an open browser window

**Note:** The app runs entirely in the browser - no build process or local server required!

## Usage

1. **Search for a City**: Type any city name in the search bar and press Enter or click Search
2. **Toggle Temperature Units**: Click the °F/°C buttons to switch between Fahrenheit and Celsius
3. **View Forecast**: Scroll down to see the 5-day weather forecast
4. **Experience the Atmosphere**: Watch as the app transforms with dynamic backgrounds and weather animations

## Weather Background Effects

The app features 6 distinct atmospheric themes with realistic animated backgrounds:

- **Clear Sky** - Vibrant purple-to-pink gradient with an animated glowing sun, pulsing rays, and rotating light effects
- **Cloudy** - Cool grey-to-dark gradient with multiple floating clouds drifting across the sky at different speeds
- **Rain/Drizzle** - Deep blue with 60-100 realistic animated raindrops falling at varying speeds, plus splash effects at the bottom
- **Snow** - Winter white-to-teal with 80 falling snowflakes of varying sizes, rotating as they fall with realistic physics
- **Thunderstorm** - Dramatic dark grey atmosphere with heavy rain and periodic lightning flashes that illuminate the entire screen
- **Mist/Fog** - Soft beige-to-grey gradient with layered fog effects moving across the screen at different depths

## Technologies Used

- **React 18** - UI framework with hooks
- **OpenWeatherMap API** - Weather data source
- **CSS Animations** - Smooth transitions and weather effects
- **Bebas Neue & Outfit** - Custom Google Fonts
- **Glass-morphism** - Modern backdrop-blur effects

## Design Philosophy

Weather or Not transforms weather checking from a utilitarian task into an engaging, atmospheric experience. The design prioritizes:

- **Visual Immersion** - Dynamic themes that match real conditions
- **Smooth Interactions** - Polished animations and micro-interactions
- **Distinctive Typography** - Bold headlines with the Bebas Neue display font
- **Atmospheric Effects** - Animated rain and snow for deeper immersion
- **Responsive Design** - Works beautifully on desktop and mobile

## API Rate Limits

The free OpenWeatherMap tier includes:

- 60 calls/minute
- 1,000,000 calls/month

This is more than sufficient for personal use. The app makes 2 API calls per search (current weather + forecast).

## Troubleshooting

**"City not found" error:**
- Check spelling of city name
- Try adding country code (e.g., "London, UK")
- Some small cities may not be in the database

**No data showing:**
- Verify your API key is correctly inserted
- Check browser console for error messages
- Ensure you have internet connectivity
- API keys can take a few minutes to activate after creation

**Forecast not appearing:**
- This may occur for some smaller cities
- Current weather should still display correctly

## Future Enhancements

Potential features for future versions:

- Geolocation support for automatic local weather
- Hourly forecast breakdown
- Weather alerts and warnings
- Favorite cities list
- Historical weather data
- UV index and air quality
- Sunrise/sunset times

## Credits

Created by Anthony for CPSC 349 - Web Front-End Engineering

Weather data provided by [OpenWeatherMap](https://openweathermap.org/)

## License

This project is for educational purposes as part of CPSC 349 coursework.