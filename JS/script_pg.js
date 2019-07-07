
window.onload = function() {
    init();
    }

function init() {
    var Pong    = document.getElementById('pong');
    var Scor1   = document.getElementById('scJ1');
    var Scor2   = document.getElementById('scJ2');
    var Terrain = document.getElementById('terrain');
    var RaqJ1   = document.getElementById('rj1');
    var RaqJ2   = document.getElementById('rj2');
    var Ball    = document.getElementById('ball');
    document.addEventListener("keydown", testJ1B, false);
    //document.addEventListener("keyup", testJ1, false);
    Terrain.addEventListener('mousemove', j2,false);
    }

function initDir() {  //initier la direction de la balle
    //alert("initDir");
    var teta = Math.random()*2*Math.PI;
    var dx = Math.floor(10*Math.cos(teta));
    if (dx === 0) {dx = 5;}
    var dy = Math.floor(10*Math.sin(teta));
    return [dx, dy];
  }

function initBallPosi() {
    //alert("iniBallPosi");
    //var Terrain = document.getElementById('terrain');
    Ball = document.getElementById('ball');
    Ball.setAttribute('cx', 400);
    Ball.setAttribute('cy', 300);
    //Terrain.addEventListener("keydown", testB, false);
}

function initScore() {
    Scor1 = document.getElementById('scJ1');
    Scor2 = document.getElementById('scJ2');
    Scor1.innerHTML = "0";
    Scor2.innerHTML = "0";
}

// Fonction j1(): guette les fleches et modifie y de rj1 : Z et W onkeypress 
function j1(dJ1) {
    var RaqJ1 = document.getElementById('rj1');
    var yR1 = RaqJ1.getAttribute('y');
    yR1 = parseInt(yR1);
    if (((yR1+dJ1)<=10) && (dJ1<0)) {
        yR1=10;
     } 
    else if (((yR1+dJ1)>=520) && (dJ1>0)) {
        yR1=520;
    }else{
        yR1=yR1+dJ1;
        }
    RaqJ1.setAttribute("y", yR1);   
    }

// Fonction j2(): guette la souris et modifie y de rj2 : avec le y de la souris           
function j2(e) {
    var RaqJ2 = document.getElementById('rj2');   
    const Terrain = document.getElementById('terrain');
    const rect = Terrain.getBoundingClientRect();
    yS = Math.floor(e.clientY - rect.top);
    var yR2 = RaqJ2.getAttribute('y');
    //alert("yS" + yS + "\n" + "yR2" + yR2);
    yR2 = parseInt(yR2);
    if (yS>(yR2+40)) {dJ2 =  15;}
    if (yS<(yR2+40)) {dJ2 = -15;}
    if (((yR2+dJ2)<=10) && (dJ2<0)) {
    yR2 = 10;
     } 
    else if (((yR2+dJ2)>=520) && (dJ2>0)) {
        yR2 = 520;
    }else{
        yR2 = yR2 + dJ2;
        }
    RaqJ2.setAttribute("y", yR2);   
    }
  
function startBall() {
    initBallPosi();
    [dx, dy] = initDir();
    moveBall();
}

function newGame() {
    initScore();
    }

function moveBall() {
    //Terrain = document.getElementById('terrain');
    Ball    = document.getElementById('ball');
    var xB  = Ball.getAttribute('cx');
    var yB  = Ball.getAttribute('cy');
    var RaqJ1 = document.getElementById('rj1');
    var RaqJ2 = document.getElementById('rj2');
    var yR1 = RaqJ1.getAttribute('y');
    var yR2 = RaqJ2.getAttribute('y');
    //alert('xB '+ xB + '\ndx' + dx + '\nyR1 ' + yR1 + ' yB ' + yB + 'yR1+80 ' + yR);
    // Positions limites : 20, 20, 790, 590.
    xB = parseInt(xB);
    yB = parseInt(yB);
    yR1 = parseInt(yR1);
    yR2 = parseInt(yR2);
    // Le contrôle se fait par rapport à la position des raquettes
    if ((((xB + dx) < 80) && (xB >= 80) && (dx < 0) && (yR1 <= yB) && (yB <= (yR1+80))) ||
        (((xB + dx) > 720) && (xB <= 720) && (dx > 0) && (yR2 <= yB) && (yB <= (yR2+80)))) {dx = -dx}
    xB +=dx;	
    if ((xB + dx) < 20) { // Arreter balle, la replacer au centre et incrémenter le compteur J2
        //dx = 0;
        //dy = 0;
        window.cancelAnimationFrame(reqMB);
        incremente("J2");
        //Terrain.addEventListener("keydown", testB, false);
        initBallPosi();
        return;
        }  
    if ((xB + dx) > 790) {
        //dx = 0;
        //dy = 0;
        window.cancelAnimationFrame(reqMB);
        incremente("J1");
        //Terrain.addEventListener("keydown", testB, false);
        initBallPosi();
        return;
        }    
    if ((((yB + dy) < 20) && (dy < 0)) || (((yB + dy) > 590) && (dy > 0))) { dy = -dy; }
    yB +=dy;
    Ball.setAttribute('cx', xB);
    Ball.setAttribute('cy', yB);
    reqMB = window.requestAnimationFrame(moveBall);
    }

function testJ1B(e) {
    //alert("testJ1"+e + "\n"+e.keyCode) //w:87, z:90
    if (e.keyCode === 90) { j1(-25);}
    if (e.keyCode === 87) { j1(+25);}
    if (e.keyCode === 32) {
        Ball = document.getElementById('ball');
        let xB  = parseInt(Ball.getAttribute('cx'));
        let yB  = parseInt(Ball.getAttribute('cy'));
        //alert('xB' + xB + '\n' + 'yB' + yB);
        if (xB===400 && yB===300) {
            startBall();
            }
        } 
    }

function testJ2(e) {
    const Terrain = document.getElementById('terrain');
    const rect = Terrain.getBoundingClientRect();
    y = Math.floor(e.clientY - rect.top);
    //alert(e + "\n" + y);
    }

function incremente(Joueur) {
    if (Joueur === "J2") {
        Scor2 = document.getElementById('scJ2');
        let Val = Scor2.innerHTML;
        Val = parseInt(Val)+1;
        Scor2.innerHTML = Val;
        }
    if (Joueur === "J1") {
        Scor1 = document.getElementById('scJ1');
        let Val = Scor1.innerHTML;
        Val = parseInt(Val)+1;
        Scor1.innerHTML = Val;
        }
    return;
    }
