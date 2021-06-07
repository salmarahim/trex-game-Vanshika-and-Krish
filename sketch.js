var PLAY=1;
var END=0;
var gameState=PLAY
var cloudGroup
var cactusGroup
var trex;
var trexImg;
var trexCollidedImg;
var ground
var groundImg;
var invisibleground;
var clouds;
var gameOver;
var gameOverImg;
var cloudImg;
var cactus;
var cactusImg1,cactusImg2,cactusImg3,cactusImg4,cactusImg5,cactusImg6;
var restart;
var restartImg;
var score=0;
var jumpSound;
var dieSound;
var checkPointsound;



function preload(){
trexImg=loadAnimation("trex1.png","trex3.png","trex4.png")
trexCollidedImg=loadAnimation("trex_collided.png")

groundImg=loadImage("ground2.png")
cloudImg=loadImage("cloud.png")
cactusImg1=loadImage("obstacle1.png")
cactusImg2=loadImage("obstacle2.png")
cactusImg3=loadImage("obstacle3.png")
cactusImg4=loadImage("obstacle4.png")
cactusImg5=loadImage("obstacle5.png")
cactusImg6=loadImage("obstacle6.png")
gameOverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.png")

jumpSound=loadSound("jump.mp3")
dieSound=loadSound("die.mp3")
checkPointsound=loadSound("checkPoint.mp3")
}



function setup() {
  createCanvas(windowWidth,windowHeight)
  trex=createSprite(50,height-100,20,20);  
  trex.addAnimation("dino",trexImg);  
  trex.addAnimation("collid",trexCollidedImg)
  trex.scale=0.5
  ground=createSprite(width/2,height-80,width,20)
  ground.addImage("gd",groundImg)
  console.log(ground.width)
  invisibleground=createSprite(width/2,height-70,width,20)
  invisibleground.visible=false

cloudGroup= createGroup();
cactusGroup= createGroup();
gameOver=createSprite(width/2,height/2,20,20)
gameOver.addImage("go",gameOverImg)
gameOver.scale=0.5;
gameOver.visible=false
restart=createSprite(width/2,height/2+40,20,20);
  restart.addImage("rt",restartImg);
  restart.scale=0.5;
  restart.visible=false;

}

function draw() {
  background("black")
if(gameState===PLAY){

if(score%100=== 0 && score>0 ){
checkPointsound.play();
}



  if (keyDown("space")||touches.length>0){
    trex.velocityY=-10
    jumpSound.play();
    touches=[]
  }
  trex.velocityY=trex.velocityY+0.8;
ground.velocityX=-4;
score=score+Math.round(getFrameRate()/60)
if (ground.x<0){
  ground.x=ground.width/2;
}
spawnObstacles();
spawnClouds();
if (trex.isTouching(cactusGroup)){
  gameState=END
  dieSound.play()
}
}else if (gameState===END){
ground.velocityX=0;
cactusGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);
trex.changeAnimation("collid",trexCollidedImg)
cactusGroup.setLifetimeEach(-1);
cloudGroup.setLifetimeEach(-1);
gameOver.visible=true;

restart.visible=true;


}
if(mousePressedOver(restart)||touches.length>0){
  gameState=PLAY;
  trex.changeAnimation("dino",trexImg)
  cactusGroup.destroyEach()
  cloudGroup.destroyEach()
  gameOver.visible=false;
  restart.visible=false;
  score=0
  touches=[]
}


text("score:"+score,30,50)



trex.collide(invisibleground);
//function call
drawSprites();

}

//function definition
function spawnClouds(){
if (frameCount%100===0){
  cloud=createSprite(width,height/2,20,20)
  cloud.velocityX=-2;
  cloud.addImage("cd",cloudImg);
  cloud.scale=0.5;
  cloud.y=random(height/2,height/2+100);
  cloud.lifetime=width/2
  cloudGroup.add(cloud)
}

}
function spawnObstacles(){
  if (frameCount%100===0){
    cactus=createSprite(width,height-100,20,20)
    cactus.velocityX=-4;
    var rand=Math.round(random(1,6))

   switch(rand){
     case 1 :cactus.addImage("cs",cactusImg1);
              break;
     case 2 :cactus.addImage("cs",cactusImg2);
              break; 
     case 3:cactus.addImage("cs",cactusImg3);
              break;
     case 4 :cactus.addImage("cs",cactusImg4);
              break;                  
     case 5:cactus.addImage("cs",cactusImg5);
              break;      
     case 6 :cactus.addImage("cs",cactusImg6);
              break;  
     default :break;                         
              
   }
    cactus.scale=0.5;
    cactus.lifetime=width/4
    cactusGroup.add(cactus);


  }



}