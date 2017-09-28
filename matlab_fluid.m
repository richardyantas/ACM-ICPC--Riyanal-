nx=20;
ny=0;
dt=0.02;
nstep=300;
mu=0.1;
maxit=200;
beta=1.2;
h=1/nx;

u = zeros(nx+1,ny+2);
v = zeros(nx+2,ny+1);
p = zeros(nx+2,ny+2);
ut= zeros(nx+1,ny+2);
vt= zeros(nx+2,ny+1);
c = zeros(nx+2,ny+2)+0.25;
uu= zeros(nx+1,ny+1);
vv= zeros(nx+1,ny+1);
w = zeros(nx+1,ny+1);

% se llena de 1/3 los bordes 
c(2,3:ny)=1/3;  
c(nx+1,3:ny)=1/3;
c(3:nx,2)=1/3;
c(3:nx,ny+1)=1/3;

% se llena de ceros ne las exquinas
c(2,2)=1/2;
c(2,ny+1)=1/2;
c(nx+1,2)=1/2;
c(nx+1,ny+1)=1/2;

un=1;us=0;ve=0;vw=0;time=0.0;

for is=1:nstep
  
 u(1:nx+1,1)   = 2*us-u(1:nx+1,2);
 u(1:nx+1,ny+2)= 2*un-u(1:nx+1,ny+1);
 v(1,1:ny+1)   = 2*vw-v(2,1:ny+1);
 v(nx+2,1:ny+1)= 2*ve-v(nx+1,1:ny+1);

   % Calculo de velocidad influidas por la adveccion y difusion(viscosidad)
    for i=2:nx
     for j=2:ny+1 % temporary u-velocity
     ut(i,j)=u(i,j)+dt*(-(0.25/h)*((u(i+1,j)+u(i,j))^2-(u(i,j)+u(i-1,j))^2+(u(i,j+1)+u(i,j))*(v(i+1,j)+v(i,j))-(u(i,j)+u(i,j-1))*(v(i+1,j-1)+v(i,j-1)))+...
     (mu/h^2)*(u(i+1,j)+u(i-1,j)+u(i,j+1)+u(i,j-1)-4*u(i,j)));
     end
    end
 
    for i=2:nx+1
     for j=2:ny % temporary v-velocity
      vt(i,j)=v(i,j)+dt*(-(0.25/h)*((u(i,j+1)+u(i,j))*(v(i+1,j)+v(i,j))-(u(i-1,j+1)+u(i-1,j))*(v(i,j)+v(i-1,j))+(v(i,j+1)+v(i,j))^2-(v(i,j)+v(i,j-1))^2)+...
      (mu/h^2)*(v(i+1,j)+v(i-1,j)+v(i,j+1)+v(i,j-1)-4*v(i,j)));
     end
    end
 
   % Calculo de las presiones
    for it=1:maxit % solve for pressure
     for i=2:nx+1
      for j=2:ny+1
        p(i,j)=beta*c(i,j)*( p(i+1,j)+p(i-1,j)+p(i,j+1)+p(i,j-1)-(h/dt)*(ut(i,j)-ut(i-1,j)+vt(i,j)-vt(i,j-1)) )+(1-beta)*p(i,j);
      end
      
     end
    end

   % Calculo de las velocidad con influencia de las presiones y adveccion    
   u(2:nx,2:ny+1)=ut(2:nx,2:ny+1)-(dt/h)*(p(3:nx+1,2:ny+1)-p(2:nx,2:ny+1));
   v(2:nx+1,2:ny)=vt(2:nx+1,2:ny)-(dt/h)*(p(2:nx+1,3:ny+1)-p(2:nx+1,2:ny));
   %time=time+dt;c
   
   
   % plot results
   uu(1:nx+1,1:ny+1)=0.5*(u(1:nx+1,2:ny+2)+u(1:nx+1,1:ny+1));
   vv(1:nx+1,1:ny+1)=0.5*(v(2:nx+2,1:ny+1)+v(1:nx+1,1:ny+1));
%   w(1:nx+1,1:ny+1)=(u(1:nx+1,2:ny+2)-u(1:nx+1,1:ny+1)-v(2:nx+2,1:ny+1)+v(1:nx+1,1:ny+1))/(2*h);
%   hold off,quiver(flipud(rot90(uu)),flipud(rot90(vv)),'r');hold on;
%   contour(flipud(rot90(w)),100),axis equal,axis([1 50 1 50]);    
%   pause(0.001)
   
end
























