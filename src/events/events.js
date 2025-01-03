const { spawn } = require('child_process');

const cities = [ // Desired result here is all cities in the world, maybe will be taken from some database.
    {
        'id': 1,
        'name': 'Челябинск',
        'country': 'RU',
    },
    {
        'id': 2,
        'name': 'San Francisco',
        'country': 'US',
    },
    {
        'id': 3,
        'name': 'Berlin',
        'country': 'GR',
    },
    {
        'id': 4,
        'name': 'Чебоксары',
        'country': 'RU',
    }, 
    {
        'id': 5,
        'name': 'Москва',
        'country': 'RU',
    },
    {
        'id': 6,
        'name': 'Bishkek',
        'country': 'KG',
    }
]

function findCity(event) {  
    const cityList = document.getElementById('city-list')
    cityList.innerHTML = '' // Must be zeroed, else will display cities twice
    const partialCityName = document.getElementById('city-name').value;
    const filtered = cities.filter((city) => city.name.includes(partialCityName))
    document.getElementById('city-list').style.display = 'block';
    for (let i = 0; i < filtered.length; ++i) {
        let city = filtered[i];
        const cityElem = document.createElement('div');
        cityElem.setAttribute('class', "city-list__city")
        cityElem.setAttribute('onclick', "putCityNameInInput(event)")
        cityElem.setAttribute('data-cityName', city.name)
        cityElem.innerText = city.name + ', ' + city.country
        cityList.append(cityElem);
    }
}

function putCityNameInInput(event) {
    const cityElem = event.target.closest("[data-cityName]");
    document.getElementById('city-name').value = cityElem.getAttribute('data-cityName');
    document.getElementById('city-list').innerHTML = ''
    document.getElementById('city-list').display = 'none';
}

function fetchWeatherData(event) {
    event.preventDefault();
    const cityName = document.getElementById('city-name').value;
    let proc;
    if (process.platform === 'win32') {
        proc = spawn('py', [__dirname + '/buisnesslogic/weather.py', cityName])
    } else {
        proc = spawn('python3', [__dirname + '/buisnesslogic/weather.py', cityName])
    }
    proc.stdout.on('data', (data) => {
        console.log(JSON.parse(data.toString("utf8")));
    })
    proc.on('close', (code) => {
        console.log("Exited with status code: ", code)
    })
    proc.stderr.on('data', (data) => {
        console.error(data)
    })
}
