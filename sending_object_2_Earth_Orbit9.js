	PVector r,v,G,a,ar,r;//ar = acelreration of rocket
	var width=1000;
	var height=600;
	float t=0;
	float dt=30;
	float rm;
	float h;// height from ground
	int b=0,k=1,c=2;//counter
	var x=new Array(1);
	var y=new Array(1);
	PImage pic,earth,iss;
	
	void setup()
	{
		size(width,height);
		r=new PVector(6370e3,0);
		v=new PVector(0,0);
		a=new PVector(0,0);
		G=new PVector();
		ar=new PVector(11,0);
		
		pic=loadImage("maxresdefault.jpg");
		earth=loadImage("earth.png");
		iss=loadImage("iss.png");
		
		heightText = document.getElementById("h");
		
		startButton = document.getElementById("start");
		pauseButton = document.getElementById("pause");
		resetButton = document.getElementById("reset");
		startButton.addEventListener("click",start);
		pauseButton.addEventListener("click",pause);
		resetButton.addEventListener("click",reset);
		
		//noLoop();
	}
	
	void start()
	{
		h = parseFloat(heightText.value) || 3000;
		h=h*1e3;
		c=1;
	}
	
	void pause()
	{
		c=2;
	}
	
	void reset()
	{
		c=2;
		k=1;
		t=0;
		b=0;
		r.set(6370e3,0);
		v.set(0,0);
		a.set(0,0);
		ar.set(11,0);
		calv();
		calr();
		drawbackground();
		drawearth();
		drawobject();
		
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
		ar.set(0,0);
	}
	
	void drawearth()
	{
		fill(0,0,255);
		stroke(0,0,0);
		ellipse(5e-6*0+width/2,5e-6*0+height/2,5e-6*6370e3*2,5e-6*6370e3*2);
		image(earth,5e-6*0+width/2-5e-6*6370e3,5e-6*0+height/2-5e-6*6370e3,5e-6*6370e3*2,5e-6*6370e3*2);
	}
	
	void drawtrajectory()
	{
		noStroke();
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
		image(iss,5e-6*r.x+width/2-20,5e-6*r.y+height/2-20,40,40);
	}
	
	void printdata()
	{
		fill(200,200,200);
		stroke();
		rect(40,56,220,-30);//fill background to erase the previous.
		rect(40,106,220,-30);
		rect(40,156,220,-30);
		PFont xy;
		xy=loadFont("OpenSans-Regular.ttf");
		textFont(xy,20);
		fill(0,0,0);
		text("Height = "+floor(r.mag()*1e-3-6370)+" km",50,50);//fill r
		text("Velocity = "+floor(v.mag()*18/5)+" km/h",50,100);//fill v
		text("Time = "+floor(t/3600)+" hours",50,150);//fill v
	}
	
	void drawbackground()
	{
		image(pic,0,0);
	}
	
	void draw()
	{
		drawbackground()
		rm=r.mag(); // Cal r first before drawing
		if(rm>=6370e3&&c==1) //If hit ground then stop.
		{
			if(rm>=(6730e3+h)&&k==1)
			{
					speedup();
					k++;
			}
			cala();
			calv();
			calr();	
			t=t+dt;
			b++;
		}
		drawtrajectory();
		drawearth();
		drawobject();	
		printdata();
		
	}