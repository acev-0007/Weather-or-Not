const { useState, useEffect } = React;

const API_KEY = '885db7654faf2236de7dd953b38501f6';

const WEATHER_SOUNDS = {
    Clear: 'sounds/clear.mp3',
    Clouds: 'sounds/mist.mp3',
    Rain: 'sounds/rain.mp3',
    Drizzle: 'sounds/rain.mp3',
    Snow: 'sounds/snow.mp3',
    Thunderstorm: 'sounds/thunder.mp3',
    Mist: 'sounds/mist.mp3',
    Fog: 'sounds/mist.mp3',
    Haze: 'sounds/mist.mp3'
};

const WEATHER_THEMES = {
    Clear: 'theme-clear',
    Clouds: 'theme-clouds',
    Rain: 'theme-rain',
    Drizzle: 'theme-rain',
    Snow: 'theme-snow',
    Thunderstorm: 'theme-thunderstorm',
    Mist: 'theme-mist',
    Fog: 'theme-mist',
    Haze: 'theme-mist'
};

const WEATHER_ICONS = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Snow: '❄️',
    Thunderstorm: '⛈️',
    Mist: '🌫️',
    Fog: '🌫️',
    Haze: '🌫️'
};

// ====================== WEATHER OVERLAY ======================
function WeatherOverlay({ weatherCondition }) {
    if (['Rain', 'Drizzle', 'Thunderstorm'].includes(weatherCondition)) {
        const dropCount = weatherCondition === 'Thunderstorm' ? 130 : 90;
        return (
            <div className="weather-overlay">
                {[...Array(dropCount)].map((_, i) => (
                    <div
                        key={i}
                        className="rain-drop"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${0.35 + Math.random() * 0.65}s`,
                            animationDelay: `-${Math.random() * 3}s`,
                            opacity: 0.6 + Math.random() * 0.4,
                            height: `${60 + Math.random() * 80}px`
                        }}
                    />
                ))}
                {weatherCondition === 'Thunderstorm' && <div className="lightning" />}
            </div>
        );
    }

    if (weatherCondition === 'Clear') {
        return (
            <div className="weather-overlay">
                <div className="sun">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="sun-ray"
                            style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg)` }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return null;
}

function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [theme, setTheme] = useState('theme-clear');
    const [isMuted, setIsMuted] = useState(false);
    const [unit, setUnit] = useState('imperial');

    const audioRef = React.useRef(null);   // ← Important for mute

    // Play sound function
    const playWeatherSound = (condition) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const newAudio = new Audio(WEATHER_SOUNDS[condition]);
        newAudio.loop = true;
        newAudio.volume = 0.35;
        
        newAudio.play().catch(err => {
            console.log("Audio play prevented:", err);
        });

        audioRef.current = newAudio;
    };

    // Toggle mute
    const toggleMute = () => {
        const willBeMuted = !isMuted;
        setIsMuted(willBeMuted);

        if (willBeMuted) {
            if (audioRef.current) audioRef.current.pause();
        } else if (weatherData) {
            playWeatherSound(weatherData.weather[0].main);
        }
    };

    const fetchWeather = async (searchCity, selectedUnit = unit) => {
        if (!searchCity.trim()) return;

        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=${selectedUnit}`
            );
            const data = await res.json();

            if (data.cod !== 200) throw new Error(data.message || 'City not found');

            setWeatherData(data);

            const condition = data.weather[0].main;
            setTheme(WEATHER_THEMES[condition] || 'theme-clear');

            // Play sound only if not muted
            if (!isMuted) {
                playWeatherSound(condition);
            }

            // Forecast
            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=${selectedUnit}`
            );
            const forecast = await forecastRes.json();
            const daily = forecast.list.filter((_, i) => i % 8 === 0).slice(0, 5);
            setForecastData(daily);

        } catch (err) {
            console.error(err);
            alert(err.message || 'Failed to fetch weather');
        }
    };

    useEffect(() => {
        fetchWeather('Los Angeles');
    }, []);

    const changeUnit = (newUnit) => {
        if (newUnit === unit) return;
        setUnit(newUnit);
        if (weatherData) fetchWeather(weatherData.name, newUnit);
    };

    return (
        <div className={`app-container ${theme}`}>
            <WeatherOverlay weatherCondition={weatherData?.weather[0]?.main} />

            <div className="content">
                <header className="header">
                    <h1 className="title">WEATHER OR NOT</h1>
                    <p className="subtitle">IMMERSIVE WEATHER EXPERIENCE</p>
                </header>

                <div className="search-container">
                    <input
                        className="search-input"
                        placeholder="Enter city name..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && fetchWeather(city)}
                    />
                    <button className="search-button" onClick={() => fetchWeather(city)}>
                        Search
                    </button>
                </div>

                <div className="unit-toggle">
                    <button onClick={toggleMute} className="sound-btn">
                        {isMuted ? '🔇' : '🔊'}
                    </button>

                    <button
                        className={`unit-button ${unit === 'imperial' ? 'active' : ''}`}
                        onClick={() => changeUnit('imperial')}
                    >
                        °F
                    </button>
                    <button
                        className={`unit-button ${unit === 'metric' ? 'active' : ''}`}
                        onClick={() => changeUnit('metric')}
                    >
                        °C
                    </button>
                </div>

                {weatherData && (
                    <div className="current-weather">
                        <h2 className="city-name">
                            {weatherData.name}, {weatherData.sys.country}
                        </h2>
                        <div className="weather-icon-large">
                            {WEATHER_ICONS[weatherData.weather[0].main]}
                        </div>
                        <div className="temperature">
                            {Math.round(weatherData.main.temp)}°{unit === 'imperial' ? 'F' : 'C'}
                        </div>
                        <p className="weather-description">
                            {weatherData.weather[0].description}
                        </p>
                        <div className="weather-details">
                            <div className="detail-item">
                                <span className="detail-label">Humidity</span>
                                <span className="detail-value">{weatherData.main.humidity}%</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Wind</span>
                                <span className="detail-value">
                                    {Math.round(weatherData.wind.speed)} {unit === 'imperial' ? 'mph' : 'm/s'}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Feels Like</span>
                                <span className="detail-value">
                                    {Math.round(weatherData.main.feels_like)}°
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {forecastData.length > 0 && (
                    <div className="forecast-container">
                        <h3 className="forecast-title">5-DAY FORECAST</h3>
                        <div className="forecast-cards">
                            {forecastData.map((day, i) => (
                                <div key={i} className="forecast-card">
                                    <div className="forecast-date">
                                        {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                    </div>
                                    <div className="forecast-icon">
                                        {WEATHER_ICONS[day.weather[0].main]}
                                    </div>
                                    <div className="forecast-temps">
                                        <span className="temp-high">{Math.round(day.main.temp_max)}°</span>
                                        <span className="temp-low">{Math.round(day.main.temp_min)}°</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));