var path,boy,papelao,garrafa,lixo,sword;
var pathImg,boyImg,papelaoImg,garrafaImg,lixoImg,swordImg,winImg,endImg;
var treasureCollection = 0;
var papelaoG,garrafaG,lixoG,swordGroup;

var barrier, win1, end1;

var PLAY=1;
var END=0;
var WIN=2;
var gameState=1;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  papelaoImg = loadImage("papelao.png");
  garrafaImg = loadImage("garrafa.png");
  lixoImg = loadImage("lixo.png");
  swordImg = loadImage("poça.png");
  endImg =loadImage("fimdeJogo.png");
  winImg = loadImage("win.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight + 200);
path=createSprite(windowWidth/2,200);
path.addImage(pathImg);
path.velocityY = 12 + treasureCollection/200;

barrier=createSprite(windowWidth/2,0,windowWidth,100);



boy = createSprite(100,windowHeight -200,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.18;
//boy.debug=true;
boy.setCollider("rectangle",0,0,700,1100);

win1 = createSprite(windowWidth/2,windowHeight/2);
win1.addImage("winning",winImg);
win1.visible = false;
win1.scale = 1

end1 = createSprite(windowWidth/2,windowHeight/2);
end1.addImage("ending", endImg);
end1.visible=false;
end1.scale=2




papelaoG=new Group();
garrafaG=new Group();
lixoG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);


 
  if(path.y > windowHeight ){
    path.y = height/2;
  }
  
    createPapelao();
    createGarrafa();
    createLixo();
    createSword();


    if (papelaoG.isTouching(boy)) {
      papelaoG.destroyEach();
      treasureCollection=treasureCollection+50;
}    
    else if (garrafaG.isTouching(boy)) {
      garrafaG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(lixoG.isTouching(boy)) {
      lixoG.destroyEach();
      treasureCollection = treasureCollection + 150;
  
    } else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        end1.visible = true;
        path.velocityY=0;
        
        boy.remove();

        
        
        papelaoG.destroyEach();
        garrafaG.destroyEach();
        lixoG.destroyEach();
        swordGroup.destroyEach();
        
       
        papelaoG.setVelocityYEach(0);
        garrafaG.setVelocityYEach(0);
        lixoG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
    }

  
  }
     }

     if(treasureCollection >= 4000){
      boy.velocityY=-5;
  
      path.velocityY = 0;
  
      papelaoG.destroyEach();
      garrafaG.destroyEach();
      lixoG.destroyEach();
      swordGroup.destroyEach();
  
 
      papelaoG.setVelocityYEach(0);
      garrafaG.setVelocityYEach(0);
      lixoG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
   }

   if(barrier.isTouching(boy)){
     gameState = WIN;
     }

     if(gameState == WIN){
     boy.remove();
     win1.visible = true;
     
     papelaoG.destroyEach();
     garrafaG.destroyEach();
     lixoG.destroyEach();
     swordGroup.destroyEach();
  
 
     papelaoG.setVelocityYEach(0);
     garrafaG.setVelocityYEach(0);
     lixoG.setVelocityYEach(0);
     swordGroup.setVelocityYEach(0);
     }

  
  drawSprites();
  textSize(18);
  fill(255);
  text("Pontuação: "+ treasureCollection,10,30);
  text("Objetivo: 4000!",260,30)
  }



function createPapelao() {
  if (World.frameCount % 130 == 0) {
  var papelao = createSprite(Math.round(random(100,windowWidth-200),40, 10, 10));
  papelao.addImage(papelaoImg);
  papelao.scale=0.1;
  papelao.velocityY = 12 + treasureCollection/200;
  papelao.lifetime = windowHeight;
  papelaoG.add(papelao);
  }
}

function createGarrafa() {
  if (World.frameCount % 100 == 0) {
  var garrafa = createSprite(Math.round(random(100,windowWidth-200),40, 10, 10));
  garrafa.addImage(garrafaImg);
  garrafa.scale=0.25;
  garrafa.velocityY = 12 + treasureCollection/200;
  garrafa.lifetime = windowHeight;
  garrafaG.add(garrafa);
  }
}

function createLixo() {
  if (World.frameCount % 150 == 0) {
  var lixo = createSprite(Math.round(random(100,windowWidth-200),40, 10, 10));
  lixo.addImage(lixoImg);
  lixo.scale=0.3;
  lixo.velocityY = 12 + treasureCollection/200;
  lixo.lifetime = windowHeight;
  lixoG.add(lixo);
  }
}

function createSword(){
  if (World.frameCount % 80 == 0) {
  var sword = createSprite(Math.round(random(100,windowWidth-200),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.5;
  sword.velocityY = 12 + treasureCollection/200;
  sword.lifetime =windowHeight;
  sword.setCollider("circle",-40,100,250);
  swordGroup.add(sword);
  //sword.debug = true;
  
  
  }
}
