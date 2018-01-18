function Shield(config,game)
{
	Sprite.call(this,config,game);
	this.config = config;
	this.speed = 5;
	this.game = game;

	this.lastShoot = Date.now();
	this.shootTimer = 250;

	this.pdv = 15;
	this.vieTotale = 15;
	this.isAlive = 1;

	this.x = game.spacecraft.x -10;
	this.y = game.spacecraft.y;

} 


// Important Inheritance Stuff
Shield.prototype = Object.create(Sprite.prototype); 
Shield.prototype.constructor = Shield; 


Shield.prototype.move = function(game){
	this.x = game.spacecraft.x -10;
	this.y = game.spacecraft.y;
	if(this.pdv == 0)
		this.isAlive = 0;
	
}// fin du move



// // GERE LES COLLISIONS AVEC LES ENEMY / BONUS
// Spacecraft.prototype.collision = function(objetA, hitboxA, objetB, hitboxB, game){ 
	
// 		if(checkCollision(objetA, hitboxA, objetB, hitboxB))
// 		{
// 			// dès qu'on rentre dans un enemy, il est détruit ( sauf le boss )
// 			if(objetB.currentAnim.code == "idle" || objetB.currentAnim.code == "hit") 
// 			{
// 				objetB.pdv = 0;
// 				if(Date.now() - game.lastHitSpacecraft > game.dureeInvincibilite)
// 				{
// 					this.pdv --;
// 					game.lastHitSpacecraft = Date.now();
// 				}
// 			}
// 		}
// }


