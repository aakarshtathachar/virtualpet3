//Create variables here

var dog;
var happyDog;
var database;
var foods
var foodStock;
var fedtime,lastFed;
var feed,addFood;
var foodobj;
var gameState,readState;


function preload()
{
happyDog = loadImage("images/dogImg1.png")
dogimg = loadImage("images/dogImg.png")
garden = loadImage("images/Garden.png")
washroom = loadImage("images/Wash Room.png")
bedroom = loadImage("images/Bed Room.png")

  
	//load images here
}

function setup() {
  database=firebase.database();
  createCanvas(1000, 400);
  foodobj = new Food();
  
  
  dog = createSprite(250,300,150,150)
  dog.addImage(dogimg);
  dog.scale=0.1;
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  feed = createButton("feed the dog");
  feed.position(700,95)
  feed.mousePressed(feedDog);
  addFood = createButton("addFood");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  fedtime = database.ref('feedtime');
  fedtime.on("value",function(data){
    lastFed = data.val();
  })
 
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })
  
}


function draw() {
  
  currentTime=hour();
  if(currentTime===(lastFed+1)){
    update("Playing");
    foodobj.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodobj.bedroom();
  }
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodobj.washroom();
  }

  else{
    update("Hungry")
    foodobj.display();
  }

  if(gameState!=="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();

  }

  else{
    feed.show();
    addFood.show();
    dog.addImage(dogimg);

  }

  

  drawSprites();
  //add styles here
 

}

function readStock(data){
  foods=data.val();
  foodobj.updatefoodStock(foods);
}

function feedDog(){
   dog.addImage(happyDog);
    foodobj.updatefoodStock(foodobj.getFoodstock()-1);
     database.ref('/').update({ Food:foodObj.getFoodstock(), FeedTime:hour() })
     } 
     
     //function to add food in stock 
     function addFoods(){
        foods++; 
        database.ref('/').update({ Food:foods }) 
      }

      function update(state){
        database.ref('/').update({
          gameState:state
        })
        
      }



  



