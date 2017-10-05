window.onload = function () {
    var deadline = Date.parse(new Date()) + 169650000; // 169650000ms = 1day 23 hour 7 minutes 30 seconds
    function getTimeRemaining(endtime) {
        var t = endtime - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(endtime) {
        var days = document.querySelector('.days-counter');
        var hours = document.querySelector('.hours-counter');
        var minutes = document.querySelector('.minutes-counter');
        var seconds = document.querySelector('.seconds-counter');

        function updateClock() {
            var t = getTimeRemaining(endtime);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = '0';
                hours.innerHTML = '0';
                minutes.innerHTML = '0';
                seconds.innerHTML = '0';
            }
        }

        updateClock(); // запустить функцию один раз, чтобы избежать задержки
        var timeInterval = setInterval(updateClock, 1000);
    }

    initializeClock(deadline);

};
