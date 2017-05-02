var APPID = "e811e8dc2f6fb8f67afbc8fdfeec947a";
var temp;
var loc;
var icon;
var cityinput;
var cityform;
var arrow;

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
    console.log(weather.temp);
    var angle = 0;
    if (weather.temp < 2.5) {
        angle = 4;
    } else if (weather.temp < 5) {
        angle = 12.5;
    } else if (weather.temp < 7.5) {
        angle = 21.5;
    } else if (weather.temp < 10) {
        angle = 30.5;
    } else if (weather.temp < 12.5) {
        angle = 39.5;
    } else if (weather.temp < 15) {
        angle = 48.5;
    } else if (weather.temp < 17.5) {
        angle = 57.5;
    } else if (weather.temp < 20) {
        angle = 66.5;
    } else if (weather.temp < 22.5) {
        angle = 76.5;
    } else if (weather.temp < 25) {
        angle = 85.5;
    } else if (weather.temp < 27.5) {
        angle = 95;
    } else if (weather.temp < 30) {
        angle = 104;
    } else if (weather.temp < 32.5) {
        angle = 113.5;
    } else if (weather.temp < 35) {
        angle = 122.5;
    } else if (weather.temp < 37.5) {
        angle = 131.5;
    } else if (weather.temp < 40) {
        angle = 140.5;
    } else if (weather.temp < 42.5) {
        angle = 149.5;
    } else if (weather.temp < 45) {
        angle = 158.5;
    } else if (weather.temp < 47.5) {
        angle = 167.5;
    } else {
        angle = 176.5;
    }
    console.log(arrow);
    arrow.setAttribute("style", "transform: rotate("+angle+"deg);");
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
    arrow = document.getElementById("arrow");
    
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