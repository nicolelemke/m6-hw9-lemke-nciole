// OpenWeatherMap API
var apiKey = "2fd1849b89e11b5338a0881ef5a3f34b";

var form = document.querySelector(".userinput form")
var input = document.querySelector(".userinput input")
var list = document.querySelector(".ajax .cities")
var msg = document.querySelector(".userinput .msg")




//Stop reload of page, taking search input
form.addEventListener("submit", e => {
    e.preventDefault();
    var inputVal = input.value;


//check if city

var listItems = list.querySelectorAll(".ajax .city");
var listItemsArray = Array.from(listItems);

if (listItemsArray.length > 0) {
    var filteredArray = listItemsArray.filter(el => {
        let content = "";
        if (inputVal.includes(",")) {

            if (inputVal.split(",")[1].length > 2) {
                inputVal = inputVal.split(",")[0];
                content = el
                    .querySelector(".city-name span")
                    .textContent.toLowerCase();
            } else {
                content = el.querySelector(".city-name").dataset.name.toLowerCase();
            }
        } else {
            content = el.querySelector(".city-name span").textContent.toLowerCase();
        }
        return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
        msg.textContent = `Invalid Location.`;
        form.reset();
        input.focus();
        return;
    }
}

//perform ajax request

var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=imperial&appid=${apiKey}`





fetch(url)
    .then(response => response.json())
    .then(data => {
        var { main, name, sys, weather } = data;
        var icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]
            }@2x.png`;
        var li = document.createElement("li");
        li.classList.add("city");
        var markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
                <span>${name}</span>
                <sup>${sys.country}</sup>
            </h2>
            <figure>
                <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
                <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
            <div class="city-temp"><span>Currently: ${Math.round(main.temp)}<sup>°</sup></span>F</div>
            <div class="feels-like"><span>Feels like: ${Math.round(main.feels_like)}<sup>°</sup>F</span></div>
            
        `;
        li.innerHTML = markup;
        list.appendChild(li);
    })
    .catch(() => {
        msg.textContent = "Location Not Found.";
    });

msg.textContent = "";
form.reset();
input.focus();
});

//<div class="lastupdated"><span>Last Updated: ${lastupdate.value}</span ></div>
//api.openweathermap.org/data/2.5/weather?q=London&mode=xml

//api.openweathermap.org/data/2.5/find?q=London&units=imperial

//use mode paramter for xml ot get last updated time?