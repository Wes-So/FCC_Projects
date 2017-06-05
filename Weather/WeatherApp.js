
var city = document.getElementById("city");
var country = document.getElementById("country");
var temp = document.getElementById("temp");
var metric = document.getElementById("metric");
var desc = document.getElementById("desc");
var icon = document.getElementById("icon");
var url = "http://openweathermap.org/img/w/";
var fahrenheit = 'Fahrenheit';
var celcius = 'Celcius';
var zip = 0;
var isCelcius = false;
var sample = {"coord":{"lon":-105.07,"lat":39.82},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":50.81,"pressure":1020,"humidity":40,"temp_min":46.4,"temp_max":57.2},"visibility":16093,"wind":{"speed":6.93,"deg":140},"clouds":{"all":75},"dt":1490402160,"sys":{"type":1,"id":602,"message":0.0054,"country":"US","sunrise":1490446502,"sunset":1490491066},"id":5412199,"name":"Arvada","cod":200};
var sample;
var appID = 'e30174d4b2d3a5b835b5ad9080f5fe84';
var parentUrl = 'http://api.openweathermap.org/data/2.5/weather?';
var locUrl = 'http://freegeoip.net/json/';

initialize(); 

function initialize() { 
    getLocation();
}

function getLocation() {
    ajax_get(locUrl, function(data){
        console.log(data);
        getWeather(data);
    }); 
}

function getWeather(data){
    zip = data.zip_code;
    console.log(zip);
    parentUrl = parentUrl + 'zip=' + zip + '&units=imperial&APPID=' + appID; 
    parseResponse(sample);
    // ajax_get(parentUrl, function(data) {
    //     parseResponse(data);
    // });   
}


//communicate with apis
function ajax_get(url, callback) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function parseResponse(data) {
    city.textContent = data.name;
    var sys = data.sys;
    country.textContent = sys.country;
    var main = data.main;
    temp.textContent = main.temp;
    var weather = data.weather[0];
    desc.textContent = toUpperFirstLetter(weather.description);
    icon.src = url + weather.icon + ".png"; 
    sample = data;
}


metric.addEventListener("click",  function(){  
    if(isCelcius){
        metric.innerText = fahrenheit;
        temp.textContent = sample.main.temp;
        isCelcius = false;
    } else {
        metric.innerText = celcius;
        temp.textContent = toCelcius(sample.main.temp);
        isCelcius = true;
    }

}); 

function toUpperFirstLetter(description){
    var formattedDesc = '';
    var isFirstLetter = true;
    for(i = 0; i < description.length; i++){
        if(isFirstLetter){
            formattedDesc = formattedDesc + description[i].toUpperCase();
            isFirstLetter = false;
        } else {
            formattedDesc = formattedDesc + description[i];
        }

        if(description[i] == ' ') {
            isFirstLetter = true;
        }
    }

    return formattedDesc;
} 

function toCelcius(fTemp){
    var raw = ((fTemp - 32) * 5)/9;
    return parseFloat(raw.toFixed(2));
}





 




