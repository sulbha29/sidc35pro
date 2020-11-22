//Create variables here
var dog, happyDog, database, foodS, foodStock
var dogimg,happyDogimg
var lastFed,foodObj,FeedTime,addFood
function preload()
{
  //load images here
  dogimg = loadImage("dog.png")
  happyDogimg = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  dog = createSprite(250,250,10,10)
  dog.addImage(dogimg)
  dog.scale = 0.1

  feed = createButton("Feed the dog")
  feed.position(550,95);
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(650,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

foodStock = database.ref('Food');
foodStock.on("value",readStock);

}


function draw() {  
background(46, 139, 87) ;


foodObj.display();
FeedTime=database.ref("FeedTime");
FeedTime.on("value",function(data){
  lastFed=data.val();
})
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: " + lastFed%12 + "PM",250,30);
}
else if(lastFed===0){
  text("Last Feed : 12 AM",250,30);
}else{
  text("Last Feed: " + lastFed + " AM",250,30);
}

  fill("white")
  text("Food remaining: " + foodS, 210,300)
  drawSprites();
}


/*function writeStock(x){
  
  if(x <= 0){
    x = 0
  }
  else{
    x = x-1
  }
  database.ref('/').set({
    Food:x
  })
}*/

function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDogimg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}


