// contient l'ensemble des fonctions du jeu

// ASCII generator


function countImages(game)
{ 	
	if(game.nbImageLoaded < game.nbImageToLoad)
		game.nbImageLoaded++;

	var canvas = document.getElementById("canvas");
	canvas.width = game.canvasWidth;
	canvas.height = game.canvasHeight; 
		resizeCanvas();

	// console.log(game)
	var context = canvas.getContext("2d");

	context.font="50px Georgia";
	var text = game.nbImageLoaded + " / " + game.nbImageToLoad + " images chargees";
	context.fillText(text , game.canvasWidth/2 - 50, 100);
	

	if (game.nbImageLoaded == game.nbImageToLoad)
	{
		// var context = canvas.getContext("2d");
		console.log(game.nbImageLoaded +  " / " + game.nbImageToLoad);
		console.log("LOAD SUCCESSFUL");

		// on lance le timer pour le jeu, ceci permet de définir une date de départ pour envoyer les waves
		// game.startLevel();
		// // on lance le jeu
		game.gameState = "menu";
		run(game,context);
		
	}
}

function respawn(game)
{
	game.respawn --;
	game.spacecraft = new Spacecraft(game.spacecraftConfig,game);
	game.spacecraft_Prop = new PropulseurSpacecraft(game.spacecraft_PropConfig,game);

	game.bonusBomb = 0;
	game.finPause = 0;
	game.bonusTir = 0;
	game.timerBonusTir = 0;
	game.bonusShield = 0;
}


//on  (re)initialise les valeurs du jeu
function init(game)
{
	game.score = 0;
	game.tableauBullet = [];
	game.tableauEnemy = [];
	game.enemyToDel = [];
	game.tableauBonus = [];
	game.bonusToDel = [];
	
	//on reset le spacecraft
	game.spacecraft = new Spacecraft(game.spacecraftConfig,game);
	game.dt = 0;
	game.lastUpdate = 0;
	game.bonusBomb = 0;
	game.finPause = 0;
	game.respawn = 2;
	game.boss = 0;
	game.bonusShield = 0;
	game.bonusFeature = 0;
	game.spacecraftFeature = 0;

	game.configBoss[0] = game.configBossStockage[0];
	game.configBoss[1] = game.configBossStockage[1];
	game.configBoss[2] = game.configBossStockage[2];

}

function interpolation(spline)
{
	var path = [];
	for (var i = 0 ; i < spline.length-4 ; i++)
	{
		for (var t = 0; t < 1; t += 0.05) 
		{
		    var ax = (-spline[i][0] + 3*spline[i+1][0] - 3*spline[i+2][0] + spline[i+3][0]) / 6;
		    var ay = (-spline[i][1] + 3*spline[i+1][1] - 3*spline[i+2][1] + spline[i + 3][1]) / 6;
		    var bx = (spline[i + 0][0] - 2*spline[i + 1][0] + spline[i + 2][0]) / 2;
		    var by = (spline[i + 0][1] - 2*spline[i + 1][1] + spline[i + 2][1]) / 2;
		    var cx = (-spline[i + 0][0] +spline[i + 2][0]) / 2;
		    var cy = (-spline[i + 0][1] +spline[i + 2][1]) / 2;
		    var dx = (spline[i + 0][0] + 4*spline[i + 1][0] + spline[i + 2][0]) / 6;
		    var dy = (spline[i + 0][1] + 4*spline[i + 1][1] + spline[i + 2][1]) / 6;
		    path.push([
		      ax*Math.pow(t, 3) + bx*Math.pow(t, 2) + cx*t + dx,
		      ay*Math.pow(t, 3) + by*Math.pow(t, 2) + cy*t + dy
		    ])
		    path.push([
		      ax*Math.pow(t+0.1, 3) + bx*Math.pow(t+0.1, 2) + cx*(t+0.1) + dx,
		      ay*Math.pow(t+0.1, 3) + by*Math.pow(t+0.1, 2) + cy*(t+0.1) + dy
		    ]);
		}
	}
	return path;
}


// NE PAS OUBLIER LE FOREGROUND 0.5 AVANT LE BOSS
function decors(context,game)
{
		// var X1 = 0;
		// var X2 = 0;
		game.X0 = game.canvasWidth;
		// var XF1 = 0;
		

		if(!(game.gameState == "pause")) // permet de ne pas avoir de scrolling pendant les menus
		{
			//ajouter dt
			game.X1 -= game.background1Config.vitesse;
			game.X2 -= game.background2Config.vitesse;
			game.X0 -= game.background1Config.vitesse;

			//le code ci dessous permet de faire défiler un des deux foreground aléatoirement
			var randForeground1 = Math.random() *1000;
			if(randForeground1 < 3 && !game.boolF2) // on en fait défiler un seul à la fois
			{
				game.boolF1 = 1;
			}
			var randForeground2 = Math.random() *1000;
			if(randForeground2 < 3 && !game.boolF1) // on en fait défiler un seul à la fois
				game.boolF2 = 1;
		
			// si les booleens sont vrais, on scroll le foreground correspondant
			if( game.boolF1)
				game.XF1 -= game.foreground1Config.vitesse;
			if (game.boolF2)
				game.XF2 -= game.foreground2Config.vitesse;

			// if(randForeground1<)
			// console.log("randF1 ",randForeground1, " randF2 ", randForeground2 );
		}
		

		context.drawImage(game.background2, game.X2, 0);
		context.drawImage(game.background2, game.X2 + game.background2.width,0);
		context.drawImage(game.background1, game.X1, 0);
		context.drawImage(game.background1, game.X1 + game.background1.width,0);

		if(game.boolF1)
			context.drawImage(game.foreground1, game.XF1, game.canvasHeight - game.foreground1.height);
//			context.drawImage(foreground2, XF2 + foreground.width,0);

		if(game.boolF2)
			context.drawImage(game.foreground2, game.XF2, game.canvasHeight - game.foreground2.height);
//			context.drawImage(background1, X1 + background1.width,0);


		if(!(game.gameState == "pause"))// permet de ne pas avoir de scrolling pendant les menus
		{
			if(game.X0 + game.background0.width> 0)
			{
				context.drawImage(game.background0, game.X0, 0);
				context.drawImage(game.background0, game.X0 + game.background1.width,0);	
			}

			if(game.X1 <= -game.background1.width)
				game.X1 =0;
			if(game.X2 <= -game.background2.width) 
				game.X2 = 0;		
			// if(X0 <= -background0.width) 
			// 	X0 = 0;	

			//quand les foregrounds disparaissent, on reset les parametres pour les scrolling
			if(game.XF1 + game.foreground1.width < 0) 
			{
				game.boolF1 = 0;
				game.XF1 = game.canvasWidth;
			}
				
			if(game.XF2 + game.foreground2.width < 0)
			{
				game.boolF2 = 0;
				game.XF2 = game.canvasWidth;
			}
				
		}
		
		
}


// vérifie les collisions entre les hitboxs AH de l'objet A et les hitboxs BH de l'objet B
function checkCollision(A, AH, B, BH)
{
	var collide = false;
	for(var i = 0 ; i < AH.length; i++)
	{
		for(var j = 0; j < BH.length; j++)
		{
			collide =  (A.x + AH[i].offsetX + AH[i].width >= B.x + BH[j].offsetX && A.x + AH[i].offsetX <= B.x + BH[j].offsetX + BH[j].width &&
				    		A.y + AH[i].offsetY + AH[i].height >= B.y + BH[j].offsetY && A.y + AH[i].offsetY <= B.y + BH[j].offsetY + BH[j].height)
			if(collide)
				return collide;
		}
	}
	return collide;
}



function HUD(context,game) // mettre la vie qui décroit avec une animation
{
	if(game.spacecraft.y <= 70)
		context.globalAlpha = 0.45;



	context.drawImage(game.lifeMeter, 10,10);
	if(game.spacecraft.pdv > 0)
		var vie = game.spacecraft.pdv; // on détermine combien de vie il reste
	context.drawImage(game.lifeMeterFill,0,0,
					vie * game.lifeMeterFill.width / game.spacecraft.vieTotale,game.lifeMeterFill.height,
					9,16,vie * game.lifeMeterFill.width / game.spacecraft.vieTotale ,game.lifeMeterFill.height-13);

	if(game.respawn >=1)
		context.drawImage(game.hudLife, 175,10);
	if(game.respawn >=2)
		context.drawImage(game.hudLife, 210,10);

	if(game.bonusBomb)
		context.drawImage(game.hudBomb, 10,48);
	if(game.bonusBomb >=2)
		context.drawImage(game.hudBomb, 50,48);
	if(game.bonusBomb >=3)
		context.drawImage(game.hudBomb, 90,48);
	if(game.bonusBomb >=4)
		context.drawImage(game.hudBomb, 130,48);
	if(game.bonusFeature)
		context.drawImage(game.hudFeature, 175, 50);

	drawString(context, {x:260,y:15}, "score:"+game.score , 0.2,game);

	context.globalAlpha = 1;
}



window.onresize = function(event) {
	resizeCanvas();
}

function resizeCanvas()
{
	if(window.innerWidth <= self.canvas.width) // la surface d'affichage fait 1280px de large
	{
		// var widthFinal = window.innerWidth;
		
		self.ratio = window.innerWidth/self.canvas.width;

		if(window.innerHeight <= self.ratio*self.canvas.height) // on a pas la place en largeur NI en hauteur
		{
			self.ratio = window.innerHeight/self.canvas.height;
			$("#canvas").css({"width":self.ratio*self.canvas.width+"px", "height":window.innerHeight+"px", 
				"margin-top":"0px", "margin-left":"0px", "overflow":"auto"});
		}
		else
		{
		// console.log(self.canvas.width)
		$("#canvas").css({"width":window.innerWidth+"px", "height":self.ratio*self.canvas.height+"px", 
				"margin-top":"0px", "margin-left":"0px", "overflow":"auto"});
		}
		
	}
	else // on a la place d'afficher le width d'origine du canvas
	{
		if(window.innerHeight <= self.canvas.height)// on a pas assez de places en hauteur pour tout afficher
		{
			self.ratio = window.innerHeight/self.canvas.height;
			$("#canvas").css({"width":self.ratio*self.canvas.width+"px", "height":window.innerHeight+"px", 
				"margin-top":"0px", "margin-left":"0px", "overflow":"auto"});
		}
		else
		{
			$("#canvas").css({"height":self.canvas.height+"px", "width":self.canvas.width+"px", 
					"margin-top":(window.innerHeight/2 - self.canvas.height/2)+"px", 
					"margin-left":(window.innerWidth/2 - self.canvas.width/2)+"px", "overflow":"auto"});
		}
		
	}
		
}



