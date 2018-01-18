function Bonus(x,y,config,type,game)
{
	Sprite.call(this,config,game);
	this.type = type;
	this.config = config;
	this.x = x;
	this.y = y;
	this.pdv = 1;
}

// Important Inheritance Stuff
Bonus.prototype = Object.create(Sprite.prototype); 
Bonus.prototype.constructor = Bonus; 

Bonus.prototype.move = function(i,game){
	if(this.pdv)
	{
		this.currentAnim = this.config.anims[this.type];
		this.x -= 5;
	}
	

	if(!this.pdv)
	{
		game.bonusToDel.push(i);
	}
}