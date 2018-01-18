function Spacecraft(config,game)
{
	Sprite.call(this,config,game);
	this.config = config;
	this.speed = 8;
	this.game = game;

	this.lastShoot = Date.now();
	this.shootTimer = 250;

	this.pdv = 15;
	this.vieTotale = 15;
	this.isAlive = 1;

	this.x = 0;
	this.y = game.canvasHeight/2 - 24; 
} 


// Important Inheritance Stuff
Spacecraft.prototype = Object.create(Sprite.prototype); 
Spacecraft.prototype.constructor = Spacecraft; 


Spacecraft.prototype.move = function(game){
	if(this.pdv == 0) // le vaisseau est en train d'etre detruit
	{
		this.currentFrame = 0;  // on affiche forcement la premiere frame
		this.currentAnim =  this.config.anims[3];
		this.pdv --; 
	}
	if(this.pdv <= -1) // puis on joue l'anim de destruction
	{
		 this.currentAnim =  this.config.anims[3];
		 if(this.currentFrame == this.config.nbFrameMax -1)
		 	this.isAlive = 0;
	}

	if(this.pdv > 0) // si le vaisseau n'est pas détruit ( ou en train de l'être)
	{
		if(game.controls.left || game.controls.right || game.controls.up || game.controls.down)
		{
											
			if(game.controls.up && !game.controls.down)
			{

				if(this.y - this.speed >0)
				{
					this.y -= this.speed;
					this.currentAnim = this.config.anims[1];
					if(game.compteurSpacecraftH == 1) // pour le déplacement haut, on a 3 frames, si on appuie sur haut pendant la 4ieme frame de idle ( par exemple)
					{				  // on allais sur la quatrième frame de haut ( qui est vide ) et donc le vaisseau disparaissais 
						this.currentFrame = 0;
						game.compteurSpacecraftH ++;
					}
				}
					
			} 
			if(game.controls.left)
			{
				if(this.x - this.speed >0)
					this.x -= this.speed;
				
					
			}
			if(game.controls.right)
			{
				if(this.x + this.speed + this.frameWidth < game.canvasWidth)
					this.x += this.speed;
				
			}
			if(game.controls.down && !game.controls.up)
			{

					if(this.y + this.speed + this.frameHeight < game.canvasHeight)
					{
						if(this.currentFrame == 3)
							game.compteurSpacecraftB ++;
						if(game.compteurSpacecraftB == 1)
						{
							this.currentFrame = 0;
							game.compteurSpacecraftB ++;
						}
						if(game.compteurSpacecraftB >= 3 )
							this.currentFrame = 3;
							

						this.y += this.speed;
						this.currentAnim = this.config.anims[2];		
					}
					
			}
		}
		else if ( game.controls.up && game.controls.down)
		{
			this.currentAnim = this.config.anims[0];
		}
		else
			this.currentAnim = this.config.anims[0];		
	}

		game.spacecraft_Prop.move(game) // on lance le move du propulseur

}// fin du move



Spacecraft.prototype.shoot = function(game){
	// this.speed = 5;
	if(Date.now() - this.lastShoot > this.shootTimer)// permet de régler la vitesse de tir en fonction du temps
	{
		if(game.controls.fire == 1) //BULLET
		{
			var bullet = new Bullet(game.spacecraftBulletConfig ,game,this.x + this.frameWidth, this.y + (this.frameHeight/2),"bulletSpacecraft", 1,0);
			game.tableauBullet.push(bullet);
			// console.log(game.bonusTir, game.timerBonusTir)

			// if(game.bonusTir && (Date.now() - game.timerBonusTir < game.dureeBonusTir)) // si on a le bonus de tir, et que le temps n'est pas écoulé on tir 2 balles avec des angles differents
			// {
			// 	console.log("ici")
			// 	var bullet = new Bullet(game.spacecraftBulletConfig ,game,this.x + this.frameWidth, this.y + (this.frameHeight/2),"bulletSpacecraft", 1,{x:0.6,y:0.2});
			// 	game.tableauBullet.push(bullet);
			// 	var bullet = new Bullet(game.spacecraftBulletConfig ,game,this.x + this.frameWidth, this.y + (this.frameHeight/2),"bulletSpacecraft", 1,{x:0.6,y:-0.2});
			// 	game.tableauBullet.push(bullet);
			// }
			if(game.bonusTir && (Date.now() - game.timerBonusTir < game.dureeBonusTir))
			{
				this.shootTimer = 150;
			}
			else if (Date.now() - game.timerBonusTir > game.dureeBonusTir) 
			{
				game.bonusTir =0;
				this.shootTimer = 250;
			}
				 
			
			this.lastShoot = Date.now();
		}
		if(game.controls.fireBomb == 1 && (game.bonusBomb > 0)) //BOMB
		{
			// console.log(game.spacecraftBombConfig)
			var bullet = new Bullet(game.spacecraftBombConfig, game, this.x + this.frameWidth, this.y + (this.frameHeight/2) - game.spacecraftBomb.frameHeight/2,"bombSpacecraft", 1,0);
			game.tableauBullet.push(bullet);
			game.bonusBomb --;
			if(game.bonusBomb <0)
				game.bonusBomb =0;
			this.lastShoot = Date.now();
		}


	}

	
}


// GERE LES COLLISIONS AVEC LES ENEMY / BONUS
Spacecraft.prototype.collision = function(objetA, hitboxA, objetB, hitboxB, game){ 
	
		if(checkCollision(objetA, hitboxA, objetB, hitboxB))
		{
			// dès qu'on rentre dans un enemy, il est détruit 
			if(objetB.currentAnim.code == "idle" || objetB.currentAnim.code == "hit") 
			{
				objetB.pdv = 0;
				if(!game.bonusShield)
				{
					if(Date.now() - game.lastHitSpacecraft > game.dureeInvincibilite)
					{
						this.pdv --;
						game.lastHitSpacecraft = Date.now();
					}
				}
				else
				{
					game.spacecraft_Shield.pdv --;
				}
				
			}

			//si on a un bonus
			if(objetB.currentAnim.code == "bomb" ) //SWITCH
			{
				if(game.bonusBomb < 4)
					game.bonusBomb ++;

				// game.bonusBomb --;
				objetB.pdv --;
				game.sepia = 100;

			}
			if(objetB.currentAnim.code == "bullet")
			{
				game.bonusTir = 1 ;
				game.timerBonusTir = Date.now();
				objetB.pdv --;
			}
			if(objetB.currentAnim.code == "shield")
			{
				game.spacecraft_Shield = new Shield(game.spacecraft_ShieldConfig,game); // on créé le bouclier
				game.bonusShield = 1; 
				objetB.pdv --;
			}
			if(objetB.currentAnim.code == "feature")
			{
				game.bonusFeature = 1;
				objetB.pdv --;
			}
		}
}









function PropulseurSpacecraft(config,game)
{
	Sprite.call(this,config,game);
	this.config = config;
	// this.speed = 5;
	this.game = game;
	this.x = game.spacecraft.x - 5 ;
	this.y = game.spacecraft.y - 60;
}


// Important Inheritance Stuff
PropulseurSpacecraft.prototype = Object.create(Sprite.prototype); 
PropulseurSpacecraft.prototype.constructor = PropulseurSpacecraft; 

PropulseurSpacecraft.prototype.move = function(game){
	if(game.controls.right)
	{
		this.currentAnim = this.config.anims[1];
	}
	else if(game.controls.left)
	{
		this.currentAnim = this.config.anims[2];
	}
	else
		this.currentAnim = this.config.anims[0];


	this.x = game.spacecraft.x + 15;
	this.y = game.spacecraft.y - 40;
}