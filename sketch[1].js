//please note the following things:

// 1. The bananas are spawning in random positions within the 80 frames.
// 2. When you collide with the stones in this game the game is over.
// Have fun!
var monkey,monkey_running,moving;
var ground,groundImage;
var banana,bananaImage,bananaGroup;
var obstacle,obstacleImage,obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover = "nice try";

function preload(){
monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
bananaImage = loadImage("banana.png");  
obstacleImage = loadImage("obstacle.png");  

 
}


function setup() {
  createCanvas(600,600);
//creating ground
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
 //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating banana & obstacle group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();

 
  
  
}


function draw() {
  background("white");

  //when we press space the monkey will jump upwards.
  if(keyDown("space"))
     {
     monkey.velocityY=-10;
     }
   
  
  //to help pull the monkey down by gravity so it doesn't stay up.
  monkey.velocityY = monkey.velocityY+0.8;
  //resetting the ground to half it's width.
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }
// we are calling our functions up here.
  food();
  spawnRocks();

  if(gamestate===PLAY){
    gameover.visible=false;

  if(bananaGroup.isTouching(monkey)){
      
    bananaGroup.destroyEach();
    survivalTime = survivalTime+1;
  }
}
    if (obstacleGroup.isTouching(monkey)) {
     gamestate=END
     obstacleGroup.destroyEach();
  
  } if(gamestate===END){
    
    monkey.destroy();
    ground.destroy();
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameover.visible=true;
    stroke("black");
    textSize(20);
    fill("black");
    text("Gameover: " + gameover,180,200);

    
  }
  //this is to help display the survival time text on the canvas. 
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime,200,50);
  
 
  
         
  
// this is used so the monkey can collide with the ground
  monkey.collide(ground);
  drawSprites();
   
}

     
function food(){
  //this is to make sure the banana appears for every 80 frames.
   if(World.frameCount%80==0){
 
  banana = createSprite(300,130,20,20);
  banana.addImage(bananaImage); 
  banana.scale=0.1;
  banana.y = Math.round(random(120,200));
  banana.velocityX=-5;
  banana.lifetime=150;

  bananaGroup.add(banana);  
      
  }
}
function spawnRocks(){
  // this is to make sure the obstacle appears after every 300 frames.
  if(World.frameCount%300==0){
    obstacle = createSprite(400,330,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);

  }
}
