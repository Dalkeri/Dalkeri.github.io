function Enemy_3(x,y,config,path,game)
{
	Sprite.call(this,config,game);
	
	this.lastShoot = Date.now();
	this.shootTimer = 1500;

	this.IDConfig = 2; // permet, lors de la boucle for, de savoir dans qu'elle case du tableau de config d'enemy il faut prendre la config
	this.x = x;
	this.oriX = x - game.canvasWidth;
	this.y = y;
	this.oriY = y;
	// this.cpt = 0;
	this.pdv = 8;
	this.path = path;
	this.splineIndex = 0;
	this.lastHit = 0;

}

// Important Inheritance Stuff
Enemy_3.prototype = Object.create(Sprite.prototype); 
Enemy_3.prototype.constructor = Enemy_3; 

Enemy_3.prototype.move = function(i,game){
	if(this.pdv == 4) // l'ennemy est blesse
	{
		this.currentFrame = 0;  
		this.currentAnim =  game.configEnemy[this.IDConfig].anims[1];
		this.pdv --;

		if(this.path[this.splineIndex]) // on continue le path
		{
			var newX = this.path[this.splineIndex][0] + this.oriX;
			var newY = this.path[this.splineIndex][1] + this.oriY;
			this.x = newX;
			this.y = newY;
			this.splineIndex += 2; 
		}

	}
	if(this.pdv < 4 && this.pdv > 0) // puis on joue l'anim de l'enemy blesse
	{
		this.currentAnim =  game.configEnemy[this.IDConfig].anims[1];
		// this.isDestroy ++;	

		if(this.path[this.splineIndex]) // on continue le path
		{
			var newX = this.path[this.splineIndex][0] + this.oriX;
			var newY = this.path[this.splineIndex][1] + this.oriY;
	//		console.log(newX, newY);
			this.x = newX;
			this.y = newY;
			this.splineIndex += 2; 
		}

	}
	if(this.pdv == 0) // l'enemy va etre detruit
	{
		game.score += 500;
		this.currentFrame = 0;
		this.currentAnim = game.configEnemy[this.IDConfig].anims[2];
		this.pdv --;
	}
	if(this.pdv <= -1) // on lance l'animation de destruction
	{
		this.x -= 5;
		this.currentAnim =  game.configEnemy[this.IDConfig].anims[2];
		if(this.currentFrame == this.currentAnim.nbFrame -1)
		{
			game.enemyToDel.push(i);
		}
	}

	else if(this.pdv > 4) // l'enemy n'est pas encore blesse
	{
		// add variable pour check si on est à la fin de path ou pas puis delete
		if(this.path[this.splineIndex])
		{
			var newX = this.path[this.splineIndex][0] + this.oriX;
			var newY = this.path[this.splineIndex][1] + this.oriY;
	//		console.log(newX, newY);
			this.x = newX;
			this.y = newY;
			this.splineIndex += 2; 
		}
	}

}

Enemy_3.prototype.shoot = function(game){

	if(Date.now() - this.lastShoot > this.shootTimer && this.pdv)
	{
		//ou leurre si il y a 
		if(game.spacecraftFeature.pdv > 0)
			var vecteur = CalculVector(this.x - game.enemy3Bullet.frameWidth,this.y + 37, game.spacecraftFeature.x + game.spacecraftFeature.frameWidth/2, game.spacecraftFeature.y + game.spacecraftFeature.frameHeight/2);
		else
			var vecteur = CalculVector(this.x - game.enemy3Bullet.frameWidth,this.y + 37, game.spacecraft.x + game.spacecraft.frameWidth/2, game.spacecraft.y + game.spacecraft.frameHeight/2);
		
		var bullet = new Bullet(game.enemy3BulletConfig ,game,this.x - game.enemy3Bullet.frameWidth, this.y + 37 ,"bulletEnemy3", 0, vecteur);
		game.tableauBullet.push(bullet);	
		this.lastShoot = Date.now();
	}

}  