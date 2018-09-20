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

class Planet extends P5Object {
  constructor(xmap, ymap, duration, r, g, b){
    super(xmap, ymap, duration);
    this.r = r;
    this.b = b;
    this.g = g;
  }

  render(){
    noStroke();
    fill(this.r, this.g, this.b, 255);
    ellipse(this.x, this.y, 80, 80);
    return this.update();
  }

  update(){
    return this._update() === 0 ? 0 : -1;
  }
}

function setup(){
  createCanvas(800, 800);
  create_objects();
}

function draw(){
  background(105, 105, 105);
  objects.forEach(((item, index, object) => {
    if(item.tick() === -1) objects.splice(index, 1);
  }));
  //if(objects.length <= 400) create_objects(420 - objects.length);
}

function create_objects(amm){
  objects.push(new Planet([400, 400], [400, 400], 1000, 253, 179, 83)) // sun
  mercury_circle = [500, 450, 350, 300, 350, 450, 500];
  mercury_circle_1 = [300, 350, 450, 500, 450, 350, 300];
  objects.push(new Planet(mercury_circle_1, mercury_circle, 20, 255, 40, 40)); // mercury
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
