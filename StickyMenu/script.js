var stickElement = document.querySelector(".menu");
var fixed = false;
var fixPoint = stickElement.offsetTop;


window.onscroll = function () {
    var distance = stickElement.offsetTop - window.pageYOffset;
    var offset = window.pageYOffset; //Получение текущей прокрутки сверху
    if ((distance <= 0) && !fixed) {
        stickElement.style.position = 'fixed';
        stickElement.style.top = '0px';
        stickElement.style.left = '0px';

        fixed = true;
    } else if (fixed && (offset <= fixPoint)) {
        stickElement.style.position = 'static';
        fixed = false;
    }
};