function myMove() {
    var elem = document.getElementById("animate"); 
    var pos = 0;
    var id = setInterval(frame, 4);
    var direction = 1;
    var counter =1;
    // function frame() {
    //     if(counter % 2 ==1){  
    //         pos++;
    //         elem.style.transform= 'scaleX(-1)'; 
    //         elem.style.top = pos + 'px'; 
    //         elem.style.left = pos + 'px'; 
    //     }
    //     if(pos == 500)
    //     {
    //         counter++;  
    //     }
    //     if(counter % 2 ==0){  
            
    //         elem.style.transform= 'scaleX(1)'; pos--; 
    //         elem.style.top = pos + 'px'; 
    //         elem.style.left = pos + 'px'; 
    //     }
    //     if(pos == 0)
    //     {
    //         elem.style.transform= 'scaleX(-1)'; 
    //         counter++;
    //     }
    // }  


///Potion N LIFEBAR
var listposX = 550;
var newBut2 = document.createElement('button');
newBut2.id = 'animate;'
newBut2.style.width = "100px";
newBut2.style.height = "100px";
newBut2.style.borderRadius = "50%";
newBut2.style.backgroundColor = 'green';
newBut2.innerHTML ="<h1>Flip</h1>";
var body = document.body;
newBut2.style.position = "absolute";
newBut2.style.left = "100px";
newBut2.style.top = "400px";
body.appendChild(newBut2);
var health =100;

newBut2.addEventListener("click", function(){
  
  console.log('click worked with POTION'+ health);
  counter++;  

  
} )
}
myMove();

window.onkeyup = function(e) {
   var key = e.keyCode;
   console.log(key);

   // if (key == 38) {
   //     playerSpriteX += 10;
   // }else if (key == 40) {
   //     playerSpriteX -= 10;
   // }
}


