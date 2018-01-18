

// NE PAS OUBLIER LE FOREGROUND 0.5 AVANT LE BOSS
// SWITCH dans la config

//fonction main de mon programme
function run(game,context)
{
	requestAnimationFrame(function(){ run(game,context) });

	input(game);

//MENU ACCUEIL

	if(game.gameState == "menu")
	{
		// a mettre dns une fonction qui gère le menu
		decors(context,game);
		init(game);
		// brightness(-60,context); // permet d'avoir un canvas plus sombre

		for(var i=0; i < game.menu1.length; i++)
		{
			var tailleFinale = game.menu1[i].taille + game.focusMenu1[i];
			if(game.menu1[i].place == "milieu")
			{
				game.menu1[i].pos.x = game.canvasWidth/2 - (game.menu1[i].txt.length/2 * (game.hudLetters.width/game.lettersConfig.nbFrame) * tailleFinale )
			}

			// console.log(game.menu1[i].txt)
			// for(var j = 0; j < game.menu1[i].txt.length; j++)
			// {
			// 	console.log(game.menu1[i].txt[j], game.menu1[i].txt[j].charCodeAt())
			// }
			drawString(context, game.menu1[i].pos, game.menu1[i].txt, tailleFinale, game);

		}

	}
	else if( game.gameState == "controls")
	{
		// game.controlLeave = 0.3; // on met en gras le texte de retour
		// a mettre dans une fonction
		decors(context,game);
		// brightness(-50,context); // permet d'avoir un canvas plus sombre


		for(var i=0; i < game.menuControls.length; i++)
		{
			var tailleFinale = game.menuControls[i].taille + game.focusMenuControls[i];
			// console.log(i, tailleFinale)
			if(game.menuControls[i].place == "milieu")
			{
				game.menuControls[i].pos.x = game.canvasWidth/2 - (game.menuControls[i].txt.length/2 * (game.hudLetters.width/game.lettersConfig.nbFrame) * tailleFinale )
			}

			drawString(context, game.menuControls[i].pos, game.menuControls[i].txt, tailleFinale, game);

		}
	}
	else if( game.gameState == "clavier")
	{
		decors(context,game);
		for(var i =0; i < game.menuClavier.length; i++)
		{
			// console.log(game.menuClavier[i])
			if(game.menuClavier[i].place == "milieu")
			{
				game.menuClavier[i].pos.x = game.canvasWidth/2 - (game.menuClavier[i].txt.length/2 * (game.hudLetters.width/game.lettersConfig.nbFrame) * game.menuClavier[i].taille)
			}

			drawString(context, game.menuClavier[i].pos, game.menuClavier[i].txt, game.menuClavier[i].taille, game);
		}
		// console.log(game.imagesMenu)
		for(var i=0 ;i<game.imagesMenuClavier.length; i++)
		{
			context.drawImage(game.imagesMenuClavier[i], 0 , 0, game.imagesMenuClavier[i].width, game.imagesMenuClavier[i].height,
								 game.canvasWidth/5 - (game.imagesMenuClavier[i].width/2 * 2) , game.imagesMenuClavierConfig[i].y, game.imagesMenuClavier[i].width * 2, game.imagesMenuClavier[i].height * 2);
		}
	}
	else if( game.gameState == "gamepad")
	{
		decors(context,game);
		for(var i =0; i < game.menuGamepad.length; i++)
		{
			if(game.menuGamepad[i].place == "milieu")
			{
				game.menuGamepad[i].pos.x = game.canvasWidth/2 - (game.menuGamepad[i].txt.length/2 * (game.hudLetters.width/game.lettersConfig.nbFrame) * game.menuGamepad[i].taille)
			}

			drawString(context, game.menuGamepad[i].pos, game.menuGamepad[i].txt, game.menuGamepad[i].taille, game);
		}

		//on ajoute l'image
		context.drawImage(game.imageMenuGamepad, 0 , 0, game.imageMenuGamepad.width, game.imageMenuGamepad.height,
			              game.canvasWidth/2 - game.imageMenuGamepad.width  , game.canvasHeight/2 - game.imageMenuGamepad.height, game.imageMenuGamepad.width *2, game.imageMenuGamepad.height *2);
		
	}
	else if( game.gameState == "about")
	{
		about = 1;
		decors(context,game);
		for(var i =0; i < game.menuAbout.length; i++)
		{
			var tailleFinale = game.menuAbout[i].taille + game.focusMenuAbout[i];
			if(game.menuAbout[i].place == "milieu")
			{
				game.menuAbout[i].pos.x = game.canvasWidth/2 - (game.menuAbout[i].txt.length/2 * (game.hudLetters.width/game.lettersConfig.nbFrame) * game.menuAbout[i].taille)
			}

			drawString(context, game.menuAbout[i].pos, game.menuAbout[i].txt, tailleFinale, game);
		}

		//on ajoute le logo isart
		context.drawImage(game.imageMenuAbout, 0 , 0, game.imageMenuAbout.width, game.imageMenuAbout.height,
			              965  , 510, game.imageMenuAbout.width, game.imageMenuAbout.height);
	}
	else if (game.gameState == "pause")
	{
		decors(context,game);
		
		for(var i=0; i < game.menuPause.length; i++)
		{
			var tailleFinale = game.menuPause[i].taille + game.focusMenuPause[i];
			// console.log(game.menuPause[i], game.focusMenuPause[i])
			if(game.menuPause[i].place == "milieu")
				game.menuPause[i].pos.x = game.canvasWidth/2 - (game.menuPause[i].txt.length/2 * (game.hudLetters.width/game.lettersConfig.nbFrame) * tailleFinale)

			drawString(context, game.menuPause[i].pos, game.menuPause[i].txt, tailleFinale, game);
		}
	}
	else if(game.gameState == "gameOver")
	{
		decors(context,game);

		for(var i=0; i < game.menuGameOver.length; i++)
		{
			var tailleFinale = game.menuGameOver[i].taille + game.focusMenuGameOver[i];
			if(game.menuGameOver[i].place == "milieu")
				game.menuGameOver[i].pos.x = game.canvasWidth/2 - (game.menuGameOver[i].txt.length/2 * (game.hudLetters.width/game.lettersConfig.nbFrame) * tailleFinale)

			if(game.menuGameOver[i].txt == "score:")
				game.menuGameOver[i].txt += game.score;
			drawString(context, game.menuGameOver[i].pos, game.menuGameOver[i].txt, tailleFinale, game);
		}
	}
	else if(game.gameState == "jeuFini")
	{
		decors(context,game);

		for(var i=0; i < game.menuJeuFini.length; i++)
		{
			var tailleFinale = game.menuJeuFini[i].taille + game.focusMenuJeuFini[i];
			if(game.menuJeuFini[i].place == "milieu")
				game.menuJeuFini[i].pos.x = game.canvasWidth/2 - (game.menuJeuFini[i].txt.length/2 * (game.hudLetters.width/game.lettersConfig.nbFrame) * tailleFinale)

			if(game.menuJeuFini[i].txt == "score:")
				game.menuJeuFini[i].txt += game.score;
			drawString(context, game.menuJeuFini[i].pos, game.menuJeuFini[i].txt, tailleFinale, game);
		}
	}
	else if(game.gameState == "running")// on lance le jeu running
	{
		console.log(hidden, visibilityChange, visible, typeof document.webkitHidden,document[hidden])
		
		if(!visible)
			game.gameState = "pause";

		decors(context,game);
		// si on a epuise nos vies
		if(game.respawn <0)
			game.gameState = "gameOver";

		game.update();	
		
		// console.log(game.elapsed_time)

	// console.log(game.boss)
		if(game.boss != 0)
		{
			// console.log("ici")
			game.boss.dessiner(context,game);
			game.boss.move(game);
			game.boss.shoot(game);
			for(var i=0; i < game.tableauBullet.length; i++)
			{
				if(game.tableauBullet[i].sens == 1) // si le tir viens du vaisseau
				{
					// console.log("lolllllll", game.tableauBullet[i].config.code)
					// if(game.boss.configs == 3)
					// console.log("LOLILOLILOLILOL", game.boss.configs.length)
					for(var j=0; j < game.boss.configs.length; j ++)
					{
						// console.log("lol")
						if(game.tableauBullet[i].config.code == "spacecraft_Bullet" && (game.boss.pdv1 || game.boss.pdv2 || game.boss.pdv3))
						{
							// console.log("lalalala")
							game.boss.collision(game.boss.configs[j], game.configBoss[j].hitboxs, game.tableauBullet[i], game.spacecraftBulletConfig.hitboxs,game);

						}
					
						if(game.tableauBullet[i].config.code == "spacecraft_Bomb" && (game.boss.pdv1 || game.boss.pdv2 || game.boss.pdv3))
						{
							// console.log("lolololo")

							game.boss.collision(game.boss.configs[j], game.configBoss[j].hitboxs, game.tableauBullet[i], game.spacecraftBombConfig.hitboxs,game);

						}
					}
					
				}
			}

		}
		// console.log(game.boss.configs)



		if(game.spacecraftFeature.pdv > 0)
		{
			game.spacecraftFeature.draw(context,game);
			for(var i=0; i < game.tableauBullet.length;i++)
			{
				game.tableauBullet[i].collision(game.tableauBullet[i], game.tableauBullet[i].config.hitboxs, game.spacecraftFeature, game.spacecraftFeature.config.hitboxs);
			}
		}




		// SPACECRAFT
		if(game.spacecraft.isAlive)
		{

			if(Date.now() - game.lastHitSpacecraft < game.dureeInvincibilite)
			
			// if(Date.now() - game.lastHitSpacecraft > 0 && Date.now() - game.lastHitSpacecraft < game.dureeInvincibilite/2 - 50 
			// 	|| Date.now() - game.lastHitSpacecraft > game.dureeInvincibilite/2 + 50  && Date.now() - game.lastHitSpacecraft < game.dureeInvincibilite)
			{
				context.globalAlpha = 0.7;
				game.spacecraft.draw(context,game);
				game.spacecraft_Prop.draw(context,game); // on affiche aussi le propulseur
				context.globalAlpha = 1;
			}
			else
			{
				game.spacecraft.draw(context,game);
				game.spacecraft_Prop.draw(context,game);				
			}
				

			game.spacecraft.move(game);
			game.spacecraft.shoot(game);
		}
		else
		{
			game.spacecraft_Prop = 0;
			respawn(game);
		}
		
		if(game.bonusShield)
		{
			game.spacecraft_Shield.draw(context,game);
			game.spacecraft_Shield.move(game);
		}
		if(game.spacecraft_Shield.isAlive == 0)
		{
			game.spacecraft_Shield = 0;
			game.bonusShield = 0;
		}

		// console.log(game.spacecraft.currentFrame)
		// console.log(game.controls.up, game.controls.down, game.controls.left, game.controls.right)
		// console.log("COUCOU")


		//Gestion des bullets
		for(var i=0; i < game.tableauBullet.length; i++)
		{
			game.tableauBullet[i].dessiner(context,game);
			game.tableauBullet[i].move(i,game);
			if(game.tableauBullet[i].sens == 1) // si le tir viens du vaisseau
			{
				for(var j = 0; j < game.tableauEnemy.length; j++) // on vérifie pour chaque enemy
				{
					var id = game.tableauEnemy[j].IDConfig; // recupere l'id de la config de l'enemy afin d'aller chercher la bonne config dans game
					if(game.tableauBullet[i].config.code == "spacecraft_Bullet")
						game.tableauBullet[i].collision(game.tableauBullet[i], game.spacecraftBulletConfig.hitboxs, game.tableauEnemy[j], game.configEnemy[id].hitboxs,game);
				
					if(game.tableauBullet[i].config.code == "spacecraft_Bomb")
						game.tableauBullet[i].collision(game.tableauBullet[i], game.spacecraftBombConfig.hitboxs, game.tableauEnemy[j], game.configEnemy[id].hitboxs,game);

				}
			}

			if(game.tableauBullet[i].sens == 0) // si le tir viens d'un enemy on doit juste vérifier la collision avec le vaisseau
			{
				// console.log("LENGTHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH",game.tableauBullet[i].config.hitboxs);

				game.tableauBullet[i].collision(game.tableauBullet[i], game.tableauBullet[i].config.hitboxs, game.spacecraft, game.spacecraftConfig.hitboxs,game);
			}
			
			if(game.tableauBullet[i].x > game.canvasWidth || !game.tableauBullet[i].pdv || game.tableauBullet[i].x + game.tableauBullet[i].frameWidth < 0)
			{
				game.tableauBullet.splice(i,1);
				i--;
			}
		}
		


		//Pour chaque enemy on le dessine, le fait bouger, tirer et on vérifie les collisions du vaisseau avec cet enemy
		for(var i=0; i < game.tableauEnemy.length; i++)
		{		
			if(Date.now() - game.tableauEnemy[i].lastHit < game.dureeFeedbackEnemy)
			{
				context.globalAlpha = 0.5;
				game.tableauEnemy[i].draw(context,game);
				context.globalAlpha = 1;
			}
			else
				game.tableauEnemy[i].draw(context,game);
			
			game.tableauEnemy[i].move(i,game);
			game.tableauEnemy[i].shoot(game);

			var id = game.tableauEnemy[i].IDConfig; // recupere l'id de la config de l'enemy afin d'aller chercher la bonne config dans game
			game.spacecraft.collision(game.spacecraft, game.spacecraftConfig.hitboxs, game.tableauEnemy[i], game.configEnemy[id].hitboxs,game);
			if( (game.tableauEnemy[i].x + game.tableauEnemy[i].frameWidth) < 0)
			{
				game.enemyToDel.push(i);
			}
		}
		

		//Gestion des bonus
		for(var i=0; i < game.tableauBonus.length; i++)
		{
			game.tableauBonus[i].draw(context,game);
			game.tableauBonus[i].move(i,game);
			var estSupprime = 0
			if(game.spacecraft.collision(game.spacecraft, game.spacecraftConfig.hitboxs, game.tableauBonus[i], game.configBonus.hitboxs,game))
			{
				// console.log("ici")
				game.tableauBonus.splice(i,1);
				estSupprime ++;
			}
			if(!estSupprime)
			{
				if(game.tableauBonus[i].x + game.tableauBonus[i].frameWidth < 0)
				{
					game.tableauBonus.splice(i,1);
				}			
			}

		}




		HUD(context, game);


		//gestion de l'explosion de la bombe
		if(game.explosionBomb)
		{
			game.explosionBomb = 0;
			for(var i=0; i < game.tableauEnemy.length; i++)
			{
				game.tableauEnemy[i].pdv = 0;
			}
		}

		//On supprime les bonus
		for(var i = 0; i < game.bonusToDel.length; i++ )
		{
			game.tableauBonus.splice(game.bonusToDel[i],1);
			game.bonusToDel.splice(i,1);
			i--;
		}


		//On supprime les ennemis
		for(var i = 0; i < game.enemyToDel.length; i++ )
		{
			game.tableauEnemy.splice(game.enemyToDel[i],1);
			game.enemyToDel.splice(i,1);
			i--;
		}
		

	
	}


	

}//fin du run


