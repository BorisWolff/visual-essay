function Particle(x, y) {
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.prevPos = this.pos.copy();
	this.maxSpeed = 2; // TODO can be dependent on input;
	this.maxForce = 1;
	this.target = 0;
	this.r = 0;

	this.setR = function(newR) {
		this.r = newR;
	}

	this.setTarget = function(x, y) {
		this.target = createVector(x, y);
	}

	this.update = function() {
		this.updatePrevious();
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.follow = function(vectors) {
		var x = floor(this.pos.x / scl);
		var y = floor(this.pos.y / scl);
		var index = x + y * cols;
		var force = vectors[index];
		this.applyForce(force);
	}

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.show = function() {
		stroke(this.r, 255, this.r, 10); // TODO alpha and color can be dependent on input
		strokeWeight(1); // TODO can be dependent on input
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
	}

	this.updatePrevious = function() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}

	this.edges = function() {
		if (this.pos.x > width){
			this.pos.x = 0;
			this.updatePrevious();
		} 
		if (this.pos.x < 0) {
			this.pos.x = width
			this.updatePrevious();
		}

		if (this.pos.y > height) {
			this.pos.y = 0;
			this.updatePrevious();
		} 
		if (this.pos.y < 0) {
			this.pos.y = height 
			this.updatePrevious();
		}
	}

	this.setMax = function(newMAx) {
		this.maxSpeed = newMax
	}


	// CODE TO FORM TEXT
	this.behaviors = function() {
		var toText = this.goToText(this.target);
		//var mouse = createVector(mouseX, mouseY);
		//var flee = this.flee(mouse);

		toText.mult(1);
	  	//flee.mult(10);
	
		this.applyForce(toText);
  		//this.applyForce(flee);
	}

	this.goToText = function() {
		var desired = p5.Vector.sub(this.target, this.pos);
  		var d = desired.mag();
  		var speed = this.maxSpeed;
  		if (d < 100) {
  		  speed = map(d, 0, 100, 0, this.maxSpeed);
  		}
  		desired.setMag(speed);
  		var steer = p5.Vector.sub(desired, this.vel);
  		steer.limit(this.maxForce);
  		return steer;
	}

	this.flee = function(target) {
		var desired = p5.Vector.sub(target, this.pos);
  		var d = desired.mag();
  		if (d < 100) {
  		  desired.setMag(this.maxSpeed);
  		  desired.mult(-1);
  		  var steer = p5.Vector.sub(desired, this.vel);
  		  steer.limit(this.maxForce);
  		  return steer;
  		} else {
  		  return createVector(0, 0);
  		}
	}

	this.setRandomVel = function() {
		var randomVel = createVector(random(width), random(height));
		randomVel.setMag(this.maxSpeed);
		this.vel = randomVel;
	}
}