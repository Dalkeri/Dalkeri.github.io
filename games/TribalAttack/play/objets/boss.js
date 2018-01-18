function Boss(x,y,configs,path,game)
{
	
	this.lastShoot = [Date.now(),Date.now(),Date.now()];
	this.shootTimer = [500,1000,1500];

	this.lastHit = 0;
	
	this.configs = configs;
	this.x = x;
	this.oriX = x - game.canvasWidth;
	this.y = y;
	this.oriY = y;
	this.pdv1 = 50;
	this.pdv1Total = 50;
	this.pdv2 = 40;
	this.pdv2Total = 40;
	this.pdv3 = 25;
	this.pdv3Total = 25;
	this.path = path;
	this.splineIndex = 0;
	this.lastHit = Date.now();

}
// move draw tir

Boss.prototype.dessiner = function(context, game){

	for(var i=0; i < this.configs.length ; i++)
	{
		if(i==0 && (Date.now() - this.lastHit < game.dureeFeedbackEnemy))
			context.globalAlpha = 0.7;
		this.configs[i].draw(context,game);

		context.globalAlpha = 1;

	}
}



Boss.prototype.move = function(game){
		// console.log(this.configs)
		// console.log("AH QUE COUCOU ", this.splineIndex, this.path[this.splineIndex])
	if(this.pdv1 <= this.pdv1Total/2 || this.pdv2 <= this.pdv2Total/2)				
		// game.configEnemy[this.IDConfig].anims[1];
	{
		this.configs[0].currentAnim = game.configBossStockage[0].anims[1];
	}
	// console.log(this.configs)

	if(this.pdv1 <= 0) //ON DETRUIT LA PARTIE 1
	{
		for(var i = 0; i< this.configs.length; i++) // quand la partie 1 n'a plus de vie
		{
			this.configs[i].x += 5; // on le sort de l'écran
			if(this.configs[0].x > game.canvasWidth)// quand on le vois plus, on le splice
			{
				this.configs.splice(0,1);
				game.configBoss.splice(0,1);
				this.lastShoot.splice(0,1);
				this.shootTimer.splice(0,1);
				this.pdv1 = "partie1Down";
			}
		}
		// console.log(" lollllllllllllllllllllllllll", this.configs)
		// console.log("on est la")
		// console.log(this.path)
		this.path = interpolation([ [800,-400], [800,-350], [800,-300], [800,-200], [800,-100], [800,-50], [800,50], [800,175], [750,250], [700,350], [750,400], [800,400], [850,400], [850,400], [850,400], [850,400], [850,400]]);
		// this.pdv = 10;
		this.splineIndex = 0;
		// console.log(this.pdv1)
		// console.log((this.path))
	}
	else if(this.pdv2 <= 0) // ON DETRUIT LA PARTIE 2
	{
		for(var i = 0; i< this.configs.length; i++) // quand la partie sur laquelle on tire n'a plus de vie
		{
			this.configs[i].x += 5; // on le sort de l'écran
			if(this.configs[0].x > game.canvasWidth)// quand on le vois plus, on le splice
			{
				this.configs.splice(0,1);
				game.configBoss.splice(0,1);
				this.lastShoot.splice(0,1);
				this.shootTimer.splice(0,1);				
				this.pdv2 = "partie2Down";
				// console.log("on a splice")
			}
				

		}
		
		// console.log("destroy PART 2")
		// console.log(this.path)
		this.shootTimer[0] = 1500;
		this.path = interpolation([[800,1168], [800,1118], [800,1068], [800,968], [800,868], [800,818], [800,718], [800,593], [750,518], [700,418], [750,318], [800,318], [850,318], [900,318], [930,318], [930,318], [930,318]]);
		// this.pdv = 10;
		this.splineIndex = 0;
		// console.log(this.pdv2)
		// console.log("PATHS ",this.path)
	//	console.log("couugdkoscvkfkodlsfv", this.configs)
	}
	else if(this.pdv3 <= 0) // ON DETRUIT LA PARTIE 3
	{
		for(var i = 0; i< this.configs.length; i++) // quand la partie sur laquelle on tire n'a plus de vie
		{
			this.configs[i].x += 5; // on le sort de l'écran
			if(this.configs[0].x > game.canvasWidth)// quand on le vois plus, on le splice
			{
				console.log("JEU FINI");
				save(game);
				game.gameState = "jeuFini";			// GAMESTATE JEU FINI + lancer save dedans
			}
		}
	}
	// ON NE DETRUIT RIEN
	else if(this.path[this.splineIndex]) // premier spline
	{
		// console.log("coucoucoucocucoucoucouc")
		var newX = this.path[this.splineIndex][0] + this.oriX;
		var newY = this.path[this.splineIndex][1] + this.oriY;
	//		console.log(newX, newY);
		this.splineIndex += 2; 
	
//	console.log(this.configs.length)
		if(this.configs.length == 3)
		{
			this.configs[2].x = newX;
			this.configs[2].y = newY;	
			this.configs[1].x = newX + 46;
			this.configs[1].y = newY + 47;		
			this.configs[0].x = newX + 141;
			this.configs[0].y = newY - 208;					
		}

		if(this.configs.length == 2)
		{
			this.configs[1].x = newX;
			this.configs[1].y = newY;
			this.configs[0].x = newX + 46;
			this.configs[0].y = newY + 47;
		}

		if(this.configs.length == 1)
		{
			this.configs[0].x = newX;
			this.configs[0].y = newY;
		}

	}


}

Boss.prototype.shoot = function(game){

	for(var i = 0; i<game.boss.configs.length; i++)
	{
		if(Date.now() - this.lastShoot[i] > this.shootTimer[i])
		{
			//ou leurre si il y a 
			if(game.boss.configs.length == 3 && Date.now() - this.lastShoot[i] > this.shootTimer[i])
			{
				if(i == 0)
				{
					if(game.spacecraftFeature.pdv > 0)
						var vecteur = CalculVector(this.configs[0].x, this.configs[0].y + 155 , game.spacecraftFeature.x + game.spacecraftFeature.frameWidth/2,  game.spacecraftFeature.y + game.spacecraftFeature.frameHeight/2);
					else
						var vecteur = CalculVector(this.configs[0].x, this.configs[0].y + 155 , game.spacecraft.x + game.spacecraft.frameWidth/2, game.spacecraft.y + game.spacecraft.frameHeight/2);
					
					var bullet = new Bullet(game.bossBullet1Config ,game,this.configs[0].x - game.enemy1Bullet.frameWidth, this.configs[0].y + 155 ,"bulletBossPart1", 0, vecteur);
					game.tableauBullet.push(bullet);	
					this.lastShoot[i] = Date.now();			
				}
				else if(i == 1)
				{
					if(game.spacecraftFeature.pdv > 0)
						var vecteur = CalculVector(this.configs[1].x+153,this.configs[1].y + 75 , game.spacecraftFeature.x + game.spacecraftFeature.frameWidth/2,  game.spacecraftFeature.y + game.spacecraftFeature.frameHeight/2);
					else
						var vecteur = CalculVector(this.configs[1].x+153,this.configs[1].y + 75 , game.spacecraft.x + game.spacecraft.frameWidth/2, game.spacecraft.y + game.spacecraft.frameHeight/2);
					
					var bullet = new Bullet(game.bossBullet1Config ,game,this.configs[1].x+153 - game.enemy1Bullet.frameWidth, this.configs[1].y + 75  ,"bulletBossPart2", 0, vecteur);
					game.tableauBullet.push(bullet);	
					this.lastShoot[i] = Date.now();	
				}
				else if(i == 2)
				{
					if(game.spacecraftFeature.pdv > 0)
						var vecteur = CalculVector(this.configs[2].x+10,this.configs[2].y + 101 , game.spacecraftFeature.x + game.spacecraftFeature.frameWidth/2,  game.spacecraftFeature.y + game.spacecraftFeature.frameHeight/2);
					else
						var vecteur = CalculVector(this.configs[2].x+10,this.configs[2].y + 101 , game.spacecraft.x + game.spacecraft.frameWidth/2, game.spacecraft.y + game.spacecraft.frameHeight/2);
				
					var bullet = new Bullet(game.bossBullet2Config ,game, this.configs[2].x+10 - game.enemy1Bullet.frameWidth, this.configs[2].y + 101 ,"bulletBossPart3", 0, vecteur);
					game.tableauBullet.push(bullet);	
					this.lastShoot[i] = Date.now();	
				}
			}
			
			if(game.boss.configs.length == 2 && Date.now() - this.lastShoot[i] > this.shootTimer[i])
			{
				if(i == 0)
				{
					this.shootTimer[0] = (this.shootTimer[0] >= 400)? this.shootTimer[0] - 50 : this.shootTimer[0];
					
					if(game.spacecraftFeature.pdv > 0)
						var vecteur = CalculVector(this.configs[0].x+153,this.configs[0].y + 75 , game.spacecraftFeature.x + game.spacecraftFeature.frameWidth/2,  game.spacecraftFeature.y + game.spacecraftFeature.frameHeight/2);
					else
						var vecteur = CalculVector(this.configs[0].x+153,this.configs[0].y + 75 , game.spacecraft.x + game.spacecraft.frameWidth/2, game.spacecraft.y + game.spacecraft.frameHeight/2);
					
					var bullet = new Bullet(game.bossBullet1Config ,game,this.configs[0].x+153 - game.enemy1Bullet.frameWidth, this.configs[0].y + 75  ,"bulletBossPart2", 0, vecteur);				
					game.tableauBullet.push(bullet);	
					this.lastShoot[i] = Date.now();			
				}
				else if(i == 1)
				{
					this.shootTimer[1] = (this.shootTimer[1] >=400)? this.shootTimer[1] - 50 : this.shootTimer[1];
					
					if(game.spacecraftFeature.pdv > 0)
						var vecteur = CalculVector(this.configs[1].x+10,this.configs[1].y + 101 , game.spacecraftFeature.x + game.spacecraftFeature.frameWidth/2,  game.spacecraftFeature.y + game.spacecraftFeature.frameHeight/2);
					else
						var vecteur = CalculVector(this.configs[1].x+10,this.configs[1].y + 101 , game.spacecraft.x + game.spacecraft.frameWidth/2, game.spacecraft.y + game.spacecraft.frameHeight/2);
					
					var bullet = new Bullet(game.bossBullet2Config ,game, this.configs[1].x+10 - game.enemy1Bullet.frameWidth, this.configs[1].y + 101 ,"bulletBossPart3", 0, vecteur);
					game.tableauBullet.push(bullet);	
					this.lastShoot[i] = Date.now();				
				}
			}

			if(game.boss.configs.length == 1 && Date.now() - this.lastShoot[i] > this.shootTimer[i])
			{	
				this.shootTimer[0] = (this.shootTimer[0] >= 1200)? this.shootTimer[0] - 50 : this.shootTimer[0];
				
				if(game.spacecraftFeature.pdv > 0)
					var vecteur = CalculVector(this.configs[0].x+153,this.configs[0].y + 75 , game.spacecraftFeature.x + game.spacecraftFeature.frameWidth/2,  game.spacecraftFeature.y + game.spacecraftFeature.frameHeight/2);
				else
					var vecteur = CalculVector(this.configs[0].x+153,this.configs[0].y + 75 , game.spacecraft.x + game.spacecraft.frameWidth/2, game.spacecraft.y + game.spacecraft.frameHeight/2);
				
				var bullet = new Bullet(game.bossBullet2Config ,game,this.configs[0].x+153 - game.enemy1Bullet.frameWidth, this.configs[0].y + 75  ,"bulletBossPart3", 0, vecteur);				
				game.tableauBullet.push(bullet);	
				this.lastShoot[i] = Date.now();						

			}
		
		
		}
	}




}

//objetA = partie du boss objetB = bullet
Boss.prototype.collision = function(objetA, hitboxA, objetB, hitboxB, game){
	// console.log("HITBOXA",hitboxA)
	// console.log(checkCollision(objetA, hitboxA, objetB, hitboxB));

	if(checkCollision(objetA, hitboxA, objetB, hitboxB))
	{
		// console.log("checked", this.pdv)
		if(objetB.config.code == "spacecraft_Bomb")
		{	
			// console.log(" YOUHOU JE SUIS LA ",objetB);
			objetB.isAlive = 0;
		}
		else
			objetB.pdv --;
		if( objetA == game.boss.configs[0])
		{	
			// console.log("TROLOLOL")
			if(game.boss.configs.length == 3)
			{
				if(objetB.name == "bombSpacecraft" && objetB.isAlive)
					this.pdv1 -= 5;
				else
					this.pdv1 --;
			}
			else if(game.boss.configs.length == 2)
			{
				if(objetB.name == "bombSpacecraft" && objetB.isAlive)
					this.pdv2 -= 5;
				else
					this.pdv2 --;
			}
			else if(game.boss.configs.length == 1)
			{
				if(objetB.name == "bombSpacecraft" && objetB.isAlive)
					this.pdv3 -= 5;
				else
					this.pdv3 --;
			}
		
			// console.log("checked", this.pdv)

			// objetB.pdv --;

			// if(this.configs.length == 3) // on s'occupe en premier de la partie 1
			// {
			this.lastHit = Date.now();
		}
		// else
		// {
		// 	console.log("lalalalala")
		// 	objetB.pdv --;
		// }

		
	}
}

