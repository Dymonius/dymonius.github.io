var stickElement = document.querySelector(".menu");
var stuck = false;
var stickPoint = stickElement.offsetTop;

window.onscroll = function (e) {
    var distance = stickElement.offsetTop - window.pageYOffset;
    var offset = window.pageYOffset; //Получение текущей прокрутки сверху
    if ((distance <= 0) && !stuck) {
        stickElement.style.position = 'fixed';
        stickElement.style.top = '0px';
        stickElement.style.top = '0px';

        stuck = true;
    } else if (stuck && (offset <= stickPoint)) {
        stickElement.style.position = 'static';
        stuck = false;
    }
}