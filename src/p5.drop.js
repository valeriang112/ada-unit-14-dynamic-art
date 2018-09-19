class Raindrop extends P5Object {
  constructor(vtol, xtol, speed){
    super(vtol, xtol, speed);
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
