function SpriteSheet(path, frameWidth, frameHeight) {
 
   var image = new Image();
   var framesPerRow;
 
   // calculate the number of frames in a row after the image loads
   var self = this;
   image.onload = function() {
      framesPerRow = Math.floor(image.width / frameWidth);
   };
 
   image.src = 'sprites/cBurlgar.png';
}
SpriteSheet()