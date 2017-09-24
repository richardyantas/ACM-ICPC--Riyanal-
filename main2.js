window.onload = function() {
// hola oigan oigan
  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      particles = {},
      particleIndex = 0,
      particleNum = 50;

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

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  test();

  Particle.prototype.getCellpos = function(w,h,xCell,yCell){

    if(this.x>w)this.x=w;
    if(this.x<0)this.x=0;
    if(this.y>h)this.y=h;
    if(this.y<0)this.y=0;

    var xf=w/xCell , yf=h/yCell;
    
    xId= this.x/xf;
    yId= this.y/yf;
    xId=Math.min(xId,xCell-1);
    yId=Math.min(yId,yCell-1); 

    if(u[0])
    {
      this.vx = u[xId][yId];
      this.vy = v[xId][yId];
    }
    

  }


  Particle.prototype.update = function(){
    
    this.getCellpos(1800,500,10,10);
    
    //this.vx += getRandomInt(-5,5);
    //this.vy += getRandomInt(-5,5);

    //this.vx += Math.floor(Math.random(1)*10)/10;
    //this.vy += Math.floor(Math.random(1)*10)/10;

    this.x += this.vx;
    this.y += this.vy;  
    
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

  var nx = 9, ny = 9,
        dt = 0.02,
        nstep = 200,
        mu = 0.1,
        maxit = 100,
        beta = 1.2,
        h = 1/nx,

        u = [],
        v = [],
        p = [],
        ut = [],
        vt = [],
        c = [],
        uu = [],
        vv = [],
        w = [];
  
  var un = 1, ve = 0,us = 0,vw = 0,time = 0.0;

  for(var i=1; i<=nx+5; i++) {
      u[i] = [];
      v[i] = [];
      p[i] = [];
      ut[i] = [];
      vt[i] = [];
      c[i] = [];
      uu[i] = [];
      vv[i] = [];
      w[i] = [];
  }

  for( var i=3;i<=nx;i++)
  {
    c[2][i]=1/3;
    c[nx+1][i]=1/3;
    c[i][2]=1/3;
    c[i][ny+1]=1/3; 
  }

  c[2][2]=1/2;
  c[2][ny+1]=1/2;
  c[nx+1][2]=1/2;
  c[nx+1][ny+1]=1/2;


  function test(){

    for(var i=1;i<=nx+1;i++){
      u[i,1]=2*us-u[i][2];
      u[i,ny+2]=2*un-u[i][ny+1];
      v[1,i][ny+1]=2*vw-v[2][i];
      v[nx+2][i]=2*ve-v[nx+1][i];
    }
        
    for(var is=0;is<nstep;is++){
      // updates vectors;
      for( var i=2;i<nx;i++){
        for( var j=2;j<ny;j++){          
          ut[i][j]=u[i][j]+dt*( (-0.25/h)*( (u[i+1][j]+u[i][j])^2 - (u[i][j]+u[i-1][j])^2 + (u[i][j+1]+u[i][j])*(v[i+1][j]+v[i][j])-(u[i][j]+u[i][j-1])*(v[i+1][j-1]+v[i][j-1]) ));
        }
      }
    
      for( var i=2;i<nx;i++){
        for( var j=2;j<ny;j++){          
          vt[i][j]=v[i][j]+dt*( (-0.25/h)*( (u[i][j+1]+u[i][j])*(v[i+1][j]+v[i][j])-(u[i-1][j+1]+u[i-1][j])*(v[i][j]+v[i-1][j]) + (v[i][j+1]+v[i][j])^2 - (v[i][j]+v[i][j-1])^2) );
        }
      }

      for( var it=1;it<maxit;it++){
        for(var i=2;i<=nx+1;i++){
          for(var j=2;j<=ny+1;j++){
            p[i][j]=beta*c[i][j]*( p[i+1][j]+p[i-1][j]+p[i][j+1]+p[i][j-1]-(h/dt)*(ut[i][j]-ut[i-1][j]+vt[i][j-1] ))+(1-beta)*p[i][j];
          }
        } 
      }      
    }

    // Correction step
    for(var i=2;i<=nx;i++){
      for(var j=2;j<=ny+1;j++){
        u[i][j]=ut[i][j]-(dt/h)*(p[i+1][j]-p[i][j]);
      }
    }
    for(var i=2;i<=nx+1;i++){
      for(var j=2;j<=ny;j++){
        v[i][j]=vt[i][j]-(dt/h)*(p[i][j+1]-p[i][j]);
      }
    }
  }

  

  function update(){
    
    test();
    
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
    
    for(var i = 0; i < particleNum; i++) {
      new Particle(500,500,0,0,10);
    }

    //Math.floor(Math.random() * 10) / 5
    //new Particle(50,400,0,-2,2);
    //new Particle(200,400,0,0,10);
    //new Particle(50,400,0,0,2);
    //new Particle(1200,400,0,0,20);
    
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