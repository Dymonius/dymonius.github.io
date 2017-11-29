window.onload = function () {
    var deadline = Date.parse(new Date()) + 169650000; // 169650000ms = 1 day 23 hour 7 minutes 30 seconds
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
            var s = ['секунд', 'секунда', 'секунды'];
            var m = ['минут', 'минута', 'минуты'];
            var h = ['часов', 'час', 'часа'];
            var d = ['дней', 'день', 'дня'];

            function endings(x, variants) {
                x0 = x % 10;
                var res;

                if (x >= 5 && x <= 20) {
                    res = variants[0];
                }
                else if (x0 === 1) {
                    res = variants[1];
                }
                else if (x0 >= 2 && x0 <= 4) {
                    res = variants[2];
                }
                else {
                    res = variants[0];
                }
                return res;
            }

            secondsSignature.innerHTML = endings(t.seconds, s);
            minutesSignature.innerHTML = endings(t.minutes, m);
            hoursSignature.innerHTML = endings(t.hours, h);
            daysSignature.innerHTML = endings(t.days, d);


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
