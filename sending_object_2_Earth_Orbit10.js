	PVector r,v,G,a,ar,r;//ar = acelreration of rocket
	var width=1000;
	var height=600;
	float t=0;
	float dt=30;
	float rm,vm,r1;
	float h;// height from ground
	int b=0,k=1,c=2;//counter
	var col=new Array(4);
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
		
		col[0]=0;
		col[1]=0;
		col[2]=0;
		col[3]=0;
		
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
		vm=v.mag();//instant calculation to boost the speed up.
		v=r.get();
		v.normalize();
		v.set(-v.y,v.x);//rotate r 90 deg for get v perpendicular to r
		if(k==1)
		{
			v=PVector.mult(v,sqrt(3.986e14/rm));
		}
		else if(k==2)
		{
			v=PVector.mult(v,vm*sqrt(2*(h+6370e3)/(rm+h+6370e3)));
		}
		else if(k==3)
		{
			v=PVector.mult(v,vm*sqrt((r1+rm)/(2*r1)));
		}
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
		if(k==1)
		{
			col[0]=b;	
		}
		else if(k==2)
		{
			col[1]=b;
		}
		else if(k==3)
		{
			col[2]=b;
		}
		else if(k==4)
		{
			col[3]=b;
		}
		for (i=0;i<=col[0];i++)
		{
			if(k>=1)
			{
				fill(255,0,0);
				ellipse(5e-6*x[i]+width/2,5e-6*y[i]+height/2,2,2);
			}
			
		}
		for (i=col[0];i<=col[1];i++)
		{
			if(k>=2)
			{
				fill(0,255,0);
				ellipse(5e-6*x[i]+width/2,5e-6*y[i]+height/2,2,2);
			}
			
		}
		for (i=col[1];i<=col[2];i++)
		{
			if(k>=3)
			{
				fill(0,0,255)
				ellipse(5e-6*x[i]+width/2,5e-6*y[i]+height/2,2,2);
			}
			
		}
		for (i=col[2];i<=b;i++)
		{
			if(k>=4)
			{
				fill(255,255,0)
				ellipse(5e-6*x[i]+width/2,5e-6*y[i]+height/2,2,2);
			}
			
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
			if(rm>=(6730e3+500e3)&&k==1)
			{
				r1=rm;
				speedup();
				k++;
				
			}
			else if(k==2&&r.y<=0)
			{
				speedup();
				k++;
			}
			else if(k==3&&r.y>=0)
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