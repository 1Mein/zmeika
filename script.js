let l = 4, t = 4;
let going = 'l'; //b-bottom, t-top
let forcont = true;
let score=0;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let x = getRandomInt(10), y = getRandomInt(10); //point pos
function changepos() {
    if (!forcont) return;
    document.querySelector(".head").style.margin = (t * 50 + "px 0 0 " + l * 50 + "px");

    document.addEventListener('keyup', function (event) {
        if (event.code == 'KeyW' && going != 'b') {
            going = 't';
        }
        else if (event.code == 'KeyS' && going != 't') {
            going = 'b';
        }
        else if (event.code == 'KeyA' && going != 'r') {
            going = 'l';
        }
        else if (event.code == 'KeyD' && going != 'l') {
            going = 'r';
        }
    });
    switch (going) {
        case 'r': l++; break;
        case 't': t--; break;
        case 'b': t++; break;
        case 'l': l--; break;
    }
    if(t==y && l==x){
        x = getRandomInt(10);
        y = getRandomInt(10);
        document.querySelector(".score").innerHTML = ++score;
    }
    if (l >= 10 || t >= 10 || l < 0 || t < 0) {
        forcont = false;
        document.querySelector(".lose").style.display="block";
        return;
    }
    document.querySelector(".index").innerHTML = t + " " + l;
    document.querySelector(".point").style.margin = (y * 50 + "px 0 0 " + x * 50 + "px");
}
changepos();
let interval = setInterval(changepos, 500);

function again(){
    document.querySelector(".lose").style.display="none";
    forcont = true;
    l = 4;
    t = 4;
    going = 'r';
    score=0;
    document.querySelector(".score").innerHTML = score;
    x = getRandomInt(10);
    y = getRandomInt(10);
}