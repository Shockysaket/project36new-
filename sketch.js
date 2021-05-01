var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed , lastfed ; 

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed the Dog ! ");
  feed.position(700,95);
  feed.mousePressed(feedDog);


}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedtime=database.ref ('FeedTime') ;
  fedtime.on('value',function(data ){
    lastfed=data.val();

  });
  

 
  //write code to display text lastFed time here

fill(255,255,255)
textSize (15)

  if (lastfed>=12){
    text ("lastfed:" +lastfed%12+"PM"  ,350 ,30)
    }else if (lastfed==0) {
     
     
      text ("lastfed : 12 AM ", 350,30 )  
    }else {
      text ("lastfed:" +lastfed+"AM"  ,350 ,30)
    }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var reaminingfood= foodObj.getFoodStock()
  if (reaminingfood<=0){
  foodObj.updateFoodStock(reaminingfood*0 )

  } else { 
    foodObj.updateFoodStock(reaminingfood-1)
    
  }
database.ref('/').update({
  FeedTime: hour(),
  Food: foodObj.getFoodStock ()
})
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}






//var food_stock_val = foodObj.getfoodstuck()
///if (food_stuck_val<=0) {
 // foodObj.updateFoodStock(food_stock_val *0)


//}else { 
 // foodObj.updateFoodStock(food_stock_val -1  )
//}


  