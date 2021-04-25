var player; 
var enemy;

var gamestate = 1;
var health = 100;
var score = 0;
var invisibleWall1;
var invisibleWall2;
var invisibleWall3;
var invisibleWall4;

var Enemygroup;

var EnemyImg1;
var EnemyImg2;
var EnemyImg3;

function preload()
{
EnemyImg1 = loadImage("Enemy1.png")
EnemyImg2 = loadImage("Enemy2.PNG")
EnemyImg3 = loadImage("Enemy3.PNG")
}
function setup() {
  createCanvas(displayWidth,displayHeight-110);
  Enemygroup = new Group();
  player = createSprite(400,300,50,50);
  player.shapeColor = "aqua";
  
 

 invisibleWall1 = createSprite(10,5,10,5000)
 invisibleWall1.visible = false;

 invisibleWall2 = createSprite(10,5,5000,10)
 invisibleWall2.visible = false;
 
 invisibleWall3 = createSprite(1250,5,10,5000)
 invisibleWall3.visible = false;
 
 invisibleWall4 = createSprite(1250,5,5000,10)
 invisibleWall4.visible = false;
}

function draw() {
  background("Black");  
  

 Enemygroup.bounceOff(invisibleWall1);
 Enemygroup.bounceOff(invisibleWall2);
 Enemygroup.bounceOff(invisibleWall3);
 Enemygroup.bounceOff(invisibleWall4);
 player.collide(invisibleWall1);
 player.collide(invisibleWall2);
 player.collide(invisibleWall3);
 player.collide(invisibleWall4);

 if(gamestate===0){
   text("Press Space To Start",displayWidth/2-100,displayHeight/2);
   if(keyDown("space")&&gamestate==0){
      gamestate = 1;
      
      start();
   }
 }

  if(gamestate===1)
  {
    if(frameCount%30===0)
    {
      score = score+1
    }
    
    textSize(20);
 fill("white");
 text("Health:"+health,1050,50)
 text("Score:"+score,500,50);
    if(keyDown("up")||keyDown("w"))
  {
    player.y = player.y-10;
  }
  if(keyDown("down")||keyDown("s"))
  {
    player.y = player.y+10;
  }
  if(keyDown("left")||keyDown("a"))
  {
    player.x = player.x-10;
  }
  if(keyDown("right")||keyDown("s"))
  {
    player.x = player.x+10;
  }
  if(Enemygroup.isTouching(player)&&keyDown("space"))
  {
    Enemygroup.destroyEach();
  }
  if(Enemygroup.isTouching(player))
  {
    Enemygroup.destroyEach();
    health = health-10;
  }
  if(score>0&&frameCount%200===00){
spawnEnemy();
  }
  if(score>10&&frameCount%180===0)
  {
      spawnEnemy();
  }
  }
  
 if(health===0){
   gamestate = 2
 }
 if(gamestate===2){
   textSize(50)
   text("Game Over",displayWidth/2-100,displayHeight/2);
   text("Press r to restart",displayWidth/2-100,displayHeight/2-50);
   player.visible = false;
   score.visible = false;
   health.visible = false;

   if(keyDown("r")&&gamestate===7){
    gamestate = 1;
    player.visible = true;
    score.visible = true;
    health.visible = true;
  }
 }
 
 drawSprites();

}

function spawnEnemy(){
    enemy = createSprite(500,500,50,50);
    enemy.x = Math.round(random(100,500));
    enemy.y = Math.round(random(50,250));
    enemy.velocityX = 10;
    enemy.velocityY = 5;
    Enemygroup.add(enemy);
    enemy.scale = 0.5;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: enemy.addImage(EnemyImg1);
              break;
      case 2: enemy.addImage(EnemyImg2);
              break;
      case 3: enemy.addImage(EnemyImg3);
              break;
      default: break;
    }
}

function start (){
  enemy.velocityX = 10;
    enemy.velocityY = 5;
}
function reset () {
  player.x = 50;
  player.y = 50;
}
