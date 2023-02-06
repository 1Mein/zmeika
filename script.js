document.querySelector(".btn4").onclick = () => {
    document.querySelector(".auth").style.display = "none";
    document.querySelector(".login").style.display = "block";

}

document.querySelector(".btn5").onclick = () => {
    document.querySelector(".auth").style.display = "none";
    document.querySelector(".signin").style.display = "block";
}

document.querySelector(".btn7").onclick = () => {
    if (document.querySelector(".activeuser").innerHTML == "") {
        document.querySelector(".auth").style.display = "block";
    }
    document.querySelector(".login").style.display = "none";
}

document.querySelector(".btn9").onclick = () => {
    if (document.querySelector(".activeuser").innerHTML == "") {
        document.querySelector(".auth").style.display = "block";
    }
    document.querySelector(".signin").style.display = "none";
}

if(document.querySelector(".activeuser").innerHTML != ""){
    document.querySelector(".auth").style.display = "none";
}
else{
    document.querySelector(".exit").style.display = "none";
}