	PVector r,v,a;
	float t=0;
	float dt=10;
	float rm;
	void setup()
	{
		size(1000,1000);
		background(200,200,200);
		r=new PVector(6370e3,0);
		v=new PVector(5000,8500);
		a=new PVector();
	}
	
	void calv()
	{
		v=PVector.add(v,PVector.mult(a,dt));
	}
	
	void calr()
	{
		r=PVector.add(r,PVector.mult(v,dt));
		rm=r.mag();
	}
	
	void cala()
	{
		a=r.get();
		a.normalize();
		a=PVector.div(a,-1*rm*rm);
		a=PVector.mult(a,3.986e14);
	}
	
	void drawellipse()
	{
		fill(0,0,0);
		stroke(0,0,0);
		ellipse(5e-6*r.x+500,5e-6*r.y+500,2,2);
		fill(0,0,255);
		ellipse(5e-6*0+500,5e-6*0+500,5e-6*6370e3*2,5e-6*6370e3*2);
	}
	
	void printxy()
	{
		fill(200,200,200);
		noStroke();
		rect(100,100,400,-30);
		rect(100,220,700,-60);
		PFont xy;
		xy=loadFont("OpenSans-Regular.ttf");
		textFont(xy,20);
		fill(255,255,255);
		text("r="+rm*1e-3,100,100);
		text("x = "+r.x*1e-3+", y = "+r.y*1e-3,100,200);
	}
	
	void draw()
	{
		rm=r.mag(); // Cal r first before drawing
		if(rm>=6370e3) //If hit ground then stop.
		{
			calr();	
			calv();
			cala();
		}
		drawellipse();	
		printxy();		
	}