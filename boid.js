export default class Boid {
    constructor({ p5Instance, initX, initY, maxVelocity, maxSteeringVelocity, dampening }) {
      this.p5 = p5Instance;
      this.location = this.p5.createVector(initX, initY);
      this.velocity = this.p5.createVector();
      this.acceleration = this.p5.createVector();
      this.maxVelocity = maxVelocity;
      this.maxSteeringVelocity = maxSteeringVelocity;
      this.dampening = dampening;
      this.vHeight = 20;
      this.vWidth = 10;
      this.v1 = null;
      this.v2 = null;
      this.v3 = null;
    }
  
    _draw() {
      const p5 = this.p5;
      p5.stroke(0);
      p5.fill(175);
  
      this.v1 = p5.createVector(0, 0);
      this.v2 = p5.createVector(-this.vWidth / 2, this.vHeight);
      this.v3 = p5.createVector(this.vWidth / 2, this.vHeight);
  
      p5.triangle(this.v1.x, this.v1.y, this.v2.x, this.v2.y, this.v3.x, this.v3.y);
    }
  
    _displayVehicle() {
      const p5 = this.p5;
      p5.push();
      p5.translate(this.location.x, this.location.y);
      p5.rotate(this.velocity.heading() + p5.PI / 2);
      this._draw();
      p5.pop();
    }
  
    _checkBoundaries() {
      const p5 = this.p5;
      const x = this.location.x;
      const y = this.location.y;
  
      if (x < 0) {
        this.location.x = p5.width;
      }
  
      if (x > p5.width) {
        this.location.x = 0;
      }
  
      if (y < 0) {
        this.location.y = p5.height;
      }
  
      if (y > p5.height) {
        this.location.y = 0;
      }
    }
  
    render() {
      this._displayVehicle();
      // this._displayFov();
    }
  
    applyForce(force) {
      force.limit(this.maxSteeringVelocity);
      this.acceleration.add(force);
    }
  
    update() {
      // const p5 = this.p5;
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.velocity.limit(this.maxVelocity);
      this.velocity.mult(this.dampening);
  
      this.acceleration.mult(0);
    }
  
    run() {
      this.update();
      this._checkBoundaries();
      this.render();
    }
  }

  