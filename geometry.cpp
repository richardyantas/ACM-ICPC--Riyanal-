#include<bits/stdc++.h>
using namespace std;

class point{
public:
	float x,y;
	point(){}
	point(float _x,float _y){
		x = _x;
		y = _y;
	}
};

class line{
public:
	point p1 ,p2;
	line(point _p1,point _p2){
		p1 = _p1;
		p2 = _p2;
	}
	float slope(){
		return (p1.y-p2.y)/(p1.x-p2.x);
	};
};

point intersection(line l1,line l2){
	// y = m'(x-x0')+y0' = m(x-x0)+y0
	//('m-m)x = (y0-y0') + m'X0'-mX0
	// x = (y0-y0')/('m-m)+(m'x0'-mx0)/('m-m)
	float x,y;
	if(l1.slope() != l2.slope() ){
		x = ( l1.p1.y - l2.p1.y )/(l2.slope()-l1.slope()) + (l2.slope()*l2.p1.x - l1.slope()*l1.p1.x)/(l2.slope()-l1.slope()) ;
		y = l1.slope()*(x-l1.p1.x)+l1.p1.y;
		if(  (min(l1.p1.x,l1.p2.x)< x && x < max(l1.p1.x,l1.p2.x)) && (min(l2.p1.x,l2.p2.x)< x && x < max(l2.p1.x,l2.p2.x)) ){
			return point(x,y);
		}
	}
	return point(0,0);
}


int main(){
	line line1( point(0.0,10.0) , point(10.0,0.0) );
	line line2( point(0.0,0.0), point(3.0,3.0));
	point p = intersection(line1,line2);
	printf("( %f , %f )",p.x,p.y);
	return 0;
}

