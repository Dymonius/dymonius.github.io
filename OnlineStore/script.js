window.onload = function () {
    const productList = [
        {
            id: 1,
            quantity: 0,
            name: 'Armchair Olsberg',
            company: 'Ikea',
            price: 7999,
            image: 'img/card-img/armchair-olsberg.jpg',
            filtered: true,
        },
        {
            id: 2,
            quantity: 0,
            name: 'Armchair The Elemental',
            company: 'Marcos',
            price: 999,
            image: 'img/card-img/armchair-the-elemental.jpg',
            filtered: true,
        },
        {
            id: 3,
            quantity: 0,
            name: 'Armchair Victory',
            company: 'Caressa',
            price: 5999,
            image: 'img/card-img/armchair-victory.jpg',
            filtered: true,
        },
        {
            id: 4,
            quantity: 0,
            name: 'Bed Crown',
            company: 'Liddy',
            price: 2999,
            image: 'img/card-img/bed-crown.jpg',
            filtered: true,
        },
        {
            id: 5,
            quantity: 0,
            name: 'Bookshelf Hamlyn',
            company: 'Ikea',
            price: 1999,
            image: 'img/card-img/bookshelf-hamlyn.jpg',
            filtered: true,
        },
        {
            id: 6,
            quantity: 0,
            name: 'Sofa Avondale',
            company: 'Marcos',
            price: 3999,
            image: 'img/card-img/sofa-avondale.jpg',
            filtered: true,
        },
        {
            id: 7,
            quantity: 0,
            name: 'Sofa Grand',
            company: 'Caressa',
            price: 6999,
            image: 'img/card-img/sofa-grand.jpg',
            filtered: true,
        },
        {
            id: 8,
            quantity: 0,
            name: 'Table Adela',
            company: 'Liddy',
            price: 2799,
            image: 'img/card-img/table-adela.jpg',
            filtered: true,
        },
        {
            id: 9,
            quantity: 0,
            name: 'Table Forino',
            company: 'Ikea',
            price: 6699,
            image: 'img/card-img/table-forino.jpg',
            filtered: true,
        },
        {
            id: 10,
            quantity: 0,
            name: 'Table Realyn',
            company: 'Marcos',
            price: 2299,
            image: 'img/card-img/table-realyn.jpg',
            filtered: true,
        },

    ];

    let data = !localStorage.data ? productList : JSON.parse(localStorage.getItem('data'));
    const menuButton = document.querySelector('.header__menu-button');
    const cartButton = document.querySelector('.header__cart-logo');
    const cart = document.querySelector('.cart-wrapper');
    const cartCloseButton = document.querySelector('.card__cross');

    cartButton.addEventListener('click', function () {
        cart.classList.toggle('cart-wrapper--show');
    });
    cartCloseButton.addEventListener('click', function () {
        cart.classList.toggle('cart-wrapper--show');
    });
    menuButton.addEventListener('click', function () {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('menu--show');
    });


    if (document.querySelector('.search')) {
        const searchInput = document.querySelector('.search');
        const rangeInput = document.querySelector('.price__range');
        const companies = document.querySelectorAll('.companies__item');

        for (let company of companies) {
            company.addEventListener('click', function (e) {
                for (let key in data) {
                    if (company.innerHTML === 'All') {
                        data[key].filtered = true;
                    } else if (data[key].company === company.innerHTML) {
                        data[key].filtered = true;
                    } else {
                        data[key].filtered = false;
                    }
                }
                createCardsList();
            })
        }

        rangeInput.addEventListener('input', function () {
            const priceValue = document.querySelector('.price__value');
            priceValue.innerHTML = `Value: $${rangeInput.value}`;
            for (let key in data) {
                if (data[key].price / 100 <= rangeInput.value) {
                    data[key].filtered = true;
                } else {
                    data[key].filtered = false;
                }
            }
            createCardsList();
        });

        searchInput.addEventListener('input', function (e) {
            for (let key in data) {
                if (data[key].name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
                    data[key].filtered = true;
                } else {
                    data[key].filtered = false;
                }
            }
            createCardsList();
        });
    }

    resetFilters();
    updateProductCounter();
    createCardsList();
    createCartCardsList();
    updateTotalSum();
    updateLocalStorage();

    function updateLocalStorage() {
        localStorage.setItem('data', JSON.stringify(data));
    }

    function resetFilters() {
        for (let key in data) {
            data[key].filtered = true;
        }
    }

    function updateProductCounter() {
        const productCounter = document.querySelector('.header__cart-counter');
        let totalQuantity = 0;
        for (let key in data) {
            totalQuantity += data[key].quantity;
        }
        productCounter.innerHTML = totalQuantity;
    }

    function createCardsList() {
        const cardsList = document.querySelector('.cards');
        if (cardsList) {
            cardsList.innerHTML = '';
            for (let key in data) {
                if (data[key].filtered) {
                    const card = document.createElement('article');
                    card.className = 'card';
                    card.innerHTML = `
                        <div class="card__image-wrapper">
                            <img src="${data[key].image}" alt="" class="card__image">
                            <img src="img/cart-white.svg" alt="" class="card__icon">
                        </div>
                        <h4 class="card__text">${data[key].name}</h4>
                        <h4 class="card__price">$${data[key].price / 100}</h4>
                    `;
                    const cardButton = card.querySelector('.card__icon');
                    cardButton.addEventListener('click', function () {
                        data[key].quantity++;
                        createCartCardsList(data);
                        updateProductCounter();
                        updateTotalSum();
                        updateLocalStorage();
                    });

                    cardsList.append(card);
                    if (document.querySelector('.hero') && key > 1) {
                        break;
                    }
                }
            }
        }
    }


    function createCartCardsList() {
        const cartCardsList = document.querySelector('.cart__cards');
        cartCardsList.innerHTML = '';
        for (let key in data) {
            if (data[key].quantity > 0) {
                const card = document.createElement('div');
                card.className = 'cart-card';
                card.innerHTML = `
                    <img src="${data[key].image}" alt="" class="cart-card__img">
                    <div class="cart-card__info">
                        <div class="cart-card__header">${data[key].name}</div>
                        <div class="cart-card__price">$${data[key].price / 100}</div>
                        <div class="cart-card__remove">remove</div>
                    </div>
                    <div class="cart-card__amount">
                        <div class="cart-card__up-arrow">&#708</div>
                        <div class="cart-card__quantity">${data[key].quantity}</div>
                        <div class="cart-card__down-arrow">&#709</div>
                    </div>
                 `;
                const upButton = card.querySelector('.cart-card__up-arrow');
                upButton.addEventListener('click', function () {
                    data[key].quantity++;
                    createCartCardsList();
                    updateProductCounter();
                    updateTotalSum();
                    updateLocalStorage();
                });
                const downButton = card.querySelector('.cart-card__down-arrow');
                downButton.addEventListener('click', function () {
                    data[key].quantity--;
                    createCartCardsList();
                    updateProductCounter();
                    updateTotalSum();
                    updateLocalStorage();
                });
                const removeButton = card.querySelector('.cart-card__remove');
                removeButton.addEventListener('click', function () {
                    data[key].quantity = 0;
                    createCartCardsList();
                    updateProductCounter();
                    updateTotalSum();
                    updateLocalStorage();
                });
                cartCardsList.append(card);
            }
        }
    }


    function updateTotalSum() {
        const totalSum = document.querySelector('.cart__total');
        let sum = 0;
        for (let key in data) {
            sum += data[key].price * data[key].quantity / 100;
        }
        totalSum.innerHTML = 'Total : $' + sum.toFixed(2);
    }
};

