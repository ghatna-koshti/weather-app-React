import React, { useState, useEffect } from 'react';
import './SearchWeather.css';



function SearchWeather() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState({});
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const fetchWeather = async () => {
            setIsLoading(true); // Set loading to true when fetching data

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=754ac43fb9d26fdc73a1bf10092612fc`
            );

            if (componentMounted) {
                const weatherData = await response.json();
                setData(weatherData);
                console.log(weatherData);
                setIsLoading(false); // Set loading back to false when data is fetched
            }
        };

        if (search !== '') {
            fetchWeather();
        }

        return () => {
            componentMounted = false;
        };
    }, [search]);

    const showingEmoji = () => {
        if (typeof data.main !== 'undefined') {
            if (data.weather[0].main === 'Clouds') {
                return 'fa-cloud';
            } else if (data.weather[0].main === 'Thunderstorm') {
                return 'fa-bolt';
            } else if (data.weather[0].main === 'Drizzle') {
                return 'fa-cloud-rain';
            } else if (data.weather[0].main === 'Rain') {
                return 'fa-cloud-showers-heavy';
            } else if (data.weather[0].main === 'Snow') {
                return 'fa-snow-flake';
            } else {
                return 'fa-smog';
            }
        } else {
            return 'fa-spinner fa-pulse'; // Show a spinner while loading
        }
    };

    const getWeatherImage = () => {
        const weatherCondition = data.weather?.[0]?.main.toLowerCase();
        // Define a mapping of weather conditions to image URLs
        const weatherImages = {
            clouds: 'Clouds.jpg',
            thunderstorm: 'Thunderstorm.jpg',
            drizzle: 'Drizzle.jpg',
            rain: 'Rain.jpg',
            snow: 'Snow.jpg',
            haze: 'Haze.jpg',
            smoke: 'Smoke.jpg',
            default : 'Default.jpg'
        };

        let imageName;

        // Use the mapping to get the image URL based on the weather condition
        if (data.name) {
            imageName = weatherImages[weatherCondition] || weatherImages.default;
        } else {
            // If data.name is not available (location not found), show Mars image
            imageName = 'mars.jpg';
        }
        const imageUrl = `./images/${imageName}`
        console.log('Image URL:', imageUrl);
        return imageUrl;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    };

    return (
        <div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="card text-white text-center border-0 custom-card">
                                <img
                                    src={getWeatherImage()}
                                    className="card-img img-fluid"
                                    alt="..."
                                />
                                <div className="card-img-overlay">
                                    {search === '' ? ( // Conditional rendering based on whether search is empty
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-group mb-4 w-75 mx-auto">
                                                <input
                                                    type="search"
                                                    className="form-control"
                                                    placeholder="Search City"
                                                    aria-label="Search City"
                                                    aria-describedby="basic-addon2"
                                                    name="search"
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}
                                                    required
                                                />
                                                <button
                                                    type="submit"
                                                    className="input-group-text"
                                                    id="basic-addon2"
                                                >
                                                    <i className="fas fa-search"></i>
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        // Display weather data when search is not empty
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="input-group mb-4 w-75 mx-auto">
                                                    <input
                                                        type="search"
                                                        className="form-control"
                                                        placeholder="Search City"
                                                        aria-label="Search City"
                                                        aria-describedby="basic-addon2"
                                                        name="search"
                                                        value={input}
                                                        onChange={(e) => setInput(e.target.value)}
                                                        required
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="input-group-text"
                                                        id="basic-addon2"
                                                    >
                                                        <i className="fas fa-search"></i>
                                                    </button>
                                                </div>
                                            </form>

                                            <div className="bg-dark bg-opacity-50 py-3">
                                                {isLoading ? (
                                                    <div className="spinner-grow" style={{ width: "3rem", height: "3rem" }} role="status">
                                                    </div>
                                                ) : data.name ? (
                                                    <div>
                                                        <h2 className="card-title">{data.name}</h2>
                                                        <i className="fas fa-wind"></i>
                                                        <p className="lead fw-bolder mb-0">Wind</p>
                                                        <p className="lead">{data.wind.speed} km/h</p>
                                                        <hr />
                                                        <i
                                                            className={`fas ${showingEmoji()} fa-4x mb-2`}
                                                        ></i>
                                                        <h1 className="fw-bolder mb-5">
                                                            {Math.round(data.main.temp - 273.15)}&deg;
                                                            <p
                                                                style={{ fontSize: '25px' }}
                                                                className="d-inline"
                                                            >
                                                                <sup>C</sup>
                                                            </p>
                                                        </h1>
                                                        <p className="lead fw-bolder mb-0">
                                                            {data.weather[0].main}
                                                        </p>
                                                        <p className="lead">
                                                            {Math.round(data.main.temp_min - 273.15)} &deg;C |
                                                            {Math.round(data.main.temp_max - 273.15)} &deg;C
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="bg-dark bg-opacity-50 py-3">
                                                        <p className="lead fw-bolder mb-0">Seems Like You aren't on Earth</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    );
}

export default SearchWeather
