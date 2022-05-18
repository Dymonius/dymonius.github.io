window.onload = function () {
    const cards = document.querySelector('.cards');
    const searchButton = document.querySelector('.search__input');
    const filterButton = document.querySelector('.filter__header');
    const filterList = document.querySelector('.filter__list');
    const filterItems = document.querySelectorAll('.filter__item');
    const themeButton = document.querySelector('.mode');
    const link = document.getElementById('theme-link');

    fetch(`https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags`)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            createList(data);
            searchButton.addEventListener('input', function (e) {
                let sortedData = data.filter(function (number) {
                    if (number.name.common.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0) {
                        return true
                    }
                });
                createList(sortedData);
            });
            filterButton.addEventListener('click', function () {
                filterList.classList.toggle('filter__list--display-none');
            });

            filterItems.forEach(function (item) {
                item.addEventListener('click', function (e) {
                    let sortedData = data.filter(function (number) {
                        return number.region === e.target.innerText;
                    });
                    filterList.classList.toggle('filter__list--display-none');
                    createList(sortedData);
                });
            });
        })
        .catch(function (error) {
            console.log(error.message);
        });
    themeButton.addEventListener("click", function () {
        changeTheme();
    });

    function createList(data) {
        cards.innerHTML = '';
        for (let key in data) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${data[key].flags.svg}" alt="" class="card__flag">
                <div class="card__country">${data[key].name.common}</div>
                <div class="card__population">Population: ${Intl.NumberFormat('en-US').format(data[key].population)}</div>
                <div class="card__region">Region: ${data[key].region}</div>
                <div class="card__capital">Capital: ${data[key].capital[0]}</div>
            `;
            cards.append(card);
        }
    }

    function changeTheme() {
        const lightTheme = "light.css";
        const darkTheme = "dark.css";
        let currTheme = link.getAttribute("href");
        let theme = "";

        if (currTheme === lightTheme) {
            currTheme = darkTheme;
            theme = "dark";
        } else {
            currTheme = lightTheme;
            theme = "light";
        }
        link.setAttribute("href", currTheme);
    }
};

