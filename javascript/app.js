var APPID = "e811e8dc2f6fb8f67afbc8fdfeec947a";
var temp;
var loc;
var icon;
var cityinput;
var cityform;

function updateByLocation(location) {
    console.log(location);
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" +
        APPID; //+ "&units=metric";
    sendRequest(url);
}

function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            console.log(data);
            var weather = {};
            weather.icon = data.weather[0].id;
            weather.temp = K2C (data.main.temp);
            weather.loc = data.name;
            update(weather);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function update(weather) {
    temp.innerHTML = weather.temp;
//    loc.innerHTML = weather.loc;
    icon.src = "images/" + weather.icon + ".svg";
}

function K2C (k) {
    return Math.round(k - 273.15);
}

window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    cityinput = document.getElementById("cityinput");
    cityform = document.getElementById("cityform");
    
    cityinput.addEventListener("change", function () {
        cityinput = document.getElementById("cityinput");
        updateByLocation(cityinput.value);
    }, false);
    
    cityform.addEventListener("submit", function (e) {
        e.preventDefault();
        cityinput = document.getElementById("cityinput");
        updateByLocation(cityinput.value);
    }, false);
    
    updateByLocation(cityinput.value);
};