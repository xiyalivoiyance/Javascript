// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let count = document.querySelector('#count');
let num = 25;
count.textContent = num.toString();

// function to generate random number

function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


//shape constructor

function Shape(x, y, velX, velY, exists){
	
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
	
}


//balls constructor

function Ball(x, y, velX, velY, exists, color, size) {
  
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
	
}


Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}


Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
	 this.size = random(10, 80);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
	  this.size = random(10, 80);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
	  this.size = random(10, 80);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
	  this.size = random(10, 80);
  }

  this.x += this.velX;
  this.y += this.velY;

	
}

//change size if the balls are getting too close

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].size = this.size = random(10, 80);
      }
    }
  }
}

//generate balls

let balls = [];

while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
	true,
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  balls.push(ball);
}








//Eating circle constructor

	
	function Eat(x, y, velX, velY, exists, color, size) {
  
  Shape.call(this, 760, 568, 40, 40, exists);
  this.color = 'peachpuff';
  this.size = 30;
	
}


Eat.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  ctx.stroke();
}



Eat.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x -= (this.x + this.size - width);
  }

  if ((this.x - this.size) <= 0) {
    this.x += (this.size - this.x);
  }

  if ((this.y + this.size) >= height) {
    this.y -= (this.y + this.size - height);
  }

  if ((this.y - this.size) <= 0) {
    this.y += (this.size - this.y);
  }
}


Eat.prototype.setControls = function() {
	//since 'this' is not in the scope of window.onkeydown function embedded below
	let _this = this;
	
	window.onkeydown = function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }
  }
}


Eat.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
		num -= 1;
		count.textContent = num.toString();
		balls.splice(j, 1);
		if (num === 0) {
		count.textContent = 'Congradulation!';
		}
      }
    }
  }
}


let eater = new Eat();
eater.setControls();












function loop() {
  ctx.fillStyle = 'rgba(225, 225, 225, 0.3)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
	if(balls[i].exists){
	balls[i].draw();
    balls[i].update();
	balls[i].collisionDetect();	
	}
    eater.draw();
	eater.checkBounds();
	eater.collisionDetect();
  }

  requestAnimationFrame(loop);
}



setTimeout(loop, 3000);



