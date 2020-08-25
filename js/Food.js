class Food {
    constructor(){
        this.image=loadImage("images/Milk.png")
        this.foodStock=0;
        this.lastFed;

    }
    updatefoodStock(foodStock){
        this.foodStock = foodStock;
    }
    getFedtime(lastFed){
        this.lastFed = lastFed;

    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;

        }

    }
    getFoodstock(){
        return this.foodStock;
    }
    display(){
   background(46,139,87);
   fill("white");
   textSize(15);
   if(lastFed>=12){
       text("lastFeed:"+lastFed%12+"pn",50,30);
   }
   else if(lastFed === 0){
       text("lastFeed:12AM",50,30)
   }
else{
    text("lastFeed:"+lastFed+"AM",50,30)
}
var x=70,y=100;
imageMode(CENTER);

if(this.foodStock!=0){
    for(var i = 0;i<this.foodStock; i++){
        if(i % 10 === 0){
            x=80;
            y=y+50
        }
        image(this.image,x,y,50,50)
        x=x+30
    }

    }
}
bedroom(){
    background(bedroom,550,500)
}
garden(){
    background(garden,550,500)
}
washroom(){
    background(washroom,550,500)
}

}