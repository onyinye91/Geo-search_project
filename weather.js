const geo = async (cityName) => {

    const api = "6e99790fa8ea80d4678d1444ccdf1e1c";
    const APIWeatherCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName +'&APPID=6e99790fa8ea80d4678d1444ccdf1e1c'; 
    const APIMapCall = ''

    const response = await fetch(APIWeatherCall);
    const data = await response.json();

    return(data);

};




const cityForm = document.querySelector('form');
const search = document.querySelector('.search');
const details = document.querySelector('.details');
const weather = document.querySelector('.weather_report')

const updateUI = (data) => {

    const cityWeather = data.cityWeather;

    console.log(cityWeather.weather[0].description);

    //update details template
    details.innerHTML = `
        <h5><strong>${cityWeather.name}</strong></h4>
        <div class="timezone">${cityWeather.timezone}</div>    
        <div class="windSpeed">${cityWeather.wind.speed}</div><br>
        <div class="humidity">${cityWeather.main.humidity}</div>
        <div class="weather">weather condition</div>          
        <div class="tempC"><span>${cityWeather.main.temp}<span>
            <span>F<span>
        </div>
    `;

    //weather.textContent = `${cityWeather.name} weather condition has ${cityWeather.weather[0].description} a wind speed of ${cityWeather.wind.speed}, with humidity ${cityWeather.main.humidity} and temperature of ${cityWeather.main.temp} F  `

};    



const updateCity = async (city) => {

    //console.log(city);
    const cityWeather = await geo(city);

    return{cityWeather};
    
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.myCity.value.trim();
    // trim() to prevent white space from user
    cityForm.reset();
    //clear out form fields

    //update UI with new city
    updateCity(city)
        //.then(data => console.log(data))
        .then(data => updateUI(data))
        .catch(err => updateUI(err));
    window.open('weather.html');

});