var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey,monkey_running, monkey_collided;
var banana,bananaImage,obstacle,obstacleImage;
var ground,invisibleGround;
var bananaGroup, obstaclesGroup;
var survivalTime = 0;
var score = 0;
function preload()
{  
 //loading animation and images to the variable 
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");            
  monkey_collided = loadAnimation("sprite_0.png");
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() 
{
  createCanvas(400,400);

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided", monkey_collided)
  monkey.scale = 0.13;
  
  ground = createSprite(400,357,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;

  invisibleGround = createSprite(400,357,900,10);
  invisibleGround.visible = false;
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup(); 
}


function draw() 
{
  //setting background colour
  background("lightBlue");
   
  
  textSize(20);
  fill("black");
  text("Survival Time:" +survivalTime,130,50)
  text("Score:" + score, 200, 75);
  
  //creating gamestates
  if (gameState === PLAY)
    {
    survivalTime = Math.ceil(frameCount/frameRate());      


    if (ground.x < 0)
      {
      ground.x = ground.width/2;
      }  

    if(keyDown("space")&& monkey.y >= 200)
      {
      monkey.velocityY = -13;
      }

    monkey.velocityY = monkey.velocityY + 0.8;


    food();
    spawnObstacles();
    
  if(bananaGroup.isTouching(monkey))
      {
      score = score+1;
      bananaGroup.destroyEach();
        
      }
      
  if(obstaclesGroup.isTouching(monkey))
      {
      gameState = END;    
      }
  }
  
  else if (gameState === END)
  {
    reset();
     monkey.changeAnimation("collided", monkey_collided);
  }
  
  
  monkey.collide(invisibleGround);

  drawSprites();
}

function reset(){
  ground.velocityX = 0;
  monkey.velocityY = 0;
    
  bananaGroup.setRotationSpeedEach(0);
  obstaclesGroup.setRotationSpeedEach(0);
 
  obstaclesGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
  
    
  obstaclesGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
    
    textSize(23);
    fill("red");
    text("Game Over",150,200);    
}

function food()
{
  if (frameCount % 100 === 0)
  {
    var banana =createSprite(390,Math.round(random(120,230)));
    banana.addImage("eating",bananaImage);
    banana.velocityX = -6;
    banana.scale = 0.10;
    banana.rotationSpeed = 15;
    banana.lifetime = 100;
    
    bananaGroup.add(banana);    
  }
}

function spawnObstacles()
{
  if (frameCount %90 === 0)
  {
    var obstacle = createSprite(300,340,22,22); 

    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.1;
    obstacle.lifetime = 65;
    obstacle.rotationSpeed = 10;
    obstaclesGroup.add(obstacle);
  }
}





