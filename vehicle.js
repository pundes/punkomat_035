
function Vehicle(x, y) {
  this.position = createVector(x, y);

  this.r = 6;

  this.maxspeed;
  this.maxforce = 0.2;
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);


  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.separate = function(vehicles) {
    var desiredseparation = 20;
    var sum = createVector();
    var count = 0;
    for (var i = 0; i < vehicles.length; i++) {
      var d = p5.Vector.dist(this.position, vehicles[i].position);
      if ((d > 0) && (d < desiredseparation)) {
        var diff = p5.Vector.sub(this.position, vehicles[i].position);
        diff.normalize();
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  this.update = function() {
    this.velocity.add(this.acceleration);

    this.maxspeed = 1;
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.display = function(vehicles) {
    var dist;


    for (var i = 0; i < vehicles.length; i++) {
      dist = p5.Vector.dist(this.position, vehicles[i].position);
      if(dist > 0 && dist < 65) {
          stroke(0);
          strokeWeight(1);
          line(this.position.x, this.position.y, vehicles[i].position.x, vehicles[i].position.y);
          line(this.position.x, this.position.y, vehicles[i].position.x-1, vehicles[i].position.y-9);
          line(this.position.x, this.position.y, vehicles[i].position.x+4, vehicles[i].position.y+1);
          strokeWeight(0.5);
          line(this.position.x, this.position.y, vehicles[i].position.x+4, vehicles[i].position.y+3);
          line(this.position.x, this.position.y, vehicles[i].position.x+7, vehicles[i].position.y+13);

      }
    }


  }


  this.borders = function() {
    if (this.position.x < -this.r) this.position.x =  width+this.r;
    if (this.position.y < -this.r) this.position.y = height+this.r;
    if (this.position.x >  width+this.r) this.position.x = -this.r;
    if (this.position.y > height+this.r) this.position.y = -this.r;
  }
}
