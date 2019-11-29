const geo = async (cityName) => {

    //const api = "6e99790fa8ea80d4678d1444ccdf1e1c";
    const APIWeatherCall = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName +'&APPID=6e99790fa8ea80d4678d1444ccdf1e1c'; 
   //const APIMapCall = 'https://www.mapquestapi.com/staticmap/v5/map?key=7xJu4S9lffITaZdfAxSZkPPwunOEXcwl&center=' + cityName +',MA&size=@2x';

    const response = await fetch(APIWeatherCall);

    if(response.status === 404){
        throw new Error('city not found')
    }
    const data = await response.json();
    return(data);

};




const cityForm = document.querySelector('form');
//const search = document.querySelector('.search');
//const details = document.querySelector('.details');
const weather = document.querySelector('.details');
//const button = document.querySelector('.tempF');
const city = cityForm.myCity.value.trim();
const map = document.querySelector('#map');


// console.log(button.classList);

const updateUI = (data) => {

    const cityWeather = data.cityWeather;

    const lon = cityWeather.coord.lon;
    const lat = cityWeather.coord.lat;
    console.log(cityWeather.weather[0].description);
    console.log(cityWeather.coord.lat);
    console.log(cityWeather.coord.lon);
    

    //update details template
    weather.innerHTML = `
        <div><h2><strong>${cityWeather.name} Weather Conditions</strong></h2></div>
        <div class="timezone">TIMEZONE: GMT ${timeZone(cityWeather.timezone)}</div>    
        <div class="windSpeed">WINDSPEED: ${cityWeather.wind.speed}</div><br>
        <div class="humidity">HUMIDITY: ${cityWeather.main.humidity}</div>
        <div class="weather">WEATHER: ${cityWeather.weather[0].description}</div>          
        <div class="tempF" style="display:block"><span>TEMPERATURE: ${kelvinToCelsuis(cityWeather.main.temp)}<span>
            <span>&#8451;<span>
            <button type="submit" class="convert" onClick="myfunc()">&#8457;</button><br><br>
        </div>
        <div class="tempC" style="display:none"><span>TEMPERATURE: ${conversionToF(cityWeather.main.temp)}<span>
            <span>&#8457;<span>
            <button type="submit" class="convert1" onClick="myFunc()">&#8451;</button><br><br>
        </div>
        <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&layout=button_count&size=small&width=96&height=20&appId" width="96" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
        `;

    //     // The ymaps.ready() function will be called when
    // // all the API components are loaded and the DOM tree is generated.
    // ymaps.ready(init);
    // function init(){ 
    //     // Creating the map.    
    //     var myMap = new ymaps.Map("map", {
    //         // The map center coordinates.
    //         // Default order: “latitude, longitude”.
    //         // To not manually determine the map center coordinates,
    //         // use the Coordinate detection tool.
    //         center: [lat,lon],
    //         // Zoom level. Acceptable values:
    //         // from 0 (the entire world) to 19.
    //         zoom: 7
    //     });
        

    // }  
    
    //MAP/////////
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [lat, lon],
                zoom: 9
            }, {
                searchControlProvider: 'yandex#search'
            }),
    
            // Creating a content layout.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),
    
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'A custom placemark icon',
                balloonContent: 'This is a pretty placemark'
            }, {
                /**
                 * Options.
                 * You must specify this type of layout.
                 */
                iconLayout: 'default#image',
                // Custom image for the placemark icon.
                iconImageHref: 'images/myIcon.gif',
                // The size of the placemark.
                iconImageSize: [30, 42],
                /**
                 * The offset of the upper left corner of the icon relative
                 * to its "tail" (the anchor point).
                 */
                iconImageOffset: [-5, -38]

            }),
    
            myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
                hintContent: 'A custom placemark icon with contents',
                balloonContent: 'This one — for Christmas',
                iconContent: '12'
            }, {
                /**
                 * Options.
                 * You must specify this type of layout.
                 */
                iconLayout: 'default#imageWithContent',
                // Custom image for the placemark icon.
                iconImageHref: 'images/ball.png',
                // The size of the placemark.
                iconImageSize: [48, 48],
                /**
                 * The offset of the upper left corner of the icon relative
                 * to its "tail" (the anchor point).
                 */
                iconImageOffset: [-24, -24],
                // Offset of the layer with content relative to the layer with the image.
                iconContentOffset: [15, 15],
                // Content layout.
                iconContentLayout: MyIconContentLayout
            });
    
        myMap.geoObjects
            .add(myPlacemark)
            .add(myPlacemarkWithContent);
    });   
}; 

const showError = (err) => {
    weather.innerHTML = `<div class="error"><b>ERROR!! CITY NOT FOUND<b></div>`;
    if(city.length === 0 ){
    weather.innerHTML = `<div class="error"><b>Please Enter A City<b></div>`;

    }
}

const myfunc = () => {
    document.querySelector('.tempF').style.display = 'none';
    document.querySelector('.tempC').style.display = 'block';
    
};

const myFunc = () => {
    document.querySelector('.tempC').style.display = 'none';
    document.querySelector('.tempF').style.display = 'block';
    
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
    document.querySelector('#image').style.display = 'none';
    document.querySelector('#map').style.display = 'block';
    document.querySelector('.home').style.display = 'inline';

    
    //update UI with new city
    updateCity(city)
        //.then(data => console.log(data))
        .then(data => updateUI(data))
        .catch(err => showError(err.message))
    //window.open('weather.html');
    document.getElementById("map").style.height = "250px";
    document.getElementById("map").style.width = "100%";


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

const timeZone = (secs) => {
    return +(secs/3600);
}

//console.log(timeZone(3600));

   