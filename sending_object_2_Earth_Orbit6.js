	PVector r,v,G,a,ar;//ar = acelreration of rocket
	var width=1000;
	var height=600;
	float t=0;
	float dt=10;
	float rm;
	float h=2e7;// height from ground
	int b=0,k;//counter
	var x=new Array(1);
	var y=new Array(1);
	
	void setup()
	{
		size(width,height);
		background(200,200,200);
		r=new PVector(6370e3,0);
		v=new PVector(0,0);
		a=new PVector();
		G=new PVector();
		ar=new PVector(11,0);
	}
	
	void calv()
	{
		v=PVector.add(v,PVector.mult(a,dt));
	}
	
	void calr()
	{
		r=PVector.add(r,PVector.mult(v,dt));
		rm=r.mag();
		x[b]=r.x;
		y[b]=r.y;
	}
	
	void cala()
	{
		G=r.get();
		G.normalize();
		G=PVector.div(G,-1*rm*rm);
		G=PVector.mult(G,3.986e14);
		a=PVector.add(G,ar);
	}
	
	void speedup()
	{
		v=r.get();
		v.normalize();
		v.set(-v.y,v.x);//rotate r 90 deg for get v perpendicular to r
		v=PVector.mult(v,sqrt(3.986e14/rm));
	}
	
	void drawearth()
	{
		fill(0,0,255);
		stroke(0,0,0);
		ellipse(5e-6*0+width/2,5e-6*0+height/2,5e-6*6370e3*2,5e-6*6370e3*2);
	}
	
	void drawtrajectory()
	{
		noStroke(0,0,0);
		fill(255,0,0);
		for (i=0;i<=b;i++)
		{
			ellipse(5e-6*x[i]+width/2,5e-6*y[i]+height/2,2,2);
		}
	}
	
	void drawobject()
	{
		stroke(0,0,0);
		fill(0,255,0);
		ellipse(5e-6*r.x+width/2,5e-6*r.y+height/2,10,10);
	}
	
	void printxy()
	{
		fill(200,200,200);
		stroke();
		rect(40,56,140,-30);//fill background to erase the previous.
		rect(40,106,140,-30);
		PFont xy;
		xy=loadFont("OpenSans-Regular.ttf");
		textFont(xy,20);
		fill(255,255,255);
		text("r = "+floor(rm*1e-3)+" km",50,50);//fill r
		text("v = "+floor(v.mag())+" m/s",50,100);//fill v
	}
	
	void draw()
	{
		background(200,200,200);
		rm=r.mag(); // Cal r first before drawing
		if(rm>=6370e3) //If hit ground then stop.
		{
			if(rm>=(6730e3+h)&&k==1)
			{
					speedup();
					k++;
			}
			calr();	
			calv();
			cala();
		}
		drawtrajectory();
		drawearth();
		drawobject();	
		printxy();
		b++;
	}