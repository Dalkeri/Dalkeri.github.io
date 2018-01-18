var xmlhttp;
window.onload = function(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","data/configuration.xml");
	xmlhttp.responseType = "document";
	xmlhttp.send();
	xmlhttp.addEventListener("load", function(e) { 
		// console.log("ok on a lu le fichier");
		readFile();
	} );

function readFile()
{
	var game = new Game();
	var sprites;
//	var spritesArray = {};
	var xml = xmlhttp.responseXML;
	sprites = xml.getElementsByTagName("sprite");
	for (var i = 0; i < sprites.length ;i++)
	{
		var sprite = sprites[i];
		if (sprite.getAttribute("code") == "spacecraft") 						
		{
			// console.log("spacecraft")
			game.spacecraftConfig = readNodeSprite(sprite);
			game.spacecraft = new Spacecraft(game.spacecraftConfig,game);
			countImages(game);
		}
		else if (sprite.getAttribute("code") == "spacecraft_Feature")
		{
			// console.log("spacecraft_Bullet");
			game.spacecraftFeatureConfig = readNodeSprite(sprite);
			// game.spacecraftFeature = new Feature(game.spacecraftFeatureConfig,game);
			countImages(game);
		}
		else if (sprite.getAttribute("code") == "spacecraft_Bullet")
		{
			// console.log("spacecraft_Bullet");
			game.spacecraftBulletConfig = readNodeSprite(sprite);
			game.spacecraftBullet = new Bullet(game.spacecraftBulletConfig,game,0,0);
			countImages(game);
		}
		else if (sprite.getAttribute("code") == "spacecraft_Bomb")
		{
			// console.log("spacecraft_Bomb");
			game.spacecraftBombConfig = readNodeSprite(sprite);
			game.spacecraftBomb = new Bullet(game.spacecraftBombConfig,game,0,0);
			countImages(game);

		}
		else if( sprite.getAttribute("code") == "spacecraft_Prop")
		{
			// console.log("spacecraft_Prop")
			game.spacecraft_PropConfig = readNodeSprite(sprite);
			game.spacecraft_Prop = new PropulseurSpacecraft(game.spacecraft_PropConfig,game);
			countImages(game);

		}
		else if( sprite.getAttribute("code") == "spacecraft_Shield")
		{
			// console.log("spacecraft_Prop")
			game.spacecraft_ShieldConfig = readNodeSprite(sprite);
			game.spacecraft_Shield = new Shield(game.spacecraft_ShieldConfig,game);
			countImages(game);

		}
		else if (sprite.getAttribute("code") == "enemy_1")
		{
			// console.log('enemy_1')
		//	game.enemy_1Config = enemy_1Config; 
			game.configEnemy[0] = readNodeSprite(sprite);
		//	var path = interpolation(game.level.splines[0]);
			game.enemy_1 = new Enemy_1(0,0,game.configEnemy[0],[0][0],game);
			countImages(game);
			// console.log(game.configEnemy[0]);

		}
		else if (sprite.getAttribute("code") == "enemy_1Bullet")
		{
			// console.log("enemy_1Bullet");
			game.enemy1BulletConfig = readNodeSprite(sprite);
			game.enemy1Bullet = new Bullet(game.enemy1BulletConfig,game,0,0);
			countImages(game);
		}
		else if (sprite.getAttribute("code") == "enemy_2")
		{
			// console.log("enemy_2");
		//	game.enemy_2Config = enemy_2Config; 
			game.configEnemy[1] = readNodeSprite(sprite);
			game.enemy_2 = new Enemy_2(0,0,game.configEnemy[1],[0][0],game);
			countImages(game);
			// console.log(game.configEnemy[1]);

		}
		else if (sprite.getAttribute("code") == "enemy_3")
		{
			// console.log("enemy_3");
		//	game.enemy_3Config = enemy_3Config; 
			game.configEnemy[2] = readNodeSprite(sprite);
			game.enemy_3 = new Enemy_3(0,0,game.configEnemy[2],[0][0],game);
			countImages(game);
		}
		else if (sprite.getAttribute("code") == "enemy_3Bullet")
		{
			// console.log("enemy_3Bullet");
			game.enemy3BulletConfig = readNodeSprite(sprite);
			game.enemy3Bullet = new Bullet(game.enemy3BulletConfig,game,0,0);
			countImages(game);
		}
		else if (sprite.getAttribute("code") == "bonus")
		{
			// console.log("bonus");
			game.configBonus = readNodeSprite(sprite);
			game.bonus = new Bonus(0,0,game.configBonus,"type",game);
			countImages(game);
			// console.log(game.configBonus);
		}
		else if (sprite.getAttribute("code") == "boss1")
		{
			// console.log("bonus");
			game.configBoss[0] = readNodeSprite(sprite);
			game.configBossStockage[0] = game.configBoss[0];
			countImages(game);
			// console.log(game.configBonus);
		}
		else if (sprite.getAttribute("code") == "boss2")
		{
			// console.log("bonus");
			game.configBoss[1] = readNodeSprite(sprite);
			game.configBossStockage[1] = game.configBoss[1];
			countImages(game);
			// console.log(game.configBonus);
		}
		else if (sprite.getAttribute("code") == "boss3")
		{
			// console.log("bonus");
			game.configBoss[2] = readNodeSprite(sprite);
			game.configBossStockage[2] = game.configBoss[2];
			countImages(game);
			// console.log(game.configBonus);
		}
		else if (sprite.getAttribute("code") == "bossBullet1")
		{
			// console.log("bonus");
			game.bossBullet1Config= readNodeSprite(sprite);
			game.bossBullet1 = new Bullet(game.bossBullet1Config,game,0,0);
			countImages(game);
			// console.log(game.configBonus);
		}
		else if (sprite.getAttribute("code") == "bossBullet2")
		{
			// console.log("bonus");
			game.bossBullet2Config = readNodeSprite(sprite);
			game.bossBullet2 = new Bullet(game.bossBullet2Config,game,0,0);
			countImages(game);
			// console.log(game.configBonus);
		}				
	}		

 	 var backgrounds = xml.getElementsByTagName("background");												
	for(var i=0; i< backgrounds.length; i++)
	{
		var background = backgrounds[i];
		if(background.getAttribute("code") == "background1")//SWITCH
		{
			
			game.background1Config = readNodeBackground(background);
			game.background1 = new Image();
			game.background1.src = game.background1Config.url;
			// console.log("background1");
			countImages(game);
		}
		else if(background.getAttribute("code") == "background2")
		{
			game.background2Config = readNodeBackground(background);
			game.background2 = new Image();
			game.background2.src = game.background2Config.url;
			// console.log("background2");
			countImages(game);
		}
		else if(background.getAttribute("code") == "background0")
		{
			game.background0Config = readNodeBackground(background);
			game.background0 = new Image();
			game.background0.src = game.background0Config.url;
			// console.log("background0");
			countImages(game);
		}
		else if(background.getAttribute("code") == "foreground1")
		{
			game.foreground1Config = readNodeBackground(background);
			game.foreground1 = new Image();
			game.foreground1.src = game.foreground1Config.url;
			// console.log("foreground1");
			countImages(game);
		}
		else if(background.getAttribute("code") == "foreground2")
		{
			game.foreground2Config = readNodeBackground(background);
			game.foreground2 = new Image();
			game.foreground2.src = game.foreground2Config.url;
			// console.log("foreground2");
			countImages(game);
		}
	}

	var hud = xml.getElementsByTagName("hud");																				
	for(var i=0; i < hud.length; i++ )
	{
		if(hud[i].getAttribute("code") == "lifeMeter")
		{
			var lifeMeterConfig = readNodeHud(hud[i]);
			game.lifeMeter = new Image();
			game.lifeMeter.src = lifeMeterConfig.url;
			// console.log("lifeMeter")
			countImages(game);
		}
		else if(hud[i].getAttribute("code") == "lifeMeterFill")
		{
			var lifeMeterFillConfig = readNodeHud(hud[i]);
			game.lifeMeterFill = new Image();
			game.lifeMeterFill.src = lifeMeterFillConfig.url;
			// console.log("lifeMeterFill")
			countImages(game);
		}
		else if(hud[i].getAttribute("code") == "bomb")
		{
			var bombConfig = readNodeHud(hud[i]);
			game.hudBomb = new Image();
			game.hudBomb.src = bombConfig.url;
			// console.log("bomb")
			countImages(game);
		}
		else if(hud[i].getAttribute("code") == "life")
		{
			var lifeConfig = readNodeHud(hud[i]);
			game.hudLife = new Image();
			game.hudLife.src = lifeConfig.url;
			// console.log("life")
			countImages(game);
		}
		else if(hud[i].getAttribute("code") == "feature")
		{
			var featureConfig = readNodeHud(hud[i]);
			game.hudFeature = new Image();
			game.hudFeature.src = featureConfig.url;
			// console.log("life")
			countImages(game);
		}
	}

	var typo = xml.getElementsByTagName("typo");																				
	for(var i=0; i < typo.length; i++ )
	{
		if(typo[i].getAttribute("code") == "letters")
		{
			game.lettersConfig = readNodeTypo(typo[i]);
			game.hudLetters = new Image();
			game.hudLetters.src = game.lettersConfig.url;
			// console.log("letters")
			countImages(game);
		}
		else if(typo[i].getAttribute("code") == "numbers")
		{
			game.numbersConfig = readNodeTypo(typo[i]);
			game.hudNumbers = new Image();
			game.hudNumbers.src = game.numbersConfig.url;
			// console.log("numbers")
			countImages(game);
		}
	}

	var menu = xml.getElementsByTagName("menu");
	// console.log(menu)
	for(var i=0; i<menu.length; i++)
	{
		if(menu[i].getAttribute("code") == "espace")
		{
			game.imagesMenuClavierConfig[1] = readNodeMenu(menu[i]);
			game.imagesMenuClavier[1] = new Image();
			game.imagesMenuClavier[1].src = game.imagesMenuClavierConfig[1].url;
			// console.log("espace")
			countImages(game);
		}
		else if(menu[i].getAttribute("code") == "fleches")
		{
			game.imagesMenuClavierConfig[0] = readNodeMenu(menu[i]);
			game.imagesMenuClavier[0] = new Image();
			game.imagesMenuClavier[0].src = game.imagesMenuClavierConfig[0].url;
			// console.log("fleches")
			countImages(game);
		}
		else if(menu[i].getAttribute("code") == "toucheB")
		{
			game.imagesMenuClavierConfig[2] = readNodeMenu(menu[i]);
			game.imagesMenuClavier[2] = new Image();
			game.imagesMenuClavier[2].src = game.imagesMenuClavierConfig[2].url;
			// console.log("toucheB")
			countImages(game);
		}
		else if(menu[i].getAttribute("code") == "toucheN")
		{
			game.imagesMenuClavierConfig[3] = readNodeMenu(menu[i]);
			game.imagesMenuClavier[3] = new Image();
			game.imagesMenuClavier[3].src = game.imagesMenuClavierConfig[3].url;
			// console.log("toucheN")
			countImages(game);
		}
		else if(menu[i].getAttribute("code") == "toucheV")
		{
			game.imagesMenuClavierConfig[4] = readNodeMenu(menu[i]);
			game.imagesMenuClavier[4] = new Image();
			game.imagesMenuClavier[4].src = game.imagesMenuClavierConfig[4].url;
			// console.log("toucheV")
			countImages(game);
		}
		else if(menu[i].getAttribute("code") == "gamepad")
		{
			game.imageMenuGamepadConfig = readNodeMenu(menu[i]);
			game.imageMenuGamepad = new Image();
			game.imageMenuGamepad.src = game.imageMenuGamepadConfig.url;
			// console.log("gamepad")
			countImages(game);
		}
		else if(menu[i].getAttribute("code") == "isart")
		{
			game.imageMenuAboutConfig = readNodeMenu(menu[i]);
			game.imageMenuAbout = new Image();
			game.imageMenuAbout.src = game.imageMenuAboutConfig.url;
			// console.log("isart")
			countImages(game);
		}
	}

	var music = xml.getElementsByTagName("music");
	for(var i=0; i<music.length; i++)
	{
		if(music[i].getAttribute("code") == "ambiance")
		{
			game.musiqueAmbienceConfig = readNodeMusic(music[i]);
			game.musique = new Howl({
				urls: game.musiqueAmbienceConfig.urls,
				autoplay: true,
				loop: true,
				volume: 0.05,
			});
		// console.log("MUSIC");
		countImages(game);
		}
		
		
	}

}

function readNodeMusic(node)
{
	var objectNode = {};
	objectNode.code = node.getAttribute("code");
	objectNode.urls = [node.getAttribute("url1"), node.getAttribute("url2")];


	return objectNode;
}


function readNodeMenu(node)
{
	var objectNode ={};
	objectNode.code = node.getAttribute("code");
	objectNode.url = node.getAttribute("url");
	objectNode.y = node.getAttribute("y");

	return objectNode;
}


function readNodeTypo(node)
{
	var objectNode ={};
	objectNode.code = node.getAttribute("code");
	objectNode.url = node.getAttribute("url");
	objectNode.nbFrame = node.getAttribute("nbFrame");

	return objectNode;
}

function readNodeHud(node)
{
	var objectNode ={};
	objectNode.code = node.getAttribute("code");
	objectNode.url = node.getAttribute("url");

	return objectNode;
}


function readNodeBackground(node)
{
	var objectNode ={};
	objectNode.code = node.getAttribute("code");
	objectNode.vitesse = node.getAttribute("vitesse");
	objectNode.url = node.getAttribute("url");

	return objectNode;
}

function readNodeSprite(node)
{
	var objectNode = {};
	objectNode.code = node.getAttribute("code");
	objectNode.imageName = node.getAttribute("name");
	objectNode.nbRows = parseInt(node.getAttribute("nbRows"));
	objectNode.nbFrameMax = parseInt(node.getAttribute("nbFrameMax"));
	var anims = node.getElementsByTagName("animation");
	objectNode.anims = [];
	for (var i = 0; i < anims.length; i++){
		var anim = {};
		anim.code = anims[i].getAttribute("code");
		anim.nbFrame = parseInt(anims[i].getAttribute("nbFrame"));
		anim.nbRow = parseInt(anims[i].getAttribute("nbRow"));
		anim.fps = parseFloat(anims[i].getAttribute("FPS"));
		anim.cycle = parseInt(anims[i].getAttribute("cycle"));
		objectNode.anims.push(anim);
	}

	var hitboxs = node.getElementsByTagName("hitbox");
	objectNode.hitboxs = [];
	for (var i = 0; i < hitboxs.length; i++){
		var hitbox = {};
		hitbox.offsetX = parseInt(hitboxs[i].getAttribute("offsetX"));
		hitbox.offsetY = parseInt(hitboxs[i].getAttribute("offsetY"));
		hitbox.width = parseInt(hitboxs[i].getAttribute("width"));
		hitbox.height = parseInt(hitboxs[i].getAttribute("height"));
		objectNode.hitboxs.push(hitbox);
	}
	return objectNode;
}
xmlhttp.onerror = function() {
		console.log("Fail to load XML.");
}


}//fin du window.onload


