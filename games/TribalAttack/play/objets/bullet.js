
function Bullet(config,game, x,y,name, sens,vect) // degat ? 
{
	// console.log(config)
	Sprite.call(this,config,game);
	this.name = name
	this.config = config;
	this.x = x;
	this.y = y;
	this.sens = sens; // 1 -> vers la droite 0 -> vers la gauche
	this.compteurBullet = 0;
	this.pdv = 1;
	this.vecteur = vect;
	this.isAlive = 1; // on s'en sert pour lancer l'explosion de la bombe du vaisseau

	// la partie 3 du boss se dirige vers le joueur et dure 3 secondes
	this.dateSpawn = Date.now();
	this.dureeDeVie = 3000;
	
}


// Important Inheritance Stuff
Bullet.prototype = Object.create(Sprite.prototype); 
Bullet.prototype.constructor = Bullet; 

Bullet.prototype.dessiner = function(context,game){
//	console.log("ON DESSINE LA BULLET", this.config.code);
	if(this.name == "bulletSpacecraft") // pour l'animation du tir du vaisseau, on doit stop sur la derniere frame
	{
			this.animFrame++;

		if (this.animFrame % (Math.floor(60 / this.currentAnim.fps)) == 0 )
		{
			if(this.compteurBullet<=3 || this.currentAnim.cycle != 1)
			 	this.currentFrame ++;


			if (this.currentFrame == this.currentAnim.nbFrame)
				this.currentFrame = 0;
		}
	}	
	if(this.name == "bombSpacecraft")
	{	
		this.animFrame++;
		if(!this.isAlive) // on lance l'animation de l'explosion
		{
			this.currentFrame ++;

			if(this.currentFrame == this.config.nbFrameMax -1)
			{
				context.fillStyle="#FFFFFF";
				context.fillRect(0,0,game.canvasWidth,game.canvasHeight);
				this.pdv --;

			}
		 		
		}
		

	}

	context.drawImage(this.image,
		this.currentFrame * this.frameWidth, 
		this.currentAnim.nbRow * this.frameHeight,
		this.frameWidth, this.frameHeight,
		this.x, this.y , this.frameWidth, this.frameHeight);
}

Bullet.prototype.destruction = function(i,game){
	if(this.pdv == 0)
		game.tableauBullet.splice(i,1);
}

Bullet.prototype.move = function(i,game){
	
	if( this.sens == 1)// tir du vaisseau
	{
		if(this.name == "bulletSpacecraft")
		{

			if(this.vecteur == 0) // tir normal
				this.x +=20;
			// else// bonus de tir, vecteur de direction pour les bullets qui partent avec un angle spécial
			// {
			// 	this.x += this.vecteur.x * 5;
			// 	this.y += this.vecteur.y * 5;
			// }


			if(this.currentFrame == 3)
				this.compteurBullet ++;

			if(this.compteurBullet >= 3 )
			{
				this.currentFrame = 3;
					
			}
		}

		if(this.name == "bombSpacecraft")
		{	
			this.x += 10;		
		}	
	}
	else // tir de l'enemy
	{
		if(this.name == "bulletBossPart3")
		{
			if(game.boss.configs.length == 1) // aon est dans la dernière phase du boss, les tirs poursuivent le joueur
			{
				if(Date.now() - this.dateSpawn < this.dureeDeVie) // mais ils ont une durée de vie de 3s
				{
					this.vecteur = CalculVector(this.x ,this.y , game.spacecraft.x + game.spacecraft.frameWidth/2, game.spacecraft.y + game.spacecraft.frameHeight/2);
					this.x += this.vecteur.x * 6;
					this.y += this.vecteur.y * 6;
				}
				else // puis ils sont détruit
				{
					this.pdv = 0;
				}

			}
			else
			{
				this.x += this.vecteur.x * 7;
				this.y += this.vecteur.y * 7;		
			}
		}	
		else
		{
			this.x += this.vecteur.x * 7;
			this.y += this.vecteur.y * 7;		
		}

	}
}


//A bullet, B enemy / spacecraft
Bullet.prototype.collision = function(objetA, hitboxA, objetB, hitboxB, game){

	if(checkCollision(objetA, hitboxA, objetB, hitboxB))
	{
		// permet de traverser les explosions des enemis 1 et 2, sinon les tirs sont détruits
		// permet de collisionner avec le up et le down du vaisseau et quand l'enemy 3 est blessé
		if(objetB.currentAnim.code == "idle" || objetB.currentAnim.code == "up" || objetB.currentAnim.code == "down" || objetB.currentAnim.code == "hit") 
		{
			// console.log(objetA,objetB)
			if(objetA.name == "bombSpacecraft") // la bombe du vaisseau oneshot
			{
				game.explosionBomb = 1 ;
				objetB.pdv = 0;
				this.isAlive = 0;
			}
			else if( objetA.name == "bulletSpacecraft")
			{
				objetB.lastHit = Date.now();
				objetB.pdv --;
				this.pdv --;
			}
			else if( objetA.name == "bulletEnemy1" || objetA.name == "bulletBossPart1" || objetA.name == "bulletBossPart2")
			{
				this.pdv --;
				if(objetB.config.code == "spacecraft" && (Date.now() - game.lastHitSpacecraft > game.dureeInvincibilite) && !game.bonusShield) // on verifie sur le vaisseau prend des degats ou pas
				{
					objetB.pdv --;
					game.lastHitSpacecraft = Date.now();		
				}
				else if(objetB.config.code == "spacecraft_Feature")
				{
					objetB.pdv --;
				}
				else if(game.bonusShield)
				{
					game.spacecraft_Shield.pdv --;
				}
			
			}
			else if( objetA.name == "bulletEnemy3" || objetA.name == "bulletBossPart3")
			{
				this.pdv --;
				if(objetB.config.code == "spacecraft" && (Date.now() - game.lastHitSpacecraft > game.dureeInvincibilite) && !game.bonusShield)// on verifie sur le vaisseau prend des degats ou pas
				{
					objetB.pdv -=2;
					game.lastHitSpacecraft = Date.now();		
				}
				else if(objetB.config.code == "spacecraft_Feature")
				{
					objetB.pdv -=2;
				}
				else if(game.bonusShield)
				{
					game.spacecraft_Shield.pdv -=2;
				}
			}
		}
	}
}