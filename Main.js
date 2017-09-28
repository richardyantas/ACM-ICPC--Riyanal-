    var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    particles = {},
    particleIndex = 0,
    particleNum = 1000;

    var WIDTH = 500, HEIGHT = 500;

    canvas.width = WIDTH; 
    canvas.height = HEIGHT; 
    canvas.style.border = "2px solid #000";
    canvas.style.background = "rgba(255,0,0,0.1)";
    canvas.style.position = "absolute"; 
    canvas.style.top = '50px'; 
    canvas.style.right = '700px';

  var w           = WIDTH,
      h           = HEIGHT,
      numCellx    = 10,
      numCelly    = 10,
      widthCell   = WIDTH/numCellx,
      heightCell = HEIGHT/numCelly;


    function drawgrid(){
        ctx.beginPath();
        for (var i = 0; i <=numCellx; i++) {
            ctx.moveTo(0,heightyCell*i);
            ctx.lineTo(HEIGHT,heightCell*i); 
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
        for (var i = 0; i <=numCelly; i++) {
            ctx.moveTo(widthCell*i,0);
            ctx.lineTo(widthCell*i,WIDTH);
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }        
        for (var i = 1; i <=numCellx; i++) {
            for (var j = 1; j < numCelly; j++) {
                ctx.font = "10px Arial";
                ctx.fillStyle = "white";
                ctx.fillText( (Math.floor(uu[i][j]*10)/10).toString()+ "," +(Math.floor(vv[i][j]*10)/10).toString(),widthCell*(i-0.7),heightyCell*(j-0.5));   
                //ctx.fillText( (Math.floor(uu[i*j]*10)/10).toString()+ "," +(Math.floor(vv[i*j]*10)/10).toString(),widthCell*i,heightyCell*j);

            }
        } 
    }
    

    function clearFrame(){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);    
    };


    function initializeParticles(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);    
        for(var i = 0; i < particleNum; i++) {
          new Particle(getRandomInt(widthCell,WIDTH-widthCell),getRandomInt(heightCell,HEIGHT-heightCell),0,0,2);
        }
    };

    function update(){    
        test();
        for (var i in particles){
            particles[i].update();
        }
    };

    function render(){
        //drawgrid();
        for (var i in particles) {
            particles[i].draw();
        }
    };
  
    function main(){
        initializeParticles();
        setInterval(function() {      
          clearFrame();    
          update();
          render();
        }, 15);
    };

    main(); 
