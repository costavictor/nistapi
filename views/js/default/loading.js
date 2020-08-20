$body = $("body");
$form = $("form");

let seconds = 0, minutes = 0, hours = 0, t, time = "";

$(document).on({
    ajaxStart: function () {
        timer();      
        console.log("Start loading");
    },
    ajaxStop: function () {
        clearTimeout(t);
        console.log(time);
        clear();
        console.log("End loading");
    }
});

function StartLoading() {
    console.log("start animation");
    $body.addClass("loading");
    $form.addClass("hide");
}

function FinishLoading() {
    $body.removeClass("loading");
    $form.removeClass('hide');
    console.log('remove animation');
}

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    time = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

/* Clear button */
function clear() {
    time = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}