void setup()
{
size(500,500);
}

void draw()
{
	PFont xy;
		fill(200,200,200);
		noStroke();
		rect(250,250+10,50,-30);
		xy=loadFont("OpenSans-Regular.ttf");
		textFont(xy,20);
		fill(255,255,255);
		text("word",250,250);
}