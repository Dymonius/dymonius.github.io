$(document).ready(function () {
    function setLocation(curLoc){
        try {
            history.pushState(null, null, curLoc);
            return;
        } catch(e) {}
        location.hash = '#' + curLoc;
    }


    $('.counter').hide();

    $(".dropdown dt a").on('click', function () {
        $(".dropdown dd ul").slideToggle('fast');
    });


    function getSelectedValue(id) {
        return $("#" + id).find("dt a span.value").html();
    }

    $(document).bind('click', function (e) {
        var $clicked = $(e.target);
        if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
    });

    var counter = 0;

    $('.mutliSelect input[type="checkbox"]').on('click', function () {

        var title = $(this).val();

        if ($(this).is(':checked')) {
            var html = '<span title="' + title + '">' + title + ",&nbsp" + '</span>';
            $('.multiSel').append(html);
            $(".hida").hide();
            counter++;
        } else {
            $('span[title="' + title + '"]').remove();
            var ret = $(".hida");
            $('.dropdown dt a').append(ret);
            counter--;
        }
        $('.counter').html(counter);
        if(counter === 0){
            $('.counter').hide();
            $('.hida').show();
            $('.multiSel').css('marginLeft', '0px');
        }
        else {
            $('.counter').show();
            $('.multiSel').css('marginLeft', '30px')
        }
        if(counter===1) {
            setLocation(title);
        }
        else {
            setLocation('1')
        }
    });
});