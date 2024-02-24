//AI
let dot1 = document.querySelector(".dot1");
let dot2 = document.querySelector(".dot2");
let found = document.querySelector(".found");
let x1 = document.querySelector(".x1");
let y1 = document.querySelector(".y1");
let x2 = document.querySelector(".x2");
let y2 = document.querySelector(".y2");
let start = document.querySelector(".start");
let savedX;
let savedY;
let goodPath = 0;
let goodL = 1000;
let goodT = 1000;
let dot1L = 0;
let dot1T = 0;
let predot1L = 0;
let predot1T = 0;
let dot2L = 0;
let dot2T = 0;
let pointsL = 0;
let pointsT = 0;
let moveInterval;

document.addEventListener('click', function(event) {

    let x = event.clientX;
    let y = event.clientY;
  
    let screenHeight = window.innerHeight;
    let screenWidth = window.innerWidth;
    let xPercentage = (x / screenWidth) * 100;
    let yPercentage = (y / screenHeight) * 100;

    savedX = xPercentage.toFixed(0);
    savedY = yPercentage.toFixed(0);

    dot2L = savedX;
    dot2T = savedY;

    dot2.style.left = dot2L + "%";
    dot2.style.top = dot2T + "%";
    start.style.opacity = "0";
    moveInterval = setInterval(tryMove,100);
}, { once: true });

function restart(){
    dot1L = 0;
    dot1T = 0;
    dot2L = savedX;
    dot2T = savedY;
    pointsL = 0;
    pointsT = 0;
}

function updatePos(){
    x1.innerHTML = `first dot x: ${dot1L}`;
    y1.innerHTML = `first dot y: ${dot1T}`;
    x2.innerHTML = `second dot x: ${dot2L}`;
    y2.innerHTML = `second dot y: ${dot2T}`;
    dot1.style.left = dot1L + "%";
    dot1.style.top = dot1T + "%";
}

function tryMove(){
    if(goodPath == 1){
        goodPath = 0;
    }
    else if(goodPath == 0){
        goodPath = 1
    }
    if(goodPath == 0 && dot1L < goodL){
        predot1L = dot1L;
        dot1L ++;
        updatePos();
    }
    if(goodPath == 1 && dot1T < goodT){
        predot1T = dot1T;
        dot1T ++;
        updatePos();
    }
    if(predot1L < dot1L && dot1L <= dot2L){
        pointsL++;
    }
    if(predot1T < dot1T && dot1T <= dot2T){
        pointsT++;
    }
    if(dot1L > dot2L){
        goodL = dot1L - 1;
        restart();
    }
    if(dot1T > dot2T){
        goodT = dot1T - 1;
        restart();
    }
    if(dot1L == goodL && dot1T == goodT){
        clearInterval(moveInterval);
        found.innerHTML = "position found: true";
    }
}
