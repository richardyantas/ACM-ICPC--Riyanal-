#include<iostream>
#include<cmath>
using namespace std;



int power( int a , int b , int mod ){

      if( b == 0 ) return 1;
      int dev = power( a , b/2 , mod);
      if( b % 2 == 0)
            return ( dev * dev ) % mod;
      return (( dev * dev ) % mod ) * ( a % mod ) % mod;
}

int main(){      
      int p , x , cont = 0;
      cin >> p;
      x = 1;
      while(x < p){                        
            int k = 1;           
            for(int i = 1 ; i < (p-1) ; i++){
                  if( power( x , i , p) != 1){ k = 1;}
                  else { k = 0 ; break ;}
            }            
            if(k == 1){/*cout<<x<<endl*/cont++;}    
            x++;
      }                          
     cout << cont << endl;          
      return 0;
}
