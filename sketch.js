var jumpmusic,diemusic,pointmusic;

var gameover,gameoverimg,restart,restartimg;

var obstaclegroup,cloudgroup;

var PLAY=1;

var END=0;

var gamestate=PLAY

var score=0

var obstaculo,obs1,obs2,obs3,obs4,obs5,obs6

var ground,groundimg,groundinvisible;

var trex, trex_img, edges, treximg2;

var nuvem, nuvem_img;

function preload(){
    //carregar as imagens e animações do código

    trex_img = loadAnimation("trex1.png","trex2.png","trex3.png");
    treximg2 = loadAnimation("trex_collided.png");

    groundimg=loadImage ("ground2.png") 
    nuvem_img=loadImage ("cloud.png") 

    obs1=loadImage ("obstacle1.png")
    obs2=loadImage ("obstacle2.png")
    obs3=loadImage ("obstacle3.png")
    obs4=loadImage ("obstacle4.png")
    obs5=loadImage ("obstacle5.png")
    obs6=loadImage ("obstacle6.png")

    gameoverimg=loadImage ("gameOver.png")
    restartimg=loadImage ("restart.png")

    jumpmusic=loadSound("jump.mp3");
    diemusic=loadSound("die.mp3");
    pointmusic=loadSound("checkpoint.mp3");
}

function setup(){
    //criar os componentes

    createCanvas(600,200);

    //criar o trex
    trex = createSprite(100,160,20,50);
    trex.addAnimation("correndo", trex_img);
    trex.addAnimation("colidindo",treximg2)
    trex.scale = 0.5;
    trex.setCollider("rectangle",0,0,400,50)
    //trex.debug="true"

    ground=createSprite(200,180,400,20);
    ground.addImage(groundimg);

    groundinvisible=createSprite(200,190,400,10);
    groundinvisible.visible=false;

    obstaclegroup = new Group();
    cloudgroup = new Group();

    gameover=createSprite(300,100);
    gameover.addImage(gameoverimg);

    restart=createSprite(300,150);
    restart.addImage(restartimg);


    var rand = Math.round(random(10,100));
    //console.log(rand);
   
}

function draw(){
  //crio o jogo em si
  background("white");
  text("score:"+score,500,50);

  console.log("isto é:"+gamestate)

  if (gamestate===PLAY){
    score = score + Math.round(frameCount/60);

    if (score>0 && score%1000===0){
    pointmusic.play();  
    }

    gameover.visible=false
    restart.visible=false
  
    //movimentando o solo em direção ao trex
    ground.velocityX=-(4+3*score/100);
  
    //reiniciando a posição do solo
   if (ground.x<0){
    ground.x=ground.width/2;
    }

    //fazer o trex saltar
    if(keyDown("space") && trex.y>160){
        trex.velocityY = -10;
      jumpmusic.play();  
    }
    //gravidade
    trex.velocityY = trex.velocityY + 0.5;
    
    //chamar a função
    gerarNuvens();
    gerarobstaculos();

    if (obstaclegroup.isTouching(trex)){
    // gamestate = END;
   //  diemusic.play();
   trex.velocityY = -10;
   jumpmusic.play();    
    }
 
    } 

    else if (gamestate===END){
     ground.velocityX=0;
     trex.velocityY=0;
     
    trex.changeAnimation("colidindo",treximg2);

    gameover.visible=true
    restart.visible=true
  

    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1);
    }

  
  //trex colide com a parede
  trex.collide(groundinvisible);

 
  drawSprites();
}

//função para gerar nuvens

function gerarNuvens(){

if (frameCount%60===0) {
nuvem = createSprite(600,100,40,10) 
nuvem.addImage(nuvem_img)
nuvem.velocityX = -4 
nuvem.y=random(15,50) 
nuvem.scale=0.8 

nuvem.lifetime = 200 
//profundidade 
//console.log(trex.depth);
//console.log(nuvem.depth);
trex.depth=nuvem.depth;
trex.depth=trex.depth+1;

cloudgroup.add(nuvem);
 }
}

 function gerarobstaculos(){
if (frameCount % 60 === 0){  
 obstaculo = createSprite(600,165,10,40)
 obstaculo.velocityX = -(5+score/100)  
 
 var sorteio =Math.round(random(1,6));
 switch(sorteio){
 case 1:obstaculo.addImage(obs1);
 break;
 case 2:obstaculo.addImage(obs2);
 break;  
 case 3:obstaculo.addImage(obs3);
 break;
 case 4:obstaculo.addImage(obs4);
 break;
 case 5:obstaculo.addImage(obs5);
 break;
 case 6:obstaculo.addImage(obs6);
 break;
 default:break;
 }
 obstaculo.scale=0.6
 obstaculo.lifetime=300

 obstaclegroup.add(obstaculo);
}


 }