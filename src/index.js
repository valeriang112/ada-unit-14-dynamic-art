var objects = [];
const random = (high) => { return Math.floor(Math.random() * Math.floor(high)) };

function setup(){
  createCanvas(windowWidth, windowHeight );
  create_objects();
  background(0, 0, 0);
}

function draw(){
  background(0,0,0);
  objects.forEach(((item, index, object) => {
    if(item.tick() === -1) objects.splice(index, 1);
  }));
  if(objects.length <= 400) create_objects(420 - objects.length);
}

function create_objects(amm){
  for(var i=0; i < amm; i++){
    objects.push(new Raindrop(0, 0, 0));
  }
}
