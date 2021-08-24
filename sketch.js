var library, libraryImg;
var librarian, librarianImg;
var boy, boyImg, boysGroup;
var nail, nailImg, nailsGroup;
var score;

var invisibleGround;
var gameState = "play";

function preload(){
 libraryImg =  loadImage("library.jpg");
 librarianimg = loadImage("librarian.jpeg");
 boyImg = loadImage("boy.jpeg");
 nailImg = loadImage("nail.png");
}

function setup() {
 createCanvas(600,400);
 
 library = createSprite(200,180,360,450);
 library.addImage("library", libraryImg);
 library.x = library.width/2;
 nailsGroup = createGroup();
 
 boy = createSprite(50,300,20, 50);
 boy.scale = 0.25;
 boy.addImage(boyImg);
 invisibleGround = createSprite(50,360,360,10)
 invisibleGround.visible = true;

 boy.setCollider("rectangle", 0, 0,430, 500);
 boy.debug = true;
 score = 0;
}

function draw() {
    background(200);
    fill (99,00,33)   
    text ("Score: " + score, 500, 50);

if (gameState === "play"){
boy.collide(invisibleGround);
library.velocityX = -(3+2*score/100);

fill (100,34,29)
text ("Press Space to Make The Boy Jump",180, 350)
fill (100,35,35)
text ("Avoid The Nails!", 180, 380)

if (library.x <0){
    library.x = library.width/2
}

if(keyDown("space") && boy.y >= 100){
boy.velocityY = -10
score = score +10;
}

boy.velocityY = boy.velocityY + 0.5;
spawnNails();

if (nailsGroup.isTouching(boy)){
    boy.velocityY = -10;
    gameState = "end";
}
}

 if (gameState === "end"){
   
     text ("Game Over", 200, 200);

     library.velocityX = 0;
    boy.velocityyY = 0;

    nailsGroup.setLifetimeEach(-1);
    nailsGroup.setVelocityXEach(0)
 }

 boy.collide(invisibleGround);
 drawSprites();
}

function spawnNails(){
    if (frameCount%120 === 0){
var nail = createSprite(400, 165, 10,40);
nail.velocityX = -1.5;
nail.addImage(nailImg);
nail.scale = 0.05
nail.y = Math.round(random(380,100))
nail.lifetime = 400;;
nailsGroup.add(nail)
nail.depth = boy.depth;
boy.depth = boy.depth + 1;
}
}
