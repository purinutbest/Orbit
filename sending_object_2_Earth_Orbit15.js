	PVector r,v,G,a,ar,r;//ar = acelreration of rocket
	
	var m=new Array(4);//part of mass of rocket
	m[0]=3e3;//satellite mass
	m[1]=2e5;//mass of stage 3
	m[2]=3e5;//mass of stage 2
	m[3]=7e5;//mass of stage 1
	float tm,m3,m2,m1;//total mass
	
	var width=1000;//width of canvas
	var height=600;// height of canvas
	float t=0;// time
	float dt=30;// time step
	float rm,vm,r1,v1;//magnetude of radius, velocity, r1 for calculated trust factor, v1 for calculated mass of fuel
	float h;// height from ground
	int b=0,k=1,c=2,d=1;//counter
	var col=new Array(4);//counter to draw steps of trajectory
	var x=new Array(1);//array to save r.x value
	var y=new Array(1);//array to save r.y value
	PImage  pic,earth,iss;//declare picture variable
	
	void setup()
	{
		size(width,height);
		r=new PVector(6370e3,0);//set up position vector
		v=new PVector(0,0);//set up velocity vector
		a=new PVector(0,0);//set up accelreration vector
		G=new PVector();//set up gravitaty vector
		ar=new PVector(11,0);//set up rocket's accelreration
		
		pic=loadImage("maxresdefault.jpg");//load background picture
		earth=loadImage("earth.png");//load earth picture
		iss=loadImage("iss.png");//load iss picture
		
		heightText = document.getElementById("h");//link text height with index.html
		
		startButton = document.getElementById("start");//link button with index.html
		pauseButton = document.getElementById("pause");
		resetButton = document.getElementById("reset");
		changeorbitButton = document.getElementById("changeorbit");
		startButton.addEventListener("click",start);//get click event from index.html
		pauseButton.addEventListener("click",pause);
		resetButton.addEventListener("click",reset);
		changeorbitButton.addEventListener("click",changeorbit);
		
		tm=m[0]+m[1]+m[2]+m[3];//set up initial mass
		m1=m[1];
		m2=m[2];
		m3=m[3];
	}
	
	void start()// when click start button
	{
		h = parseFloat(heightText.value) || 3000;//get h value from input
		h=h*1e3;
		c=1;
	}
	
	void pause()// when click pause button
	{
		c=2;
	}
	
	void reset()//when click reset button, re set up value
	{
		c=2;
		k=1;
		t=0;
		b=0;
		d=1;
		
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
		
		tm=m1+m2+m3;
		m[1]=m1;
		m[2]=m2;
		m[3]=m3;
	}
	
	void changeorbit()// when click change orbit button
	{
		k=2;
		d=1;
		h = parseFloat(heightText.value) || 3000;
		h=h*1e3;
	}
	
	void calm()//calculation of mass
	{
		if(k==1&&m[3]>=0)
		{
			m[3]=m[3]-(666.5)*dt;// is Effective exhaust velocity of liquid oxygen and hydrogen, 666.5 is constant acelreration of rocket
		}
		else if(k==2&&d==1&&(m[2]-abs(v1-vm)/dt)>=0)
		{
			m[2]=m[2]-666.5*abs(v1-vm)/dt;
			d++;
		}
		else if(k==3&&d==2&&(m[2]-abs(v1-vm)/dt)>=0)
		{
			m[1]=m[1]-666.5*abs(v1-vm)/dt;
			d++;
		}
		else if(k==4&&d==3&&(m[1]-abs(v1-vm)/dt)>=0)
		{
			m[1]=m[1]-666.5*abs(v1-vm)/dt;
			d++;
		}
		else if ((m[2]-abs(v1-vm)/dt)<=0||(m[1]-abs(v1-vm)/dt)<=0)
		{
			alert();
		}
		tm=m[0]+m[1]+m[2]+m[3];
	}
	
	void calv()//calculation of velocity
	{
		v=PVector.add(v,PVector.mult(a,dt));
	}
	
	void calr()//calculation of radius
	{
		r=PVector.add(r,PVector.mult(v,dt));
		rm=r.mag();//to keep magnetude of radius in rm variable
		x[b]=r.x;//to save r.x 
		y[b]=r.y;//to save r.y
	}
	
	void cala()//calculation of acelreration
	{
		G=r.get();
		G.normalize();
		G=PVector.div(G,-1*rm*rm);
		G=PVector.mult(G,3.986e14);
		a=PVector.add(G,ar);
	}
	
	void speedup()//boost speed up to change orbit
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
		v1=v.mag();
		ar.set(0,0);
	}
	
	
	void drawearth()//function to draw earth
	{
		fill(0,0,255);
		stroke(0,0,0);
		ellipse(5e-6*0+width/2,5e-6*0+height/2,5e-6*6370e3*2,5e-6*6370e3*2);
		image(earth,5e-6*0+width/2-5e-6*6370e3,5e-6*0+height/2-5e-6*6370e3,5e-6*6370e3*2,5e-6*6370e3*2);
	}
	
	void drawtrajectory()//function to draw trajectory
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
		for (i=0;i<=col[0];i++)//for trajectory in stage 1
		{
			if(k>=1)
			{
				fill(255,0,0);
				ellipse(5e-6*x[i]+width/2,5e-6*y[i]+height/2,2,2);
			}
			
		}
		for (i=col[0];i<=col[1];i++)//for trajectory in stage 2
		{
			if(k>=2)
			{
				fill(0,255,0);
				ellipse(5e-6*x[i]+width/2,5e-6*y[i]+height/2,2,2);
			}
			
		}
		for (i=col[1];i<=col[2];i++)//for trajectory in stage 3
		{
			if(k>=3)
			{
				fill(0,0,255)
				ellipse(5e-6*x[i]+width/2,5e-6*y[i]+height/2,2,2);
			}
			
		}
		for (i=col[2];i<=b;i++)//for trajectory in wanted orbit
		{
			if(k>=4)
			{
				fill(255,255,0)
				ellipse(5e-6*x[i]+width/2,5e-6*y[i]+height/2,2,2);
			}
			
		}
	}
	
	void drawobject()//function to draw satellite
	{
		stroke(0,0,0);
		fill(0,255,0);
		ellipse(5e-6*r.x+width/2,5e-6*r.y+height/2,10,10);
		image(iss,5e-6*r.x+width/2-20,5e-6*r.y+height/2-20,40,40);
	}
	
	void printdata()//function to shaw data on the canvas
	{
		fill(200,200,200);
		stroke();
		rect(40,56,220,-30);//fill background to erase the previous for Height.
		rect(40,106,220,-30);//fill background to erase the previous for Velocity.
		rect(40,156,220,-30);//fill background to erase the previous for Time.
		PFont xy;
		xy=loadFont("OpenSans-Regular.ttf");
		textFont(xy,20);
		fill(0,0,0);
		text("Height = "+floor(r.mag()*1e-3-6370)+" km",50,50);//fill height from earth surface data
		text("Velocity = "+floor(v.mag()*18/5)+" km/h",50,100);//fill velocity data
		text("Time = "+floor(t/3600)+" hours",50,150);//fill time data
	}
	
	void printmass()
	{
		var xt=50,yt=190;//fix position of tank
		noStroke();
		fill(200,200,200);//create background ract
		rect(xt+45,yt-13,110,30);
		rect(xt,yt+30,40,100);
		rect(xt+80,yt+30,40,100);
		rect(xt+160,yt+30,40,100);
		fill(0,255,0);
		rect(xt,yt+100+30,40,-m[3]*100/m3);// create fuel guage
		rect(xt+80,yt+100+30,40,-m[2]*100/m2);
		rect(xt+160,yt+100+30,40,-m[1]*100/m1);
		fueltank=loadFont("OpenSans-Regular.ttf");
		textFont(fueltank,20);
		fill(0,0,0);
		text("Fuel Guage",xt+50,yt+10);
		fill(255,255,0);
		text("1",xt+15,yt+150);
		text("2",xt+15+80,yt+150);
		text("3",xt+15+160,yt+150);
		
	}
	void drawbackground()//function to draw background
	{
		image(pic,0,0);
	}
	
	void alert()
	{
		c=3;
	}
	
	void draw()// loop to show motion in canvas
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
				r1=rm;
				k++;
			}
			cala();
			calv();// calculate velocity before radius by using simpletic euler
			calr();	
			calm();
			t=t+dt;//calculate time
			b++;//plus counter for keep r.x and r.y
		}
		if(c==3)
		{
			noStroke();
			fill(200,200,200);
			text("It's impossible to chage the orbit because of emthy fuel. Please click reset button.",40,500)
		}
		drawtrajectory();
		drawearth();
		drawobject();	
		printdata();
		printmass();
	}
