//references to html
const parentTag = document.querySelector('#weatherCard')


//defaul zipcode
let zip = localStorage.getItem('myZipCode')
if (zip == null) {
    let defaultZip = "84003"
    localStorage.setItem('myZipCode', defaultZip)
    zip = defaultZip
}


//setting api
const myKey = "8f4974fce85f2bd05bc862fa623b15f1"
const myPath = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${myKey}&units=imperial`
//fetch the remote json
fetch(myPath)
.then((response) => response.json())
.then((allData) => {
   // console.log(allData)
    currentWeather(allData)
})

//function that displays current weather
function currentWeather(weatherResults){
console.log(weatherResults)
console.log(weatherResults.weather[0].icon)

const myTown = document.querySelector('#town')
myTown.textContent = `Weather for ${weatherResults.name}`

//current date
const myDate = document.createElement('p')
myDate.className = "date"
const d = new Date ()
myDate.textContent = d.toDateString()
parentTag.appendChild(myDate)
//current icon

const myWeatherIcon = document.createElement('img')
myWeatherIcon.src = `https://openweathermap.org/img/wn/${weatherResults.weather[0].icon}@2x.png`
myWeatherIcon.alt = weatherResults.weather[0].description
parentTag.appendChild(myWeatherIcon)

const myCurrentTemp = document.createElement('p')
myCurrentTemp.className = "temperature"
myCurrentTemp.innerHTML = weatherResults.main.temp + "&deg;F"
parentTag.appendChild(myCurrentTemp)

const myDescription = document.createElement('p')
myDescription.className = "description"
myDescription.innerHTML = weatherResults.weather[0].description
parentTag.appendChild(myDescription)


}

//ask for a new zipcode

const theModalBox = document.querySelector('aside')
const theSettings = document.querySelector('#settings')
theSettings.addEventListener('click', () => {
    theModalBox.classList.toggle('show')
})

//set the new zip
const myButton = document.querySelector('#applyZip')
myButton.addEventListener('click', () => {

theModalBox.className = ""
let theZipCode = document.querySelector('#newZip').value 
if (theZipCode.length === 5) {

localStorage.setItem('myZipCode',theZipCode )}

window.location.reload()
})

//data validation
myInput = document.querySelector('#newZip')
myInput.addEventListener('input', () => {
myInput.value = myInput.value.slice(0, 5)
})