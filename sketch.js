var tower,towerImage;
var phantom, phantomStand;
var doorImage, climberImage;
var gamestate;
var doorGroup, climberGroup,doorImage,climberGroupUp,climberGroupDown;



function preload(){
  towerImage = loadImage ("tower.png");
  doorImage = loadImage ("door.png");
  phantomStand = loadImage ("ghost-standing.png");
  climberImage = loadImage ("climber.png");
 

}
function setup(){
  createCanvas(windowWidth,windowHeight);
  tower = createSprite(width/2,height  /2,10,10);
  tower. addImage("towerI",towerImage);
  tower. scale = 0.70;
  
  doorGroup = new Group();
  climberGroup = new Group();
  climberGroupUp = new Group();
  climberGroupDown = new Group();
  
  phantom = createSprite(width / 2,height/1.5,20,20);
  phantom . addImage("phantomStand",phantomStand);
  phantom. scale = 0.4;
  phantom. setCollider ("rectangle",0,+40,150,250)
 
  
  gamestate = "start";
  
}
function draw(){
  background (0);
  drawSprites();
  fill(0);
  textSize(30)
  if(touches.length>0){
    console.log(touches[0].x)
    console.log(touches[0].y)
  }
  if(gamestate === "start" && (keyDown("space")|| touches.length > 0)){
    gamestate = "play";
  }
  
  if(gamestate === "play"){
    phantom.velocityY = phantom.velocityY +0.3;
    tower.velocityY = 1;
 
    
    
    if(tower.y > 450){
    tower.y = height / 4
    }
    if(phantom.y > 600){
      gamestate = "end";
      
    }
    if(touches.length  > 0){
    if(keyDown("space")|| touches [0].y < phantom.y){
      phantom.velocityY  = -4
     // touches = [];
    }
    if(keyDown("left_arrow")|| touches [0].x < phantom.x){
      phantom.x = phantom.x -3;
      
    }
      if(keyDown("right_arrow")|| touches [0].x > phantom.x){
      phantom.x = phantom.x +5;
    
      }
      touches = [];
    }
    if(phantom.isTouching(climberGroupUp)){
      phantom. velocityY = 0;
    }
    if(phantom.isTouching(climberGroupDown)){
      gamestate = "end";
    }
  
     doors();
  }
  
  if(gamestate === "end"){
    tower. velocityY = 0;
    doorGroup.setVelocityYEach(0);
    climberGroup.setVelocityYEach(0);
    doorGroup.setLifetimeEach(-1);
    climberGroup.setLifetimeEach(-1);
    climberGroupUp.setLifetimeEach(-1);
    climberGroupUp.setVelocityYEach(0);
    climberGroupDown.setLifetimeEach(-1);
    climberGroupDown.setVelocityYEach(0);
    phantom.velocityY = +3;
    text("you  lose",130,200);
    text("press space to restart",50,250)
  
    if(keyDown("space")|| touches .length > 0){
      restart()
    }
  }
  
  
  
}
function doors(){
  
  if(frameCount % 150 === 0){
    var door = createSprite( Math.round(random(50,width - 50)),0,20,20);
    var climber = createSprite(door.x,door.y + 50,10,10);
    var climberUp= createSprite(climber.x,climber.y -5,50,10);
    var climberDown= createSprite(climber.x,climber.y + 5,50,10);
    door. addImage("door",doorImage);
    door.velocityY = +2;
    door. scale = 0.9;
    door.lifetime = 300;
    climber. velocityY = +2
    climber. addImage(climberImage);
    climber.scale = 0.7;  
    climber.lifetime = 300;
    climberUp.velocityY = +2;
    climberUp.lifetime = 300;
    climberUp. visible = false;
    climberGroupUp.add(climberUp);
    climberDown.velocityY = +2;
    climberDown.lifetime = 300;
    climberDown. visible = false;
    climberGroupDown.add(climberDown);
    
    climber.depth = phantom.depth;
    door.depth = phantom.depth;
    phantom.depth = phantom.depth +1;
    doorGroup.add(door);
    climberGroup.add(climber);
    
    

  }
}
function restart(){
  gamestate = "start";
  phantom.y = height / 1.5;
  phantom.x = width / 2;
  doorGroup.destroyEach();
  climberGroup.destroyEach();
  climberGroupUp.destroyEach();
  climberGroupDown.destroyEach();
}