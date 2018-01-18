function Feature(config,game)
{
	Sprite.call(this,config,game);

	this.pdv = 20;
	this.config = config;
	this.x = game.spacecraft.x;
	this.y = game.spacecraft.y;
} 

// Important Inheritance Stuff
Feature.prototype = Object.create(Sprite.prototype); 
Feature.prototype.constructor = Feature; 