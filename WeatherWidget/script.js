window.onload = function () {
    const searchButton = document.querySelector('.search__button');
    const input = document.querySelector('.search__input');
    const cardHeaderWrapper = document.querySelector('.card__header-wrapper');
    const cardFooterWrapper = document.querySelector('.card__footer-wrapper');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=09e3b849122b9dc7799f740798ff38b5`)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            createHeader(data);
        })
        .catch(function (error) {
            console.log(error.message);
        })
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Kyiv&appid=09e3b849122b9dc7799f740798ff38b5`)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            createFooter(data);
        })
        .catch(function (error) {
            console.log(error.message);
        })

    searchButton.addEventListener('click', function () {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=09e3b849122b9dc7799f740798ff38b5`)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                createHeader(data);
            })
            .catch(function (error) {
                console.log(error.message);
            })
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=09e3b849122b9dc7799f740798ff38b5`)
            .then(function (resp) {
                return resp.json()
            })
            .then(function (data) {
                createFooter(data);
            })
            .catch(function (error) {
                console.log(error.message);
            })
    })

    input.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            let event = new Event('click');
            searchButton.dispatchEvent(event);
        }
    });

    function createHeader(data) {
        cardHeaderWrapper.innerHTML = '';
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card__header';
        cardHeader.innerHTML = `
                <div class="card__temperature">${Math.round(data.main.temp - 273.15)}&deg C</div>
                <div class="card__city">${data.name}, ${data.sys.country}</div>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" class="card__weather-icon">   
        `;
        cardHeaderWrapper.append(cardHeader);
    }

    function createFooter(data) {
        cardFooterWrapper.innerHTML = '';
        for (let key in data.list) {
            const cardFooter = document.createElement('div');
            cardFooter.className = 'card__footer';
            cardFooter.innerHTML = `
                    <div class="card__forecast-date">${data.list[key].dt_txt}</div>
                    <img src="http://openweathermap.org/img/wn/${data.list[key].weather[0].icon}@2x.png" alt="" class="card__forecast-weather-icon">
                    <div class="card__forecast-temperature">${Math.round(data.list[key].main.temp - 273.15)}&deg C</div>
            `;
            cardFooterWrapper.append(cardFooter);
        }
    }
};

