	PVector r,v,a;
	float t=0;
	float dt=10;
	float rm;
	void setup()
	{
		size(1000,1000);
		r=new PVector(42157000,0);
		v=new PVector(0,3074.919837);
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
	
	void draw()
	{
		calv();
		calr();		
		cala();
		ellipse(5e-6*r.x+500,5e-6*r.y+500,2,2);
		ellipse(500,500,2,2);
	}