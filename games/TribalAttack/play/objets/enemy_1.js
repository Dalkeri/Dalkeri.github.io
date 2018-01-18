function Enemy_1(x,y,config,path,game)
{
	Sprite.call(this,config,game);
	
	this.lastShoot = Date.now();
	this.shootTimer = 1000;

	this.IDConfig = 0; // permet, lors de la boucle for, de savoir dans qu'elle case du tableau de config d'enemy il faut prendre la config
	this.x = x;
	this.oriX = x - game.canvasWidth;
	this.y = y;
	this.oriY = y;
	this.cpt = 0;
	this.pdv = 1;
	this.path = path;
	this.splineIndex = 0;
	this.lastHit = 0;

}

// Important Inheritance Stuff
Enemy_1.prototype = Object.create(Sprite.prototype); 
Enemy_1.prototype.constructor = Enemy_1; 

Enemy_1.prototype.move = function(i,game){ 

	if(this.pdv == 0) // l'enemy va êre détruit
	{
		game.score += 100;
		this.currentFrame = 0;  // on affiche forcement la premiere frame
		this.currentAnim =  game.configEnemy[this.IDConfig].anims[1];
		this.pdv --;
	}
	if(this.pdv <= -1) // puis on joue l'anim
	{
		this.x -= 0.5;
		this.currentAnim =  game.configEnemy[this.IDConfig].anims[1];

		if(this.currentFrame == game.configEnemy[this.IDConfig].nbFrameMax -1)
		{
			game.enemyToDel.push(i);
		}
			
	}
	else if(this.pdv > 0 )
	{
		// add variable pour check si on est à la fin de path ou pas puis delete
		if(this.path[this.splineIndex])
		{
			this.x = this.path[this.splineIndex][0] + this.oriX;
			this.y = this.path[this.splineIndex][1] + this.oriY;
			this.splineIndex += 2; 
		}
	}

}//fin du move

Enemy_1.prototype.shoot = function(game){

	if(Date.now() - this.lastShoot > this.shootTimer && this.pdv)
	{
		if(game.spacecraftFeature.pdv > 0)
			var vecteur = CalculVector(this.x - game.enemy1Bullet.frameWidth,this.y + 37 , game.spacecraftFeature.x + game.spacecraftFeature.frameWidth/2, game.spacecraftFeature.y + game.spacecraftFeature.frameHeight/2);
		else
			var vecteur = CalculVector(this.x - game.enemy1Bullet.frameWidth,this.y + 37 , game.spacecraft.x + game.spacecraft.frameWidth/2, game.spacecraft.y + game.spacecraft.frameHeight/2);

		var bullet = new Bullet(game.enemy1BulletConfig ,game,this.x - game.enemy1Bullet.frameWidth, this.y + 37 ,"bulletEnemy1", 0, vecteur);
		game.tableauBullet.push(bullet);	
		this.lastShoot = Date.now();
	
	}

}