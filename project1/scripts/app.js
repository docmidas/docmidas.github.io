
var singlePlayer = true;
var playerPosX = 100;
var playerPosY = 450;
var elem = document.createElement('img'); 
    elem.src = "sprites/girlRun.gif";
    elem.style.position = "absolute";
    elem.style.left = playerPosX + 'px';
    elem.style.top = playerPosY + 'px';
document.body.appendChild(elem);   

var explain1 = document.createElement('p');
explain1.innerHTML ="<h1>1 player mode<br>-press  W  to jump<br>-collect treasure<br>-avoid shots!</h1>";
explain1.style.left = playerPosX + 190 + "px";
explain1.style.top = playerPosY - 40 +"px";
document.body.appendChild(explain1);

//////
//BadJet
var BadJetStartX = 800;
var BadJetStartY = 50;
var badJet = document.createElement('img'); 
    badJet.src = "sprites/jetFlyIdle.gif";
    badJet.style.position = "absolute";
    badJet.style.left = BadJetStartX + 'px';
    badJet.style.top = BadJetStartY + 'px';
document.body.appendChild(badJet);   

var explain2 = document.createElement('p');
explain2.innerHTML ="<h1>2 player mode<br>press \&#8678 to shoot ninja- <br> protect your treasure-</h1>";
explain2.style.left = BadJetStartX - 350 + "px";
explain2.style.top =  30 +"px";
document.body.appendChild(explain2);


var overlay = document.createElement('img');
    overlay.src = "sprites/overlay.png";
    overlay.style.zIndex = 5;
document.body.appendChild(overlay);

var myAi;

var startButton = document.createElement('button');
startButton.innerHTML ="<h1>1 Player</h1>";
startButton.style.left = "500px";
startButton.style.top = "300px";
document.body.appendChild(startButton);

startButton.addEventListener("click", function(){

  runGame();
})

var startButton2 = document.createElement('button');
startButton2.innerHTML ="<h1>2 Player</h1>";
startButton2.style.left = "650px";
startButton2.style.top = "300px";
document.body.appendChild(startButton2);

startButton2.addEventListener("click", function(){

  singlePlayer = false;
  runGame();

})

var health = 100;

var retryButton = document.createElement('button');
retryButton.innerHTML ="<h1>Retry</h1>";
retryButton.style.left = "500px";
retryButton.style.top = "300px";

retryButton.addEventListener("click", function(){

  document.body.removeChild(retryButton);
  document.location.reload(true);
})

function runGame(){
//REMOVE INTRO ELEMENTS  
document.body.removeChild(elem);
document.body.removeChild(badJet);

document.body.removeChild(startButton);
document.body.removeChild(startButton2);
document.body.removeChild(explain1);
document.body.removeChild(explain2);

var myEngine;
var p1Jumping = false;
var jumpHeight = 110;
var groundLevel = 450;
var jumpCooled = true;
var startBlastX = 650;
var startBlastY = 125;

var blastPosX = 750;
var blastPosY = 25;
var yHitBlast  =false;
var xHitBlast = false;

var blast = document.createElement('img');  
  blast.src = "sprites/blast.gif";
  blast.id = "blast";
  blast.style.position = "absolute";
  //blast.style.zIndex = -5;
  blast.style.left = blastPosX + 'px';
  blast.style.top = blastPosY + 'px'; 
var blastStatus = false;    

var spark = document.createElement('img'); 
    spark.style.zIndex= 100;
    spark.src = "sprites/spark.gif";
    spark.style.position = "absolute";
    spark.style.width =  300+ "px";
    spark.style.height = 300 + "px";
    

var bgMusic = document.getElementById("bgMusic");
bgMusic.volume = .3;


var bgPic = document.getElementById("bg");
var scoreValue = 0;

var maxWidth = 1000;
var maxHeight = 500;
var coinPosX;
var coinPosY;
var coin;
var xHit = false;
var yHit = false;

var bgPosX = 0;
var bg2PosX = 2000;
var bgPic2 = document.createElement('img');  
  bgPic2.src = "sprites/valleyBg3.png";
  bgPic2.style.position = "absolute";
  bgPic2.style.zIndex = -5;
  bgPic2.style.left = bg2PosX + 'px';
  bgPic2.style.top = 0 + 'px';
  document.body.appendChild(bgPic2); 

var scoreBoard = document.createElement('p'); 
scoreBoard.style.position = "absolute";
scoreBoard.style.left = 20 + 'px';
scoreBoard.style.top = 40 + 'px';
scoreBoard.id  = "scoreBoard";
scoreBoard.innerHTML = "Score: " + scoreValue;
document.body.appendChild(scoreBoard);  


var healthBoard = document.createElement('p'); 
healthBoard.style.position = "absolute";
healthBoard.style.left = 20 + 'px';
healthBoard.style.top = 0 + 'px';
healthBoard.id  = "healthBoard";
healthBoard.innerHTML = "Health: " + health;
document.body.appendChild(healthBoard);

var caching = new Audio('sounds/Jingle_Win_Synth_01.mp3');

var swish = new Audio('sounds/whoosh.mp3');
swish.volume = .4;
var step = new Audio('sounds/Fantozzi-SandL1.ogg');
step.volume = .15;
var blastImpact = new Audio('sounds/fireImpactShrt.mp3');
var blastShot = new Audio('sounds/blastShot.mp3');
var girlScream = new Audio('sounds/girlScreamShrt.mp3');


document.body.appendChild(elem);
document.body.appendChild(badJet);
genCoin(1500, Math.round(Math.random() * maxHeight) + 150) ;  

////////////
/////Move enviornment WORKING
myEngine = setInterval(moveEnvironment, 50);

/////Move enviornment
function moveEnvironment() {  

  shiftObjects();
  bgPosX -= 10;
  bg2PosX -= 10;
  bgPic.style.left =  bgPosX + 'px';
  bgPic2.style.left =  bg2PosX + 'px';
  //window.requestAnimationFrame();
  if(bgPosX <= -2000){    
    bgPosX = 2000;
  };
  if(bg2PosX <= -2000){
    bg2PosX = 2000;
  };
} 
//////////////////////

//////////////
//////
setInterval(function(){
  if(playerPosY == groundLevel){
    step.play();

  }
}, 25)

////CPU Shooter Timer
myAi = setInterval(cpuTimer, 1500);

function cpuTimer(){
  if(singlePlayer == true){
    var cpuShoot = Math.round(Math.random());
  
    if(cpuShoot % 2 == 0){
      jetShoot();
    }
  }
}

//Control Movements
window.onkeyup = function(e) {
   var key = e.keyCode;
 
   
   if(key == 37){ //LEFT
      // elem.style.transform= 'scaleX(-1)'; 
      // playerPosX -= 15;   
      jetShoot(); 
   }else if(key == 87 ){ // W key aka UP
        if(jumpCooled == true){  
          elem.src = "sprites/girlJump.gif";
          jump();
        } 

      setTimeout(function(){elem.src = "sprites/girlRun.gif";}, 1500);      
   } else if(key == 68){ // RIGHT
        //elem.style.transform= 'scaleX(1)'; 
        //playerPosX += 15; 
   } else if(key == 40){ //DOWN
        //playerPosY += 15; 
   }else if(key == 32){ //SPACE
      elem.src = "sprites/girlStrike.gif";
      setTimeout(function(){elem.src = "sprites/girlRun.gif";}, 400);
   };
  
   elem.style.left = playerPosX + 'px';
   elem.style.top = playerPosY + 'px';     
}

//JET SHOOTS
function jetShoot(){
  if(blastStatus == false){
    blastShot.play();  
    badJet.style.left = BadJetStartX - 120 + "px";  
    badJet.src = "sprites/jetShoot.gif";
    
        setTimeout(function(){badJet.src = "sprites/jetFlyIdle.gif";
          badJet.style.left = BadJetStartX + "px";        
        }, 400);
        
        genBlast();
  }      
} 

//////GIRL JUMP 
function jump(){  
    step.pause();
    swish.play();
    jumpCooled = false;
    if(playerPosY > jumpHeight) {
      
      playerPosY -= 5;
      
      elem.style.top = playerPosY + 'px';
      window.requestAnimationFrame(jump);
      
      return;
    };
    if(playerPosY <= jumpHeight){
      
      gravity();
    }
    return;   
}

function gravity() {
  if(playerPosY != groundLevel) {
      playerPosY += 10;
      
      elem.style.top = playerPosY + 'px';
      window.requestAnimationFrame(gravity);
  } else if(playerPosY == groundLevel){
  jumpCooled = true;}
  return;  
}

function shiftObjects() {  
  
  collisionTests();
  
    coinPosX -= 10;  
    coin.style.left = coinPosX + 'px';
  
  if(blastStatus == true){
    blastPosX -= 15  + (scoreValue / 50) ;
    blastPosY += 10 + (scoreValue / 50);
    blast.style.left = blastPosX + 'px';
    blast.style.top = blastPosY + 'px';
  }  
  collisionTests();
}

function genCoin(x,y) {
  
  coin = document.createElement('img');
  coin.src = "sprites/coinSpin.gif";
  coin.style.position = "absolute";
  
  coin.style.left = x + 'px';
  coin.style.top = y + 'px';
  coinPosX = x;
  coinPosY = y;    
  document.body.appendChild(coin);  
  };  


  function genBlast() {
    blastStatus = true;    
    blast.style.left = blastPosX + 'px';
    blast.style.top = blastPosY + 'px';
    document.body.appendChild(blast);    
  };  

function collisionTests() {
  for(var c = 80; c <= 120; c++ ){
    if(coinPosX == playerPosX + c){
      xHit = true;
      for(var d = 0; d <= Math.round(elem.height * .9); d++ ){
        if(coinPosY == playerPosY + d){
          yHit = true;
        }
      } 
    }
  } 

  if(xHit && yHit ){
      
      caching.play();      
      scoreValue += 100;      
      scoreBoard.textContent = "Score: " + scoreValue;      
      document.body.removeChild(coin);

      spark.style.left = coinPosX - 80 + "px";
      spark.style.top = coinPosY - 260 + "px";
      
      document.body.appendChild(spark);
      setTimeout(function(){document.body.removeChild(spark)}, 600);
      xHit = false;
      yHit = false;
      genCoin( 1300, Math.round(Math.random() * maxHeight) +150) ;
    } else{
        xHit = false;
        yHit = false;
    };

  if(coinPosX < -100) {
    document.body.removeChild(coin);
    genCoin( 1000, Math.round(Math.random() * maxHeight) +150) ;
  };
 //BLAST HIT TEST 
  if(blastStatus == true){
    
    for(var bx = 80; bx <= 120; bx++ ){
      if(blastPosX + 60 == playerPosX + bx){
        xHitBlast = true;
        for(var by = 0; by <= Math.round(elem.height * .95); by++ ){
          if(blastPosY + 60 == playerPosY + by){
            yHitBlast = true;
          }
        } 
      }
    } 

    if(xHitBlast && yHitBlast ){
      
        blastImpact.play();
        elem.src = "sprites/girlInjured.gif";
        setTimeout(function(){elem.src = "sprites/girlRun.gif";}, 900);
        health -= 34;     
        healthBoard.textContent = "Health: " + health;      
        blastStatus = false;
        document.body.removeChild(blast);
        blastPosX = startBlastX;
        blastPosY = startBlastY; 
        xHitBlast = false;
        yHitBlast = false; 

///////////Check for DEATH
        if(health <= 0){ 
          girlScream.play();
          setTimeout(function(){ //wait til dying animation finishes to clear screen
            clearTimeout(myEngine);            
            document.body.removeChild(elem);
            endGameScreen();
          }, 900);
        }    
    }else{
          xHitBlast = false;
          yHitBlast = false;
    };  
    if(blastPosX < 50 && blastStatus == true) {
    
      document.body.removeChild(blast);
      blastStatus = false;
      blastPosX = startBlastX;
      blastPosY = startBlastY;    
    }
  }
}
}/// END OF RUNGAME

function endGameScreen(){
  document.body.appendChild(retryButton);


}
