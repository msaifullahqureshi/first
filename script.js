const apiKey = "30f984697476967081a5f7d3bd6ca7df";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")

const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    // console.log(data);
    // console.log(response);

    if (response.status == 400) {
        document.querySelector(".errors .propername").style.display = "block"
        document.querySelector(".errors .spelling").style.display = "none"
        document.querySelector(".weather").style.display = "none"
    }
    else if (response.status == 404) {
        document.querySelector(".errors .propername").style.display = "none"
        document.querySelector(".errors .spelling").style.display = "block"
        document.querySelector(".weather").style.display = "none"

    }
    // if (data.message != "Nothing to geocode" || data.message != "city not found") {
    else {
        let data = await response.json();
        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h"

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "Images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "Images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "Images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "Images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "Images/mist.png"
        }
        else if (data.weather[0].main == "Haze") {
            weatherIcon.src = "Images/haze.png"
        }
        else if (data.weather[0].main == "Smoke") {
            weatherIcon.src = "Images/haze.png"
        }

        document.querySelector(".errors .propername").style.display = "none"
        document.querySelector(".errors .spelling").style.display = "none"
        document.querySelector(".weather").style.display = "block"

    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})
document.addEventListener("keydown", (e) => {
    if (e.code == "Enter")
        checkWeather(searchBox.value)
})