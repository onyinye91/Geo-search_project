const geo = async (cityName) => {

    const api = "6e99790fa8ea80d4678d1444ccdf1e1c";
    const APIWeatherCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName +'&APPID=6e99790fa8ea80d4678d1444ccdf1e1c'; 
   //const APIMapCall = 'https://www.mapquestapi.com/staticmap/v5/map?key=7xJu4S9lffITaZdfAxSZkPPwunOEXcwl&center=' + cityName +',MA&size=@2x';

    const response = await fetch(APIWeatherCall);
    const data = await response.json();
    return(data);

};




const cityForm = document.querySelector('form');
const search = document.querySelector('.search');
//const details = document.querySelector('.details');
const weather = document.querySelector('.details');
const button = document.querySelector('.convert');
const city = cityForm.myCity.value.trim();

// console.log(button.classList);

const updateUI = (data) => {

    const cityWeather = data.cityWeather;

    console.log(cityWeather.weather[0].description);

    //update details template
    weather.innerHTML = `
        <h5><strong>${cityWeather.name} Weather Conditions</strong></h4>
        <div class="timezone">TIMEZONE: ${cityWeather.timezone}</div>    
        <div class="windSpeed">WINDSPEED: ${cityWeather.wind.speed}</div><br>
        <div class="humidity">HUMIDITY: ${cityWeather.main.humidity}</div>
        <div class="weather">WEATHER: ${cityWeather.weather[0].description}</div>          
        <div class="tempF"><span>TEMPERATURE: ${kelvinToCelsuis(cityWeather.main.temp)}<span>
            <span>&#8451;<span>
            <button type="submit" class="convert">&#8457;</button><br><br>
        </div>
        <div class="socialShare"><button><a href="#"><i class="fab fa-facebook-square"> share</i></a></button></div>
    `;
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

    // The ymaps.ready() function will be called when
    // all the API components are loaded and the DOM tree is generated.
    ymaps.ready(init);
    function init(){ 
        // Creating the map.    
        var myMap = new ymaps.Map("map", {
            // The map center coordinates.
            // Default order: “latitude, longitude”.
            // To not manually determine the map center coordinates,
            // use the Coordinate detection tool.
            center: [city],
            // Zoom level. Acceptable values:
            // from 0 (the entire world) to 19.
            zoom: 7
        });
    }
    //update UI with new city
    updateCity(city)
        //.then(data => console.log(data))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
    //window.open('weather.html');
    document.getElementById("map").style.height = "400px";

});
//conversion from k to c

const kelvinToCelsuis = (k) => {
    return (k - 273.15);
}

//kelvinToCelsuis();


const conversionToF = (celsius) => {
    let fah = celsius * 9/5 + 32;
    return fah;
}

//conversionToF();


const conversionToC = (fah) => {
    return (5/9) * (fah-32);
}

//conversionToC();

button.addEventListener('onclick', (e) => {
    e.preventDefault();
    if(e.target.classList.contains(tempF)){

    

//     weather.innerHTML = `
//     <h5><strong>${cityWeather.name} Weather Conditions</strong></h4>
//     <div class="timezone">TIMEZONE: ${cityWeather.timezone}</div>    
//     <div class="windSpeed">WINDSPEED: ${cityWeather.wind.speed}</div><br>
//     <div class="humidity">HUMIDITY: ${cityWeather.main.humidity}</div>
//     <div class="weather">WEATHER: ${cityWeather.weather[0].description}</div>          
//     <div class="tempF"><span>TEMPERATURE: ${conversionToF(cityWeather.main.temp)}<span>
//         <span>&#8457;<span>
//         <button type="submit" class="convert">&#8451;</button><br><br>
//     </div>
//     <div class="socialShare"><button><a href="#"><i class="fab fa-facebook-square"> share</i></a></button></div>
// `;
};  
});
