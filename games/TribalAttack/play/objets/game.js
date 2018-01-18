var Game = function(){

	this.nbImageLoaded = 0;
	this.nbImageToLoad = 37;

	this.gameState;


	// this.sepia = 100;
	this.explosionBomb = 0;

	this.lastHitSpacecraft = Date.now(); // on stock la dernière fois que le vaisseau est touche, on peux ensuite faire 0.5s d'invincbilite apres etre touche
	this.dureeInvincibilite = 1000;
	this.dureeFeedbackEnemy = 50;

	this.lastGamepadMenu = 0; //
	this.dureeGamepadMenu = 500; //

	this.lastResizeCanvas = Date.now();

	this.boss = 0;
	this.configBoss = [0,0,0]; // on stock la config de la partie 1 dans la premiere case, etc, on les spliceras dans Boss 
	this.configBossStockage = [0,0,0]; // on stock les configs

	this.imagesMenuClavier = []; // tableau qui contient les images du menu afin de les affichers avec un for
	this.imagesMenuClavierConfig = []; // contient les config des images du menu ( donc x et y )

	this.focusMenu1 = [ 0,0.3,0,0];
	this.menu1 = [
		{pos:{x:0,y:50}, txt:"tribal attack", taille: 0.75, place: "milieu", lien:"rien"},
		{pos:{x:0,y:300}, txt:"jouer",taille: 0.5, place: "milieu", lien:"running"},
		{pos:{x:0,y:450}, txt:"commandes", taille: 0.5, place: "milieu", lien:"controls"},
		{pos:{x:0,y:600}, txt:"a propos", taille: 0.5, place: "milieu", lien:"about"}

	];

	this.focusMenuControls = [0,0.1,0,0];
	this.menuControls = [
		{pos:{x:0,y:50}, txt:"commandes", taille: 0.7, place: "milieu", lien:"rien"},
		{pos:{x:0,y:300}, txt:"controles au clavier",taille: 0.35, place: "milieu", lien:"clavier"},
		{pos:{x:0,y:450}, txt:"controles au gamepad", taille: 0.35, place: "milieu", lien:"gamepad"},
		{pos:{x:0,y:700}, txt:"retour", taille: 0.35, place: "milieu", lien:"menu"}
		// {pos:{x:50,y:600}, txt:"choix :", taille: 0.35, place: ""},
		// {pos:{x:500,y:600}, txt:"clavier", taille: 0.35, place: ""},
		// {pos:{x:500,y:700}, txt:"gamepad", taille: 0.35, place: ""}

	];

	this.menuClavier = [
		{pos:{x:   0,y:50}, txt:"commandes clavier", taille: 0.5, place: "milieu", lien:"rien"},
		{pos:{x: 430,y:210}, txt:"deplacements", taille: 0.35,place: "rien", lien:"rien"},
		{pos:{x: 430,y:310}, txt:"tir", taille: 0.35,place: "rien", lien:"rien"},
		{pos:{x: 430,y:410}, txt:"bombe", taille: 0.35,place: "rien", lien:"rien"},
		{pos:{x: 430,y:510}, txt:"speciale feature", taille: 0.35,place: "rien", lien:"rien"},
		{pos:{x: 430,y:610}, txt:"pause", taille:0.35,place:"rien", lien:"rien"},
		{pos:{x:   0,y:700}, txt:"retour", taille: 0.45,place: "milieu", lien:"controls"}

	];

	this.menuGamepad = [
		{pos:{x: 0,y:50}, txt:"commandes gamepad", taille: 0.5, place:"milieu", lien:"rien"},
		{pos:{x: 0,y:700}, txt:"retour", taille: 0.45,place: "milieu", lien:"controls"}

	];

	this.focusMenuAbout = [0,0,0.027,0,0,0];
	this.menuAbout = [
		{pos:{x: 0,y:50}, txt:"a propos", taille:0.5, place:"milieu", lien:"rien"},
		{pos:{x:10,y:250}, txt:"ce jeu a ete fait par :", taille:0.35, place:"rien", lien:"rien"},
		{pos:{x:50,y:350}, txt:" - alexandre accorsi pour les graphismes", taille:0.2, place:"rien", lien:"portfolioAlexandre"},
		{pos:{x:50,y:450}, txt:" - rebelo da costa damien pour le code", taille:0.2, place:"rien", lien:"portfolioDamien"},
		{pos:{x:10,y:600}, txt:"etudiants a l ecole isart digital", taille:0.2, place:"rien", lien:"lienIsart"},
		{pos:{x: 0,y:700}, txt:"retour", taille:0.45, place:"milieu", lien:"menu"}
		// + lien vers isart  / portfolio
	];
	this.inLinkIsart = false;

	this.focusMenuPause = [0,0.1,0];
	this.menuPause = [
		{pos:{x:0,y:50}, txt:"pause", taille:0.9, place:"milieu", lien:"rien"},
		{pos:{x:0,y:350}, txt:"retour au jeu", taille:0.5, place:"milieu", lien:"running"},
		{pos:{x:0,y:550}, txt:"retour au menu", taille:0.5, place:"milieu", lien:"menu"},

	];

	this.focusMenuGameOver = [0,0,0.1,0];
	this.menuGameOver = [
		{pos:{x:0,y:50}, txt:"game over", taille: 0.9, place:"milieu", lien:"rien"},
		{pos:{x:0,y:350}, txt:"score:", taille:0.6, place:"milieu", lien:"rien"},
		{pos:{x:0,y:500}, txt:"recommencer", taille:0.45, place:"milieu", lien:"running"},
		{pos:{x:0,y:650}, txt:"retour au menu", taille:0.45, place:"milieu", lien:"menu"}

	];

	this.focusMenuJeuFini = [0,0,0.1,0];
	this.menuJeuFini = [
		{pos:{x:0,y:50}, txt:"jeu fini", taille: 0.9, place:"milieu", lien:"rien"},
		{pos:{x:0,y:350}, txt:"score:", taille:0.6, place:"milieu", lien:"rien"},
		{pos:{x:0,y:500}, txt:"recommencer", taille:0.45, place:"milieu", lien:"running"},
		{pos:{x:0,y:650}, txt:"retour au menu", taille:0.45, place:"milieu", lien:"menu"}

	];

	this.controls = {
		up :0,
		down :0,
		right:0,
		left:0,
		fire:0,
		fireBomb:0
	};

	this.compteurSpacecraftH = 0;
	this.compteurSpacecraftB = 0;


	this.canvasOffsetTop;
	this.canvasOffsetLeft;
	this.canvasWidth = 1280;
	this.canvasHeight = 768;
	
	// this.compteurFrame = 0; // compte les frames pour les tirs

	this.X1 = 0;
	this.X2 = 0;
	this.X0 = 0;
	this.XF1 = this.canvasWidth;
	this.XF2 = this.canvasWidth; 
	this.boolF1 = 0; // permet de savoir si le foreground1 est affiché
	this.boolF2 = 0; // permet de savoir si le foreground2 est affiché



	this.tableauBullet = [];
	this.tableauEnemy  = [];
	this.configEnemy   = [0,0,0];
	this.enemyToDel    = []; // enemy a delete
	this.tableauBonus  = [];
	this.bonusToDel    = [];

	this.score = 0;


	// this.spacecraftFeature = 0;
	this.bonusFeature = 0;
	this.bonusBomb = 0;
	this.bonusTir = 0;
	this.timerBonusTir = 0;
	this.dureeBonusTir = 5000;
	this.bonusShield = 0;
	// this.dureeBonusShield = 10000;
	this.respawn = 2;

	this.dt = 0;
	this.lastUpdate = 0;
	// this.elapsed_time = 0;
	var currentLevel = 0;
	this.startLevel = function(){
		this.elapsed_time = 0;
		this.level = getLevel(currentLevel);
		this.premierLancement = Date.now();
	};
	
	this.update = function(){
		if(this.gameState != "pause")
		{
			var now = Date.now() - this.premierLancement;
			this.dt = now - this.lastUpdate;
			this.lastUpdate = now;
			this.elapsed_time += (this.dt>1000)?0:this.dt;
						
			
			// on regarde dans le level si une nouvelle wave doit etre enclenchee
			for (var i = 0; i < this.level.level.length; i++)
			{
				if(  this.elapsed_time >= this.level.level[i].time)
				{
					var waveId = this.level.level[i].wave;
					//on va chercher tous les ennemis de la wave
					for(var j=0; j < this.level.waves[waveId].length; j++)
					{
						//en fonction du type d'ennemi on fait appel a son constructeur // mettre x et y et path en dehors + faire switch
						if(this.level.waves[waveId][j].enemy == 1)
						{
							var enemyX = this.level.waves[waveId][j].x;
							var enemyY = this.level.waves[waveId][j].y + this.level.level[i].y;
							var path = interpolation(this.level.splines[this.level.waves[waveId][j].spline]); // on prend la spline correspondant au numero dans wave
							this.tableauEnemy.push(new Enemy_1(enemyX + this.canvasWidth, enemyY, this.configEnemy[0],path ,this));
						}

						if(this.level.waves[waveId][j].enemy == 2)
						{
							var enemyX = this.level.waves[waveId][j].x;
							var enemyY = this.level.waves[waveId][j].y + this.level.level[i].y;
							var path = interpolation(this.level.splines[this.level.waves[waveId][j].spline]); // on prend la spline correspondant au numero dans wave
							this.tableauEnemy.push(new Enemy_2(enemyX + this.canvasWidth, enemyY , this.configEnemy[1],path, this));
						}

						if(this.level.waves[waveId][j].enemy == 3)
						{
							var enemyX = this.level.waves[waveId][j].x;
							var enemyY = this.level.waves[waveId][j].y + this.level.level[i].y;
							var path = interpolation(this.level.splines[this.level.waves[waveId][j].spline]); // on prend la spline correspondant au numero dans wave
							this.tableauEnemy.push(new Enemy_3(enemyX + this.canvasWidth, enemyY , this.configEnemy[2],path, this));
						}

						if(this.level.waves[waveId][j].enemy == "b")
						{
							// console.log("coucou")
							var enemyX = this.level.waves[waveId][j].x;
							var enemyY = this.level.waves[waveId][j].y + this.level.level[i].y;
							var path = interpolation(this.level.splines[this.level.waves[waveId][j].spline]); // on prend la spline correspondant au numero dans wave
							// console.log("BOSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",this.configBoss)
							var part1 = new Sprite(this.configBoss[0], this);
							var part2 = new Sprite(this.configBoss[1], this);
							var part3 = new Sprite(this.configBoss[2], this);
							var configs = [part1, part2, part3];
							// console.log("LOLOLOLOLOLOL",configs, this.configBoss)
							this.boss = new Boss(enemyX + this.canvasWidth, enemyY , configs,path, this);
						}
					}
					this.level.level.splice(i,1);
					i--;
				}
			}
		}
	}
		
}


function getLevel(levelNumber)
{
	var splines = [
	    [ [1500,350],[1400,350],[1300,350], [1200,350],[1100,350],[1000,350],[900,350],[800,350],[700,350],[600,350],[500,350],[400,350],[300,350],[200,350],[100,350],[0,350],[-100,350],[-200,350],[-300,350],[-400,350],[-500,350],[-600,350],[-700,350]],
		[ [1280,-100], [1200,0], [1040,0], [960,0], [960,200], [800,225], [650,250], [500,250], [450,250], [400,250], [350,250], [300,250], [250,250], [200,250], [180,250], [150,250], [100,250], [50,250], [0,250], [-100,250], [-150,250], [-200,250], [-300,250], [-300,250], [-300,250], [-300,250]],
		[ [1280,868], [1200,768], [1040,768], [960,768], [960,568], [800,543], [650,518], [500,518], [450,518],[400,518],[350,518],[300,518],[250,518],[200,518],[180,518],[150,518],[100,518],[50,518],[0,518],[-100,518],[-150,518],[-200,518],[-300,518],[-300,518],[-300,518],[-300,518]],
		[ [1400,100],[1300,100], [1220,100], [1140,100], [1040,100], [960,100], [880,100], [800,100], [720,100], [640,100], [720,150], [800,175],[880,200], [920,225],[1000,250],[1000,250],[920,250], [840,250], [760,250], [680,250], [600,250], [520,250],[440,250],[360,250],[280,250],[200,250],[120,250],[40,250],[-40,250],[-200,250],[-250,250],[-300,250],[-300,250],[-300,250],[-300,250],[-400,250],[-500,250],[-600,250]],
		[ [1400,668],[1300,668], [1220,668], [1140,668], [1040,668], [960,668], [880,668], [800,668], [720,668], [640,668], [720,618], [800,593],[880,568], [920,543],[1000,518],[1000,518],[920,518], [840,518], [760,518], [680,518], [600,518], [520,518],[440,518],[360,518],[280,518],[200,518],[120,518],[40,518],[-40,518],[-200,518],[-250,518],[-300,518],[-300,518],[-300,518],[-300,518],[-400,518],[-500,518],[-600,518]],
	
		[ [1400,868],[1300,788],[1290,778],[1280,768],[1180,668],[1030,518],[800,443],[640,384],[480,448], [320,518],[100,668], [0,768], [-10,778], [-20,788],[-50,800], [-100,850],[-120,868],[-150,900],[-200,950]],
		[ [1400,-100],[1300,-20],[1290,-10],[1280,0],[1180,100],[1030,250],[800,325],[640,384],[480,320], [320,250],[100,100], [0,0], [-10,-10], [-20,-20],[-50,-32], [-100,-82],[-120,-100], [-150,-132],[-200,-182]],

		[ [1380,868],[1330,818],[1280,768],[1200,720],[1120,672],[960,576],[800,480],[720,432],[640,384],[560,432],[480,480],[320,576],[160,672],[80,720],[0,768],[-50,818],[-100,868],[-150,900],[-200,950],[-300,1018]],
		[ [1380,-100],[1330,-50],[1280,0],[1200,48],[1120,96],[960,192],[800,288],[720,336],[640,384],[560,336],[480,288],[320,192],[160,96],[80,48],[0,0],[-50,-50],[-100,-100],[-150,-132],[-200,-182],[-300,-250]],

		// [ [1280, 0], [1180, 100], [1080, 200], [980, 300], [880, 200], [780, 100], [880, 0], [980, 100], [1080, 200], [980, 300], [780, 200], [680, 100], [580, 0], [480, 100], [380, 200],[400,250], [500,300],[650,400], [800,400],[850,450],[900, 350], [900,340], [900,400], [900,400], [900,400], [900,400]],

		[ [1280, 768], [1180, 668], [1080, 568], [980, 468], [880, 568], [780, 668], [880, 768], [980, 668], [1080, 568], [980, 468], [780, 568], [680, 668], [580, 768], [480, 668], [380, 568], [480, 468], [580, 568], [680, 668], [580, 768], [480, 668], [380, 568], [280, 468], [180, 568], [80, 668], [180,768], [280,668], [380,568], [280,468], [180,568], [80,668], [-20 ,768], [-120 ,668], [-220 ,568], [-320 ,468], [-420 ,568], [-520 ,668],[-620,768],[-720,668],[-820,568]],
		[ [1280, 0], [1180, 100], [1080, 200], [980, 300], [880, 200], [780, 100], [880, 0], [980, 100], [1080, 200], [980, 300], [780, 200], [680, 100], [580, 0], [480, 100], [380, 200], [480, 300], [580, 200], [680, 100], [580, 0], [480, 100], [380, 200], [280, 300], [180, 200], [80, 100], [180,0], [280,100], [380,200], [280,300], [180,200], [80,100], [-20 ,0], [-120 ,100], [-220 ,200], [-320 ,300], [-420 ,200], [-520 ,100], [-620 ,0], [-720 ,100], [-820 ,200] ],

		//BOSS
		[ [1280, 0], [1180, 100], [1080, 200], [980, 300], [880, 200], [780, 100], [880, 0], [980, 100], [1080, 200], [980, 300], [780, 200], [680, 100], [580, 0], [480, 100], [380, 200],[400,250], [500,300],[650,400], [800,400],[850,450],[900, 350], [900,340], [900,400], [900,400], [900,400], [900,400]],

////////////////////////////////////

		[ [1280, 0], [1180, 100], [1080, 200], [980, 300], [880, 200], [780, 100], [880, 0], [980, 100], [1080, 200], [980, 300], [780, 200], [680, 100], [580, 0], [480, 100], [380, 200], [480, 300], [580, 200], [680, 100], [580, 0], [480, 100], [380, 200], [280, 300], [180, 200], [80, 100], [180,0], [280,100], [380,200], [280,300], [180,200], [80,100], [-20 ,0], [-120 ,100], [-220 ,200], [-320 ,300], [-420 ,200], [-520 ,100], [-620 ,0], [-720 ,100], [-820 ,200] ],
		[ [640,500], [640,500],[640,500],[640,500],[640,500],[640,500] ],
		// [ [1280, 0], [1180, 50], [1080, 50], [980, 100], [880, 100], [780, 100], [880, 100], [680, 100], [580, 100],[500,100], [600, 120], [700, 150], [750, 170], [800, 180], [830, 185], [850, 185], [850,185], [900,185], [930,185], [930,185], [930,185], [930,185],[940,200],[920,220],[900,240],[880,518],[880,250],[880,250],[880,250],[880,250],[880,250], [850,260], [850,260], [850,260], [850,260], [850,260]],
		// [ [800,-400], [800,-350], [800,-300], [800,-200], [800,-100], [800,-50], [800,50], [800,175], [750,250], [700,350], [750,400], [800,400], [850,400], [850,400], [850,400], [850,400], [850,400]],
		// [ [1280,768], [1200,768], [1040,768], [960,768], [600,373], [800,200], [600,300], [250,0], [0,0], [0,500], [300,500], [250,400], [300,350], [-10,0], [-150,250], [-200,250], [-400,250],[-2000,250]   ]



	];//fin de splines

	var waves = [
		[
			{enemy : 1, x : 0, y : 0, spline :0}, //0
		],
		[
			{enemy : 2, x : 0,  y : 0, spline : 1}, //1
		],
		[
			{enemy : 2, x : 0,  y : 0, spline : 2}, //2
		],
		[
			{enemy : 3, x : 0,   y : 0, spline: 3}, //3
			{enemy : 3, x : 0,   y : -80, spline: 4},

		],
		[
			{enemy : 2, x: 0, y : 0, spline : 0}, //4
			{enemy : 1, x: 200, y : -150, spline : 0},
			{enemy : 1, x: 200, y : 150, spline : 0},
		],
		[
			{enemy : 1, x: 0, y : 0, spline : 5}, //5
			{enemy : 1, x: 50, y : 0, spline : 5},
			{enemy : 1, x: 100, y : 0, spline : 5},
			{enemy : 1, x: 0, y : 0, spline : 6}, 
			{enemy : 1, x: 50, y : 0, spline : 6},
			{enemy : 1, x: 100, y : 0, spline : 6},
		],
		[
			{enemy : 1, x: 0, y : 0, spline : 7}, //6
			{enemy : 1, x: 70, y : 0, spline : 8}, 
		],
		[
			{enemy : 2, x: 0, y : 0, spline : 7}, //7
			{enemy : 2, x: 70, y : 0, spline : 8}, 
		],
		[
			{enemy : 3, x: 0, y : 0, spline : 7}, //8
			{enemy : 3, x: 70, y : 0, spline : 8}, 
		],
		[
			{enemy : 3, x: 0, y : 0, spline : 0}, //9
		],
		[
			{enemy : 2, x : 0,  y : 0, spline : 0}, //10
		],
		[
			{enemy : 1, x : 0,  y : -50, spline : 9}, //11
			{enemy : 1, x : 0,  y : -200, spline : 9},
			{enemy : 1, x : 0,  y : -330, spline : 9},
			{enemy : 1, x : 0,  y : -500, spline : 9},
		],
		[
			{enemy : 1, x : 0,  y : 0, spline : 9}, // 12
			{enemy : 2, x : 100,  y : 0, spline : 9},
			{enemy : 1, x : 200,  y : 0, spline : 9},

			{enemy : 1, x : 0,  y : 0, spline : 10},
			{enemy : 2, x : 100,  y : 0, spline : 10},
			{enemy : 1, x : 200,  y : 0, spline : 10},

			{enemy : 3, x : 0, y: 0, spline: 0},
		],
		[
			{enemy : 1, x : 0,  y : 0, spline : 3}, // 13
			{enemy : 1, x : 100,  y : 0, spline : 3},
			{enemy : 3, x : 200,  y : 0, spline : 3},

			{enemy : 1, x : 0,  y : 0, spline : 4},
			{enemy : 1, x : 100,  y : 0, spline : 4},
			{enemy : 3, x : 200,  y : 0, spline : 4},

			{enemy : 3, x : 0, y: 0, spline: 0},
		],
		[
			{enemy : 2, x : 0, y: 0, spline : 5}, //14
			{enemy : 1, x : 100, y: 0, spline : 5},
		],
		[
			{enemy : 2, x : 0, y: 0, spline : 6}, //15
			{enemy : 1, x : 100, y: 0, spline : 6},
		],
		[
			{enemy : 1, x : 0, y: 0, spline : 0}, // 16
			{enemy : 2, x : 0, y: 200, spline : 0},
			{enemy : 3, x : 0, y: -200, spline : 0},
		],
		[
			{enemy : 3, x : 0, y: 0, spline : 0}, // 17
			{enemy : 1, x : 0, y: 200, spline : 0},
			{enemy : 2, x : 0, y: -200, spline : 0},
		],
		[
			{enemy : 2, x : 0, y: 0, spline : 0}, // 18
			{enemy : 3, x : 0, y: 200, spline : 0},
			{enemy : 1, x : 0, y: -200, spline : 0},
		],
		[
			{enemy : 2, x : 0, y: 0, spline : 0}, // 19
			{enemy : 2, x : 0, y: 250, spline : 0},
			{enemy : 2, x : 0, y: -250, spline : 0},
			{enemy : 2, x : 150, y: 100, spline : 0},
			{enemy : 2, x : 150, y: -100, spline : 0},
			{enemy : 2, x : 300, y: 0, spline : 0}, 
			{enemy : 2, x : 300, y: 250, spline : 0},
			{enemy : 2, x : 300, y: -250, spline : 0},
		],
		[
			{enemy : "b", x: 0, y : 0, spline : 11}, //20

		],
	];// fin de waves

	var level = [
		[
		   { time : 3000, wave : 0, y:0}, 
		   { time : 3300, wave : 0, y:0}, 
		   { time : 3600, wave : 0, y:0}, 
		   { time : 3900, wave : 0, y:0}, 
		   { time : 10000, wave : 0, y:300},
		   { time : 10300, wave : 0, y:300},
		   { time : 10600, wave : 0, y:300},
		   { time : 10900, wave : 0, y:300},
		   { time : 10000, wave : 0, y:-300},
		   { time : 10300, wave : 0, y:-300},
		   { time : 10600, wave : 0, y:-300},
		   { time : 10900, wave : 0, y:-300},

		   { time : 16500, wave : 1, y:300},
		   { time : 16800, wave : 1, y:300},
		   { time : 17100, wave : 1, y:300},
		   { time : 17300, wave : 1, y:300},
		   { time : 16500, wave : 2, y:-300},
		   { time : 16800, wave : 2, y:-300},
		   { time : 17100, wave : 2, y:-300},
		   { time : 17300, wave : 2, y:-300},

		   { time : 21000, wave : 3, y:0},

		   { time : 28500, wave : 4, y:0}, 

		   { time : 35300, wave : 10,y:-100},
		   { time : 35300, wave : 10,y:100},
		   { time : 35000, wave : 10,y:0},

		   { time : 40500, wave : 5, y:0},

		   { time : 46000, wave : 6, y:0},
		   { time : 46500, wave : 7, y:0},
		   { time : 47000, wave : 8, y:0},

		   { time : 55000, wave : 0, y:0},  
		   { time : 55000, wave : 0, y:100},
		   { time : 55000, wave : 0, y:300},
		   { time : 55000, wave : 0, y:-100},
		   { time : 55000, wave : 0, y:-300},

		   { time : 60500, wave : 9, y:0},  
		   { time : 60500, wave : 9, y:100},
		   { time : 60500, wave : 9, y:300},
		   { time : 60500, wave : 9, y:-100},
		   { time : 60500, wave : 9, y:-300},

		   { time : 63500, wave : 11, y:0}, 

		   { time : 70000, wave : 12, y:0}, 

		   { time : 78000, wave : 13, y:0},

		   { time : 84000, wave : 14, y:0}, 

		   { time : 88000, wave : 15, y:0},

		   { time : 89000, wave : 14, y:0},

		   { time : 90000, wave : 15, y:0},
		

		   { time : 94000, wave : 16, y:0},
		   { time : 96000, wave : 17, y:0},
		   { time : 98000, wave : 18, y:0},
		   { time : 106000, wave : 19, y:0},

		   { time : 113000, wave : 20, y:0}, // 113000
	
		],

	];//fin de level

	return {
		splines : splines,
		waves : waves,
		level : level[levelNumber]
	};

}