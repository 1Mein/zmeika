let box = document.querySelector(".mainbox");
let forbox = box.getContext("2d");
let snakecontext = document.querySelector(".snake").getContext("2d");
let reversedcurrentdirection = "left"
let forcont = false;
let directionchanged = false;
let pointeated = false;
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

headup.onload = () => {
    document.querySelector(".btn1").style.display = "block";
}
let tempx = 0, tempy = 0;



function drawhead(head) {
    snakecontext.drawImage(head, snake[0]["x"] * 50, snake[0]["y"] * 50);
}

function printpoint() {
    min = 0;
    max = 11;
    snakecontext.clearRect(snake[0]["x"] * 50, snake[0]["y"] * 50, 50, 50);
    // point["x"] = Math.floor(Math.random() * (max - min + 1) + min);
    // point["y"] = Math.floor(Math.random() * (max - min + 1) + min);
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
            "x": tempx,
            "y": tempy,
            "direction": ""
        })
        pointeated = true;
        printpoint();
        console.log(snake);
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
    for (let i = 1; i < snake.length; i++) {
        snakecontext.drawImage(bodyx, snake[i]["x"] * 50, snake[i]["y"] * 50);
    }
}

function changepositionsbody() {
    for (let i = snake.length - 1; i > 0; i--) {
        if (pointeated) {
            pointeated = false;
            continue;
        }
        snake[i]["x"] = snake[i - 1]["x"];
        snake[i]["y"] = snake[i - 1]["y"];
        snake[i]["direction"] = snake[i - 1]["direction"];
    }
}

//main
function draw() {
    if(forcont) clearInterval(timerID);

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

    
    //clear
    //console.log(snake[0]["x"] + " " + snake[0]["y"] + " " + snake[0]["direction"]);
    snakecontext.clearRect(tempx * 50, tempy * 50, 50, 50);
    for(let i=1;i<snake.length;i++){
        snakecontext.clearRect(snake[i]["x"] * 50, snake[i]["y"] * 50, 50, 50);
    }
    changepositionsbody();

    if(pointeated){
        snakecontext.clearRect(snake[0]["x"] * 50, snake[0]["y"] * 50, 50, 50);
    }


    // snakecontext.drawImage(body, snake[0]["x"] * 50, snake[0]["y"] * 50);
    if (snake[0]["direction"] == "up") {
        snake[0]["y"]--;
        checker();
        if (snake[0]["y"] < 0) {
            forcont = true;
            return;
        }
        drawhead(headup);
    }
    else if (snake[0]["direction"] == "down") {
        snake[0]["y"]++;
        checker();
        if (snake[0]["y"] > 11) {
            forcont = true;
            return;
        }
        drawhead(headdown);
    }
    else if (snake[0]["direction"] == "left") {
        snake[0]["x"]--;
        checker();
        if (snake[0]["x"] < 0) {
            console.log("Asd");
            forcont = true;
            return;
        }
        drawhead(headleft);
    }
    else if (snake[0]["direction"] == "right") {
        snake[0]["x"]++;
        checker();
        if (snake[0]["x"] > 11) {
            forcont = true;
            return;
        }
        drawhead(headright);
    }
    drawbody();

    

    tempx = snake[snake.length - 1]["x"];
    tempy = snake[snake.length - 1]["y"];
}

document.querySelector(".btn1").onclick = () => {
    printpoint();
    let interval = setInterval(draw, 500);
}