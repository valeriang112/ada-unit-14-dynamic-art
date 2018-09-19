class Moon extends P5Object {
  constructor(vtol, xtol, speed){
    super(vtol, xtol, speed);
    this.init();
  }

  render(){
    directionalLight(204, 204, 204, 100, 100, 1);
    return this.update();
  }

  update(){
    return 0;
  }

  init(){
    this.x = 0;
    this.y = width - 100;
  }
}
