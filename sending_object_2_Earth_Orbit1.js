	PVector r,v,a;
	float t=1;
	float dt=0.1;
	float rm;
	void setup()
	{
		size(500,500);
		r=new PVector(20,20);
		v=new PVector(0,3);
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
		a=PVector.mult(a,400);
	}
	
	void draw()
	{
		calv();
		calr();		
		cala();
		ellipse(r.x,r.y,2,2);
	}