function Enemy_2(x,y,config,path,game)
{
	Sprite.call(this,config,game);
	
	this.IDConfig = 1; // permet, lors de la boucle for, de savoir dans qu'elle case du tableau de config d'enemy il faut prendre la config
	this.x = x;
	this.oriX = x - game.canvasWidth;
	this.y = y;
	this.oriY = y;
	this.cpt = 0;
	this.pdv = 4;
	this.path = path;
//	console.log(path);
	this.splineIndex = 0;
	this.lastHit = Date.now();
}

// Important Inheritance Stuff
Enemy_2.prototype = Object.create(Sprite.prototype); 
Enemy_2.prototype.constructor = Enemy_2; 

Enemy_2.prototype.move = function(i,game){ 
	if(this.pdv == 0) // plus de pv
	{
		game.score += 300;
		this.currentFrame = 0;  // on affiche forcement la premiere frame
		this.currentAnim =  game.configEnemy[this.IDConfig].anims[1];
		this.pdv --;
	}
	if(this.pdv <= -1) // puis on joue l'anim
	{
		this.x -= 0.5;
		this.currentAnim =  game.configEnemy[this.IDConfig].anims[1];
		if(this.currentFrame == this.currentAnim.nbFrame -1)// on arrive sur la derniere frame de l'anim
		{
			var random2 = parseInt(Math.random() * 4);
			var bonus = new Bonus(this.x + this.frameWidth/2 - game.bonus.frameWidth/2, this.y, game.configBonus,random2,game);    // reduire chance d'avoir bonus sauf au bout d'un moment
			game.tableauBonus.push(bonus);				
			
			game.enemyToDel.push(i);
		}
	}
	else if(this.pdv > 0)
	{

		if(this.path[this.splineIndex])
		{
			this.x = this.path[this.splineIndex][0] + this.oriX;
			this.y = this.path[this.splineIndex][1] + this.oriY;
			this.splineIndex += 2; 
		}
	}

}//fin du move

Enemy_2.prototype.shoot = function(game){} // évite de faire une vérification dans le main pour savoir si l'enemy peut tirer ou pas