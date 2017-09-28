  function Particle(x,y,vx,vy,size){

    this.x    = x;
    this.y    = y;
    this.vx   = vx;
    this.vy   = vy;
    this.size = size;
    this.m    = this.size*20;
    particleIndex++;
    this.id   = particleIndex;
    particles[particleIndex] = this;
    
  }

  function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }

  // DIBUJAR EL GRID, LUEGO EMPRIMIR LA MATRIZ DE VV , UU I FIJARSE EN LOS CEROS

  Particle.prototype.update = function(){ 

    xId = Math.floor(this.x/widthCell)+1;
    yId = Math.floor(this.y/heightCell)+1;

    
    if(this.x > w || this.x < 0 )this.vx = -1*this.vx;
    else
       this.vx = uu[xId][yId];

    if(this.y > h || this.y < 0)this.vy = -1*this.vy;
    else
      this.vy = vv[xId][yId];

    //this.vx = 10*uu[yId][xId];
    //this.vy = 10*vv[yId][xId];

   
    ;          
    //this.vx = 10*u[xId*yId];
    //this.vy = 10*v[xId*yId];          

    this.x += this.vx;
    this.y += this.vy;
  }

  Particle.prototype.draw = function() {    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
  };
