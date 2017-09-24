window.onload = function() {

  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      particles = {},
      particleIndex = 0,
      particleNum = 2;

      canvas.width = 1500; 
      canvas.height = 800; 
      canvas.style.border = "2px solid #000";
      canvas.style.background = "rgba(255,0,0,0.1)";
      canvas.style.position = "absolute"; 
      canvas.style.top = '50px'; 
      canvas.style.right = '100px';

  function distance(a,b){
    return Math.sqrt( Math.pow( (a.x-b.x),2) + Math.pow( (a.y-b.y) ,2) );
  };
  
  function Particle(x,y,vx,vy,size){

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.ax = 0;
    this.ay = 0;
    this.fx = 0;
    this.fy = 0; 
    
    this.size = size;// Math.floor(Math.random() * 30) +1;
    this.m = this.size*20;
    
    this.fm = [];


    //if (this.size > 2){
    //  this.vy = 3;
    //}
    //else if (this.size < 2){
      //this.vy = 2;
    //}

    this.gravity = 0.001;
    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
    this.life = 0;
    this.maxLife = 350;
    this.pegado = false;


  }

  Particle.prototype.update = function(){
    
    var fmx=0,fmy=0,d,G = 3;

    for(var i=1;i<=particleNum;i++){
      if(i != this.id){
        d = distance(particles[this.id],particles[i]);        
        ux = (particles[i].x-this.x)/d;
        uy = (particles[i].y-this.y)/d;

        fmx += (G*this.m*particles[i].m/Math.pow(d,2))*ux;        
        fmy += (G*this.m*particles[i].m/Math.pow(d,2))*uy;
      }            
    }

    this.fx = fmx;
    this.fy = fmy;

    this.vx += this.fx/this.m;
    this.vy += this.fy/this.m;

    this.x += this.vx;
    this.y += this.vy;  
    
    //if (Math.random() < 0.1) {
    //  this.vx = Math.random() * 10 - 5;
    //}

    this.vy += this.gravity;
    this.life++;
    
    if (this.life >= this.maxLife) {
      //delete particles[this.id];
    }

    if (this.y >= canvas.height) {
      this.y = canvas.height - 2;
      this.vx = 0;
    }
  }

  Particle.prototype.draw = function() {
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();

  };

  

  function update(){
    for (var i in particles) {
      particles[i].update();
    }
  };

  function render(){
    for (var i in particles) {
      particles[i].draw();
    }
  };

  function clear(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);    
  };


  function initialize(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //for(var i = 0; i < particleNum; i++) {
      //new Particle();
    //}
    //Math.floor(Math.random() * 10) / 5
    //new Particle(50,400,0,-2,2);
    //new Particle(200,400,0,0,10);
    new Particle(50,400,0,0,2);
    new Particle(1200,400,0,0,20);
    
    //new Particle(700,400,0,0,200);

  };
  
  function main(){
    
    initialize();

    setInterval(function() {
      clear();    
      update();
      render();

    }, 15);
  };

  main();  
};