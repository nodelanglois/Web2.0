

//var cnv = document.getElementById('pong');
var canvas = document.getElementById('pong');
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  alert("Allright !")
  // code de dessin dans le canvas
} else {
  alert("Allo Huston ?")
}

alert('Bienvenue dans Pong 3');


//var ctx = cnv.getContext("2d");
function newGame() {
    var canvas = document.getElementById('pong');
    var ctx = canvas.getContext('2d');

    alert("C'est tipar !! " + "\n"+ canvas  +"\n" + ctx);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0,0,150,75);
    
}

