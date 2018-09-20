var objects = [];
const random = (high) => { return Math.floor(Math.random() * Math.floor(high)) }; // less overhead than p5.random
const FPS = 60;

const nj = () => {};

class P5Object {
  constructor(xmap, ymap, duration){
    /*
      Constructor for a p5 object
      args: 
        xmap: x location over duration (array)
        ymap: y location over duration (array)
        duration: duration of animation (int) seconds
    */
    this.x, this.y = 0, 0;
    this.xmap = xmap;
    this.ymap = ymap;
    this.duration = duration;
    this.temp = [];
    this.ticks = 0;
    this.linterp();
  }

  linterp(){
    this.temp = [];
    this.xmap.forEach((value, index, object) => {
      this.temp = this.temp.concat(nj.linspace(this.xmap[index], this.xmap[index+1], Math.round((FPS * this.duration) / this.xmap.length)))
    });
    this.xmap = this.temp;
    this.temp = [];
    this.ymap.forEach((value, index, object) => {
      this.temp = this.temp.concat(nj.linspace(this.ymap[index], this.ymap[index+1], Math.round((FPS * this.duration) / this.ymap.length)))
    });
    this.ymap = this.temp;
  }

  tick(){
    return this.render();
  }

  _update(){
    this.ticks = this.xmap.length > this.ticks ? this.ticks + 1 : 0;
    this.x = this.xmap[this.ticks];
    this.y = this.ymap[this.ticks];
    return 0;
  }
}

class Raindrop extends P5Object {
  constructor(xmap, ymap, duration){
    super(xmap, ymap, duration);
    this.init();
  }

  render(){
    stroke(color(255, 255, 255));
    line(this.x, this.y, this.x, this.y+this.height);
    return this.update();
  }

  update(){
    this.y += this.speed;
    if(this.y > height){
      return -1;
    }
    return 0;
  }

  init(){
    this.x = random(width);
    this.y = random(-800, -10);
    this.speed = 10;
    this.height = random(10, 20);
  }
}

class P5ObjectManualAnimation extends P5Object{
  constructor(xmap, ymap, duration, r, g, b){
    super(xmap, ymap, duration);
  }
}

class Planet extends P5Object {
  constructor(xmap, ymap, duration, r, g, b, xl, yl){
    super(xmap, ymap, duration);
    this.r = r;
    this.b = b;
    this.g = g;
    this.xl = xl;
    this.yl = yl;
  }

  render(){
    noStroke();
    fill(this.r, this.g, this.b, 255);
    ellipse(this.x, this.y, this.xl, this.yl);
    return this.update();
  }

  update(){
    return this._update() === 0 ? 0 : -1;
  }
}

function setup(){
  createCanvas(800, 800);
  create_objects();
  frameRate(FPS);
}

function draw(){
  background(105, 105, 105);
  objects.forEach(((item, index, object) => {
    if(item.tick() === -1) objects.splice(index, 1);
  }));
  //if(objects.length <= 400) create_objects(420 - objects.length);
}

function create_objects(amm){
  objects.push(new Planet([400, 400], [400, 400], 1000, 253, 179, 83, 80, 80)) // sun
  temp = nj.orbit(400, 75);
  objects.push(new Planet(temp[0], temp[1], 240, 255, 40, 40, 15, 15)); // mercury
  temp = nj.orbit(400, 100);
  objects.push(new Planet(temp[0], temp[1], 360, 255, 10, 10, 20, 20)); // venus
  temp = nj.orbit(400, 135);
  objects.push(new Planet(temp[0], temp[1], 450, 0, 100, 0, 25, 25)); // earth
  temp = nj.orbit(400, 180);
  objects.push(new Planet(temp[0], temp[1], 570, 100, 0, 0, 17, 17)); // mars
  temp = nj.orbit(400, 230);
  objects.push(new Planet(temp[0], temp[1], 700, 100, 100, 100, 40, 40)); // jupiter
  temp = nj.orbit(400, 290);
  objects.push(new Planet(temp[0], temp[1], 900, 100, 70, 70, 35, 35)); // saturn
  temp = nj.orbit(400, 350);
  objects.push(new Planet(temp[0], temp[1], 1100, 20, 30, 140, 30, 30)); // uranus
  temp = nj.orbit(400, 390);
  objects.push(new Planet(temp[0], temp[1], 1250, 20, 30, 250, 30, 30)); // neptune
  temp = nj.orbit(400, 450);
  objects.push(new Planet(temp[0], temp[1], 1600, 70, 70, 150)); // pluto
}

nj.linspace = (start_value, stop_value, cardinality) => {
  if(stop_value == null) return [start_value];
  var arr = [];
  var curr_value = start_value;
  var step = (stop_value - start_value) / (cardinality - 1);
  for (var i = 0; i < cardinality; i++) {
    arr.push(parseFloat((curr_value + (step * i)).toFixed(2)));
  }
  return arr;
}

nj.orbit = (midpoint, radius) => {
  temp_x = [];
  temp_y = [];
  for(i=0; i<360; i++){
    temp_x.push(midpoint + Math.cos(i)*radius);
    temp_y.push(midpoint + Math.sin(i)*radius);
  }
  return [temp_x, temp_y];
}
