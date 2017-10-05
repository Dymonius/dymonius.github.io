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

        var secondsSignature = document.querySelector('.seconds-signature');
        var minutesSignature = document.querySelector('.minutes-signature');
        var hoursSignature = document.querySelector('.hours-signature');
        var daysSignature = document.querySelector('.day-signature');

        function updateClock() {
            var t = getTimeRemaining(endtime);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.seconds - Math.floor(t.seconds/10)*10 === 1) secondsSignature.innerHTML = 'СЕКУНДА';
            else if (t.seconds - Math.floor(t.seconds/10)*10 === 2) secondsSignature.innerHTML = 'СЕКУНДЫ';
            else if (t.seconds - Math.floor(t.seconds/10)*10 === 3) secondsSignature.innerHTML = 'СЕКУНДЫ';
            else if (t.seconds - Math.floor(t.seconds/10)*10 === 4) secondsSignature.innerHTML = 'СЕКУНДЫ';
            else secondsSignature.innerHTML = 'СЕКУНД';

            if (t.minutes - Math.floor(t.minutes/10)*10 === 1) minutesSignature.innerHTML = 'МИНУТА';
            else if (t.minutes - Math.floor(t.minutes/10)*10 === 2) minutesSignature.innerHTML = 'МИНУТЫ';
            else if (t.minutes - Math.floor(t.minutes/10)*10 === 3) minutesSignature.innerHTML = 'МИНУТЫ';
            else if (t.minutes - Math.floor(t.minutes/10)*10 === 4) minutesSignature.innerHTML = 'МИНУТЫ';
            else minutesSignature.innerHTML = 'МИНУТ';

            if (t.hours - Math.floor(t.hours/10)*10 === 1) hoursSignature.innerHTML = 'ЧАС';
            else if (t.hours - Math.floor(t.hours/10)*10 === 2) hoursSignature.innerHTML = 'ЧАСА';
            else if (t.hours - Math.floor(t.hours/10)*10 === 3) hoursSignature.innerHTML = 'ЧАСА';
            else if (t.hours - Math.floor(t.hours/10)*10 === 4) hoursSignature.innerHTML = 'ЧАСА';
            else hoursSignature.innerHTML = 'ЧАСОВ';

            if (t.days - Math.floor(t.days/10)*10 === 1) daysSignature.innerHTML = 'ДЕНЬ';
            else if (t.days - Math.floor(t.days/10)*10 === 2) daysSignature.innerHTML = 'ДНЯ';
            else if (t.days - Math.floor(t.days/10)*10 === 3) daysSignature.innerHTML = 'ДНЯ';
            else if (t.days - Math.floor(t.days/10)*10 === 4) daysSignature.innerHTML = 'ДНЯ';
            else daysSignature.innerHTML = 'ДНЕЙ';



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
