// ici se trouvent tous les controles du jeu, au clavier et a la manette



// ADD CONTROLEUR POUR SWITCH


// pour gamepad d'abord check Gamepad.getStates()[0].leftStickY < -0.4 || Gamepad.getStates()[0].dpadUp ( par exemple ) PUIS APRES le gameState -_-'

function input(game)
{

	//GAMEPAD
	// console.log(Gamepad.getStates()[0] == undefined);
	if(Gamepad.supported )  // si le navigateur prend en compte le gamepad
	{
		
		// mettre condition si on est sur un menu, on compte 0.5s avant de recheck les controls ( tempo )
		if(!(Gamepad.getStates()[0] == undefined)) // si il y a un gamepad
		{
			if(Date.now() - game.lastGamepadMenu > game.dureeGamepadMenu)
			{



						//BUTTON A
					if(game.gameState == "menu"  &&  Gamepad.getStates()[0].faceButton0)
					{
						for(var i=0; i < game.focusMenu1.length; i++)
						{
							if(game.focusMenu1[i] > 0)
							{
								game.gameState = game.menu1[i].lien;
								if(game.gameState == "running")
									game.startLevel();
							}
						}
					}
					else if (game.gameState == "controls" &&   Gamepad.getStates()[0].faceButton0)
					{
						for(var i=0; i < game.focusMenuControls.length; i++)
						{					

							if(game.focusMenuControls[i] > 0)
							{
								game.gameState = game.menuControls[i].lien;
								if(game.menuControls[i].txt == "retour") //on reset le focus pour qu'il revienne sur la premiere ligne lorsqu'on
									game.focusMenuControls = [0,0.1,0,0];
							}
						}	
					}
					else if((game.gameState == "clavier" || game.gameState == "gamepad") &&  Gamepad.getStates()[0].faceButton0)
					{
						game.gameState = "controls";
					}
					else if( game.gameState == "pause" && Gamepad.getStates()[0].faceButton0)
					{
						for(var i=0; i< game.focusMenuPause.length; i++)
						{
							if(game.focusMenuPause[i] > 0)
							{
								game.gameState = game.menuPause[i].lien;
								if(game.gameState == "running")
									game.finPause = Date.now();
								if(game.gameState == "menu")
									game.focusMenuPause = [0,0.1,0];	
							}			
						}
					}
					else if( game.gameState == "about")
					{
						game.gameState = "menu";
					}
					else if(game.gameState == "gameOver" && Gamepad.getStates()[0].faceButton0)
					{
						for(var i=0; i<game.focusMenuGameOver.length; i++)
						{
							if(game.focusMenuGameOver[i] > 0)
							{
								game.gameState = game.menuGameOver[i].lien;
								if(game.gameState == "running")
								{
									init(game);
									console.log(game.tableauEnemy, game.tableauBullet)
									game.startLevel();
								}
								if(game.gameState == "menu")
									game.focusMenuGameOver = [0,0,0.1,0];
							}
						}
					}

					//START
					if(game.gameState == "running" && Gamepad.getStates()[0].start)
						game.gameState = "pause";

					//SHOOT
					if(Gamepad.getStates()[0].faceButton0)
						game.controls.fire = 1;
					else
						game.controls.fire = 0;

					//RIGHT
					if(Gamepad.getStates()[0].leftStickX > 0.4 || Gamepad.getStates()[0].dpadRight)
						game.controls.right = 1;
					else
						game.controls.right = 0;

					//LEFT
					if(Gamepad.getStates()[0].leftStickX < -0.4 || Gamepad.getStates()[0].dpadLeft)
						game.controls.left = 1;
					else
						game.controls.left = 0;


					//UP
					if(game.gameState == "running")
					{
						if(Gamepad.getStates()[0].leftStickY < -0.4 || Gamepad.getStates()[0].dpadUp)
						{
							game.controls.up = 1;
							game.compteurSpacecraftH ++;			
						}
						else
						{
							game.controls.up = 0;
							game.compteurSpacecraftH = 0;
						}			
					}
					else if ( game.gameState == "menu") // gère les actions sur le premier menu ( accueil )
					{
						if(Gamepad.getStates()[0].leftStickY < -0.4 || Gamepad.getStates()[0].dpadUp)
						{
							for(var i=0; i < game.focusMenu1.length; i++)
							{
								if(game.focusMenu1[i] != 0 && i>1) // on trouve celui qui a le focus et on vérifie
																	   // si on est pas sur la 1ere ou 2eme ligne
								{
									game.focusMenu1[i-1] = 0.3;
									game.focusMenu1[i] = 0;
								}	
							}
						}
					}
					else if ( game.gameState == "control")
					{
						if(Gamepad.getStates()[0].leftStickY < -0.4 || Gamepad.getStates()[0].dpadUp)
						{
							for(var i=0; i < game.focusMenuControls.length; i++)
							{
								if(game.focusMenuControls[i] != 0 && i > 1)
								{
									game.focusMenuControls[i-1] = 0.1;
									game.focusMenuControls[i] = 0;
								}
							}
						}
					}
					else if(game.gameState == "pause")
					{
						for(var i=0; i < game.focusMenuPause.length; i++)
						{
							if(game.focusMenuPause[i] !=0 && i>1)
							{
								game.focusMenuPause[i-1] = 0.1;
								game.focusMenuPause[i] = 0;
							}
						}
					}
					else if(game.gameState == "gameOver")
					{
						for(var i=0; i < game.focusMenuGameOver.length; i++)
						{
							if(game.focusMenuGameOver[i] !=0 && i>1)
							{
								game.focusMenuGameOver[i-1] = 0.1;
								game.focusMenuGameOver[i] = 0;
							}
						}
					}

						
					//DOWN
					if(game.gameState == "running") // Actions lors du jeu
					{
						if(Gamepad.getStates()[0].leftStickY > 0.4 || Gamepad.getStates()[0].dpadDown)
						{
							game.controls.down = 1;
							game.compteurSpacecraftB ++;
						}
							
						else
						{
							game.controls.down = 0;
							game.compteurSpacecraftB = 0;
							if(Gamepad.getPreviousState(0).leftStickY > 0.4 || Gamepad.getStates()[0].dpadDown)
								game.spacecraft.currentFrame = 0;
						}
					}
					else if (game.gameState == "menu") // gère les actions sur le premier menu ( accueil )
					{
						if(Gamepad.getStates()[0].leftStickY > 0.4 || Gamepad.getStates()[0].dpadDown)
						{
							var j;
							for(var i =0; i < game.focusMenu1.length; i++)
							{
								if(game.focusMenu1[i] !=0 && i!= game.menu1.length-1)
									j = i; 
							}
							game.focusMenu1[j+1] = 0.3;
							game.focusMenu1[j] = 0;
						}
					}
					else if (game.gameState == "control")
					{
						if(Gamepad.getStates()[0].leftStickY > 0.4 || Gamepad.getStates()[0].dpadDown)
						{
							var j;
							for(var i=0; i< game.focusMenuControls.length; i++)
							{
								if(game.focusMenuControls[i] !=0 && i!= game.menuControls.length-1)
									j = i;
							}
							game.focusMenuControls[j+1] = 0.1;
							game.focusMenuControls[j] = 0;
						}
					}
					else if(game.gameState == "pause")
					{
						if(Gamepad.getStates()[0].leftStickY > 0.4 || Gamepad.getStates()[0].dpadDown)
						{
							var j;
							for(var i=0; i  < game.focusMenuPause.length; i++)
							{
								if(game.focusMenuPause[i] != 0 && i!= game.menuPause.length-1)
									j=i;
							}
							game.focusMenuPause[j+1] = 0.1;
							game.focusMenuPause[j] = 0;
						}
					}
					else if( game.gameState == "gameOver")
					{
						if(Gamepad.getStates()[0].leftStickY > 0.4 || Gamepad.getStates()[0].dpadDown)
						{	
							var j;
							for(var i=0; i  < game.focusMenuGameOver.length; i++)
							{
								if(game.focusMenuGameOver[i] != 0 && i!= game.menuGameOver.length-1)
									j=i;
							}
							game.focusMenuGameOver[j+1] = 0.1;
							game.focusMenuGameOver[j] = 0;
						}
					}




			} // fin du if (Date.now() .... )
			
		}// fin du if!(Gamepad.getStates()[0] == undefined)) // si il y a un gamepad
	}//fin du if Gamepad.supported
	





	//CLAVIER
	window.onkeydown = function(event)
	{
		event = event || window.event;
		var key = event.keyCode;
		// console.log(key)
		switch (key)
		{
			//left 
			case 37:
			game.controls.left= 1;
			break;
			
			//up
			case 38:
			if(game.gameState == "running")
			{
				game.controls.up = 1;
				game.compteurSpacecraftH ++;				
			}
			else if(game.gameState == "menu")
			{
				for(var i=0; i < game.focusMenu1.length; i++)
				{
					if(game.focusMenu1[i] != 0 && i>1) // on trouve celui qui a le focus et on vérifie
														   // si on est pas sur la 1ere ou 2eme ligne
					{
						game.focusMenu1[i-1] = 0.3;
						game.focusMenu1[i] = 0;
					}	
				}
			}
			else if(game.gameState == "controls")
			{
				for(var i=0; i < game.focusMenuControls.length; i++)
				{
					if(game.focusMenuControls[i] != 0 && i > 1)
					{
						game.focusMenuControls[i-1] = 0.1;
						game.focusMenuControls[i] = 0;
					}
				}
			}
			else if(game.gameState == "pause")
			{
				for(var i=0; i < game.focusMenuPause.length; i++)
				{
					if(game.focusMenuPause[i] !=0 && i>1)
					{
						game.focusMenuPause[i-1] = 0.1;
						game.focusMenuPause[i] = 0;
					}
				}
			}
			else if(game.gameState == "gameOver")
			{
				for(var i=0; i < game.focusMenuGameOver.length; i++)
				{
					if(game.focusMenuGameOver[i] !=0 && i>2)
					{
						game.focusMenuGameOver[i-1] = 0.1;
						game.focusMenuGameOver[i] = 0;
					}
				}
			}
			else if(game.gameState == "about")
			{
				for(var i=0; i < game.focusMenuAbout.length; i++)
				{
					if(game.focusMenuAbout[i] !=0 && i>2)
					{
						game.focusMenuAbout[i-1] = 0.027;
						game.focusMenuAbout[i] = 0;
					}
				}
			}
			else if(game.gameState == "jeuFini")
			{
				for(var i=0; i < game.focusMenuJeuFini.length; i++)
				{
					if(game.focusMenuJeuFini[i] !=0 && i>2)
					{
						game.focusMenuJeuFini[i-1] = 0.1;
						game.focusMenuJeuFini[i] = 0;
					}
				}
			}
			break;
			
			//right
			case 39:
			game.controls.right=1;
			break;
				
			//down
			case 40:
			if(game.gameState == "running")
			{
				game.controls.down=1;
				game.compteurSpacecraftB ++;
			}
			else if(game.gameState == "menu")// gère les actions sur le premier menu ( accueil )
			{
				var j;// obliger de passer par ce systeme sinon on passe à la derniere ligne directement
				for(var i =0; i < game.focusMenu1.length; i++)
				{
					if(game.focusMenu1[i] !=0 && i!= game.menu1.length-1)
						j = i; 
				}
				game.focusMenu1[j+1] = 0.3;
				game.focusMenu1[j] = 0;
			}
			else if(game.gameState == "controls")
			{
				var j;
				for(var i=0; i< game.focusMenuControls.length; i++)
				{
					if(game.focusMenuControls[i] !=0 && i!= game.menuControls.length-1)
						j = i;
				}
				game.focusMenuControls[j+1] = 0.1;
				game.focusMenuControls[j] = 0;
			}
			else if(game.gameState == "pause")
			{
				var j;
				for(var i=0; i  < game.focusMenuPause.length; i++)
				{
					if(game.focusMenuPause[i] != 0 && i!= game.menuPause.length-1)
						j=i;
				}
				game.focusMenuPause[j+1] = 0.1;
				game.focusMenuPause[j] = 0;
			}
			else if(game.gameState == "gameOver")
			{
				var j;
				for(var i=0; i  < game.focusMenuGameOver.length; i++)
				{
					if(game.focusMenuGameOver[i] != 0 && i!= game.menuGameOver.length-1)
						j=i;
				}
				game.focusMenuGameOver[j+1] = 0.1;
				game.focusMenuGameOver[j] = 0;
			}
			else if(game.gameState == "about")
			{
				var j;
				for(var i=0; i < game.focusMenuAbout.length; i++)
				{
					if(game.focusMenuAbout[i] !=0 && i!= game.menuAbout.length-1)
						j=i;
				}
				game.focusMenuAbout[j+1] = 0.027;
				game.focusMenuAbout[j] = 0;
			}
			else if(game.gameState == "jeuFini")
			{
				var j;
				for(var i=0; i < game.focusMenuJeuFini.length; i++)
				{
					if(game.focusMenuJeuFini[i] !=0 && i!= game.menuJeuFini.length-1)
						j=i;
				}
				game.focusMenuJeuFini[j+1] = 0.1;
				game.focusMenuJeuFini[j] = 0;
			}
			break;

			//space
			case 32:
			game.controls.fire=1;
			game.spacecraft.speed = 5;
			break;


			//bombe : b
			case 66:
			console.log("bomb")
			game.controls.fireBomb=1;
			break;

			//pause v
			case 86:
			console.log("pause");
			if(game.gameState == "running")
				game.gameState = "pause";
			// game.debutPause = Date.now();
			break;


			//enter pour le menu
			case 13:
			if(game.gameState == "menu")
			{
				
				for(var i=0; i < game.focusMenu1.length; i++)
				{
					if(game.focusMenu1[i] > 0)
					{
						game.gameState = game.menu1[i].lien;
						if(game.gameState == "running")
							game.startLevel();
					}
				}
			}
			else if(game.gameState == "controls") // on affiche les controles selectionnes ou on reviens en arriere
			{
				for(var i=0; i < game.focusMenuControls.length; i++)
				{					

					if(game.focusMenuControls[i] > 0)
					{
						game.gameState = game.menuControls[i].lien;
						if(game.menuControls[i].txt == "retour") //on reset le focus pour qu'il revienne sur la premiere ligne lorsqu'on
							game.focusMenuControls = [0,0.1,0,0];
					}
				}		
				// console.log(game.focusMenuControls)
			} // on ne peut QUE revenir en arriere
			else if(game.gameState == "clavier" || game.gameState == "gamepad")
			{
				// console.log(game.focusMenuControls);
				game.gameState = "controls";
			}
			else if(game.gameState == "pause")
			{
				for(var i=0; i< game.focusMenuPause.length; i++)
				{
					if(game.focusMenuPause[i] > 0)
					{
						game.gameState = game.menuPause[i].lien;
						if(game.gameState == "running")
							game.finPause = Date.now();
						if(game.gameState == "menu")
							game.focusMenuPause = [0,0.1,0];	
					}			
				}
			}
			else if(game.gameState == "about")
			{
				for(var i=0; i < game.focusMenuAbout.length; i++)
				{					

					if(game.focusMenuAbout[i] > 0)
					{
						if(game.menuAbout[i].txt == "retour") //on reset le focus pour qu'il revienne sur la premiere ligne lorsqu'on
						{
							game.gameState = game.menuAbout[i].lien;
							game.focusMenuAbout = [0,0,0.027,0,0,0];
						}
						else
						{
							if(game.menuAbout[i].lien == "lienIsart")
								 window.location = "http://www.isartdigital.com/fr/";
							else if (game.menuAbout[i].lien == "portfolioAlexandre")
							{
								console.log("lol")
								 // window.location = "http://www.isartdigital.com/fr/";
							}
							else if (game.menuAbout[i].lien == "portfolioDamien")
							{
								console.log("lol2")
								 window.location = "http://damien-rd.fr/";
							}
						}
							
					}
				}	
			}
			else if(game.gameState == "gameOver")
			{
				for(var i=0; i<game.focusMenuGameOver.length; i++)
				{
					if(game.focusMenuGameOver[i] > 0)
					{
						game.gameState = game.menuGameOver[i].lien;
						if(game.gameState == "running")
						{
							init(game);
							console.log(game.tableauEnemy, game.tableauBullet)
							game.startLevel();
						}
						if(game.gameState == "menu")
							game.focusMenuGameOver = [0,0,0.1,0];
					}
				}
			}

			break;


			case 78:
			if(game.bonusFeature)
			{
				game.spacecraftFeature = new Feature(game.spacecraftFeatureConfig,game);
				game.bonusFeature = 0;
				// console.log(game.spacecraftFeature);
			}
				
		}
	}





	window.onkeyup = function(event)
	{
		var key = event.keyCode;
		switch (key)
		{
			//left 
			case 37:
			game.controls.left= 0;
			break;
			
			//up
			case 38:
			game.controls.up = 0;
			game.compteurSpacecraftH = 0;		
			break;

			//right
			case 39:
			game.controls.right=0;
			break;
				
			//down
			case 40:
			game.compteurSpacecraftB = 0;
			game.spacecraft.currentFrame = 0;
			game.controls.down=0;
			break;

			//space
			case 32:
			game.controls.fire =0;
			game.spacecraft.speed = 8;

			break;

			//bomb
			case 66:
			game.controls.fireBomb =0;
			break;
		}
	}

}
