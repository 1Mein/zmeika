const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "jasom",
    password: "2156513",
});

connection.connect((error) => {
    if (error) {
        console.log('Error connecting to the MySQL Database');
        return;
    }
    console.log('Connection established sucessfully');
});
connection.end((error) => {
});

let box = document.querySelector(".mainbox");
let forbox = box.getContext("2d");
let snakecontext = document.querySelector(".snake").getContext("2d");
let reversedcurrentdirection = "left"
let forcont = false;
let directionchanged = false;
let pointeated = false, bodyadded = false;
let score = 0;
let timer = 500;
document.querySelector(".interval").innerHTML = timer;
var snake = [
    {
        "x": 5,
        "y": 5,
        "direction": "right"
    }
]
var point = {
    "x": -1,
    "y": -1
}

// for (let i = 0; i < 12; i++) {
//     for (let j = 0; j < 12; j++) {
//         forbox.strokeRect(i * 50, j * 50, 50, 50)
//     }
// }

let k = 0;
let headloaded = false, bodyloaded = false;

//galery - https://postimg.cc/gallery/xL9jLCX
const headup = new Image(); headup.src = "https://i.postimg.cc/3wc251Ny/headup.png";
const headdown = new Image(); headdown.src = "https://i.postimg.cc/Z5jrj4hx/headdown.png";
const headright = new Image(); headright.src = "https://i.postimg.cc/GhFP8v7N/headright.png";
const headleft = new Image(); headleft.src = "https://i.postimg.cc/MTg0R58k/headleft.png";
const bodyy = new Image(); bodyy.src = "https://i.postimg.cc/R0FwDyS5/bodyy.png";
const bodyx = new Image(); bodyx.src = "https://i.postimg.cc/9QcdGzsf/bodyx.png";
const bodyangledownleft = new Image(); bodyangledownleft.src = "https://i.postimg.cc/cHvMrj2M/bodyangledownleft.png";
const bodyangledownright = new Image(); bodyangledownright.src = "https://i.postimg.cc/J7B58fbR/bodyangledownright.png";
const bodyangleleftup = new Image(); bodyangleleftup.src = "https://i.postimg.cc/vT9rvnQ4/bodyangleleftup.png";
const bodyangleupright = new Image(); bodyangleupright.src = "https://i.postimg.cc/VLQBkKRn/bodyangleupright.png";
const pointimg = new Image(); pointimg.src = "https://i.postimg.cc/k5Tf8KhK/point.png";
const whichhead = new Image();
var loadedCount = 0;
var onload = function () {
    loadedCount++;
    checkAllLoaded(loadedCount);
}
function checkAllLoaded(loadedCount) {
    if (loadedCount > 0) {
        document.querySelector(".btn1").style.display = "block";
    }
}
// headup.onload = () => {
//     document.querySelector(".btn1").style.display = "block";
// }
let tempx = 0, tempy = 0;



function drawhead(head) {
    snakecontext.drawImage(head, snake[0]["x"] * 50, snake[0]["y"] * 50);
}

function printpoint() {
    min = 0;
    max = 11;
    snakecontext.clearRect(snake[0]["x"] * 50, snake[0]["y"] * 50, 50, 50);
    let iferror = false;
    let temp = true;
    while (temp || iferror) {
        iferror = false;
        for (let i = 0; i < snake.length; i++) {
            if ((point["x"] == snake[i]["x"] && point["y"] == snake[i]["y"]) || point["x"] == -1) {
                point["x"] = Math.floor(Math.random() * (max - min + 1) + min);
                point["y"] = Math.floor(Math.random() * (max - min + 1) + min);
                iferror = true;
                break;
            }
        }
        temp = iferror;
    }

    snakecontext.drawImage(pointimg, point["x"] * 50, point["y"] * 50);
    // The maximum is inclusive and the minimum is inclusive
}

function checker() {
    if (snake[0]["x"] == point["x"] && snake[0]["y"] == point["y"]) {
        snake.push({
            "x": snake[snake.length - 1]["x"],
            "y": snake[snake.length - 1]["y"],
            "direction": snake[snake.length - 1]["direction"]
        })
        pointeated = true;
        bodyadded = true;
        document.querySelector(".score").innerHTML = ++score;
        printpoint();
    }
    else {
        for (let i = 1; i < snake.length; i++) {
            if (snake[0]["x"] == snake[i]["x"] && snake[0]["y"] == snake[i]["y"]) {
                forcont = true;
                return;
            }
        }
    }
}

function setreverseddirection() {
    if (snake[0]["direction"] == "up") {
        reversedcurrentdirection = "down";
    }
    else if (snake[0]["direction"] == "down") {
        reversedcurrentdirection = "up";
    }
    else if (snake[0]["direction"] == "left") {
        reversedcurrentdirection = "right";
    }
    else if (snake[0]["direction"] == "right") {
        reversedcurrentdirection = "left";
    }
}

function drawbody() {
    for (let i = 1; i < snake.length - pointeated; i++) {
        if (snake[i]["direction"] == "leftup" || snake[i]["direction"] == "downright") {
            snakecontext.drawImage(bodyangleupright, snake[i]["x"] * 50, snake[i]["y"] * 50);
        }
        else if (snake[i]["direction"] == "leftdown" || snake[i]["direction"] == "upright") {
            snakecontext.drawImage(bodyangledownright, snake[i]["x"] * 50, snake[i]["y"] * 50);
        }
        else if (snake[i]["direction"] == "upleft" || snake[i]["direction"] == "rightdown") {
            snakecontext.drawImage(bodyangledownleft, snake[i]["x"] * 50, snake[i]["y"] * 50);
        }
        else if (snake[i]["direction"] == "rightup" || snake[i]["direction"] == "downleft") {
            snakecontext.drawImage(bodyangleleftup, snake[i]["x"] * 50, snake[i]["y"] * 50);
        }
        else if (snake[i]["direction"] == "left" || snake[i]["direction"] == "right") {
            snakecontext.drawImage(bodyx, snake[i]["x"] * 50, snake[i]["y"] * 50);
        }
        else {
            snakecontext.drawImage(bodyy, snake[i]["x"] * 50, snake[i]["y"] * 50);
        }
    }
    pointeated = false;
}

function changepositionsbody() {

    for (let i = snake.length - 1; i > 0; i--) {
        // if (pointeated) {
        //     pointeated = false;
        //     continue;
        // }
        snake[i]["x"] = snake[i - 1]["x"];
        snake[i]["y"] = snake[i - 1]["y"];
        if (snake[i]["direction"] == "left" && (snake[i - 1]["direction"] == "up" || snake[i - 1]["direction"] == "down")) {
            switch (snake[i - 1]["direction"]) {
                case "up": snake[i]["direction"] = "leftup"; break;//
                case "down": snake[i]["direction"] = "leftdown"; break;//
            }
        }
        else if (snake[i]["direction"] == "up" && (snake[i - 1]["direction"] == "left" || snake[i - 1]["direction"] == "right")) {
            switch (snake[i - 1]["direction"]) {
                case "left": snake[i]["direction"] = "upleft"; break;//
                case "right": snake[i]["direction"] = "upright"; break;//
            }
        }
        else if (snake[i]["direction"] == "right" && (snake[i - 1]["direction"] == "up" || snake[i - 1]["direction"] == "down")) {
            switch (snake[i - 1]["direction"]) {
                case "up": snake[i]["direction"] = "rightup"; break;//
                case "down": snake[i]["direction"] = "rightdown"; break;//
            }
        }
        else if (snake[i]["direction"] == "down" && (snake[i - 1]["direction"] == "left" || snake[i - 1]["direction"] == "right")) {
            switch (snake[i - 1]["direction"]) {
                case "left": snake[i]["direction"] = "downleft"; break; //
                case "right": snake[i]["direction"] = "downright"; break; /////////////////////
            }
        }
        else if ((snake[i]["direction"] == "leftup" || snake[i]["direction"] == "rightup") && (snake[i - 1]["direction"] == "left" || snake[i - 1]["direction"] == "right")) {
            if (snake[i - 1]["direction"] == "right") {
                snake[i]["direction"] = "upright";
            }
            else if (snake[i - 1]["direction"] == "left") {
                snake[i]["direction"] = "upleft";
            }
        }
        else if ((snake[i]["direction"] == "leftdown" || snake[i]["direction"] == "rightdown") && (snake[i - 1]["direction"] == "left" || snake[i - 1]["direction"] == "right")) {
            if (snake[i - 1]["direction"] == "right") {
                snake[i]["direction"] = "downright";
            }
            else if (snake[i - 1]["direction"] == "left") {
                snake[i]["direction"] = "downleft";
            }
        }
        else if ((snake[i]["direction"] == "upleft" || snake[i]["direction"] == "downleft") && (snake[i - 1]["direction"] == "up" || snake[i - 1]["direction"] == "down")) {
            if (snake[i - 1]["direction"] == "up") {
                snake[i]["direction"] = "leftup";
            }
            else if (snake[i - 1]["direction"] == "down") {
                snake[i]["direction"] = "leftdown";
            }
        }
        else if ((snake[i]["direction"] == "upright" || snake[i]["direction"] == "downright") && (snake[i - 1]["direction"] == "up" || snake[i - 1]["direction"] == "down")) {
            if (snake[i - 1]["direction"] == "up") {
                snake[i]["direction"] = "rightup";
            }
            else if (snake[i - 1]["direction"] == "down") {
                snake[i]["direction"] = "rightdown";
            }
        }
        else {
            snake[i]["direction"] = snake[i - 1]["direction"];
        }
    }
}

//main
function draw() {
    if (forcont) {
        document.querySelector(".win-text").innerHTML = "Lose<br>Your Score is<br>" + score;
        document.querySelector(".win").style.display = "block";
        clearInterval(interval);
    }

    //control
    setreverseddirection();
    document.addEventListener('keyup', function (event) {
        if (event.code == 'KeyW' && reversedcurrentdirection != 'up') {
            snake[0]["direction"] = 'up';
        }
        else if (event.code == 'KeyS' && reversedcurrentdirection != 'down') {
            snake[0]["direction"] = 'down';
        }
        else if (event.code == 'KeyA' && reversedcurrentdirection != 'left') {
            snake[0]["direction"] = 'left';
        }
        else if (event.code == 'KeyD' && reversedcurrentdirection != 'right') {
            snake[0]["direction"] = 'right';
        }
    });


    // clearall() changepos(checker(addbody())) output()
    for (let i = 0; i < snake.length; i++) {
        snakecontext.clearRect(snake[i]["x"] * 50, snake[i]["y"] * 50, 50, 50);
    }


    changepositionsbody();
    if (snake[0]["direction"] == "up") {
        snake[0]["y"]--;
        checker();
        if (snake[0]["y"] < 0) {
            forcont = true;
        }
        whichhead.src = headup.src;
    }
    else if (snake[0]["direction"] == "down") {
        snake[0]["y"]++;
        checker();
        if (snake[0]["y"] > 11) {
            forcont = true;
        }
        whichhead.src = headdown.src;
    }
    else if (snake[0]["direction"] == "left") {
        snake[0]["x"]--;
        checker();
        if (snake[0]["x"] < 0) {
            forcont = true;
        }
        whichhead.src = headleft.src;
    }
    else if (snake[0]["direction"] == "right") {
        snake[0]["x"]++;
        checker();
        if (snake[0]["x"] > 11) {
            forcont = true;
        }
        whichhead.src = headright.src;
    }
    if (forcont) {
        document.querySelector(".win-text").innerHTML = "Lose<br>Your Score is<br>" + score;
        document.querySelector(".win").style.display = "block";
        if (+document.querySelector(".record").innerHTML < score) {
            document.querySelector(".record").innerHTML = score;
        }
        clearInterval(interval);
    }
    drawhead(whichhead);
    drawbody();
}

document.querySelector(".btn1").onclick = () => {
    start();
}

function start() {
    printpoint();
    interval = setInterval(draw, timer);
}

document.querySelector(".btn2").onclick = () => {
    box = document.querySelector(".mainbox");
    forbox = box.getContext("2d");
    snakecontext = document.querySelector(".snake").getContext("2d");
    reversedcurrentdirection = "left"
    forcont = false;
    directionchanged = false;
    pointeated = false, bodyadded = false;
    score = 0;
    snakecontext.clearRect(0, 0, 600, 600);
    snake = [
        {
            "x": 5,
            "y": 5,
            "direction": "right"
        }
    ]
    snakecontext.clearRect(point["x"] * 50, point["y"] * 50, 50, 50);
    point = {
        "x": -1,
        "y": -1
    }
    document.querySelector(".win").style.display = "none";
    document.querySelector(".score").innerHTML = score;
    start();
}

document.querySelector(".btn3").onclick = () => {
    let setter = +document.querySelector(".timer").value;
    timer = setter;
    document.querySelector(".interval").innerHTML = timer;
    document.querySelector(".timer").value = "";
}