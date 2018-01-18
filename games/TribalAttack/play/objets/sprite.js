//Sprite prototype (constructor)
function Sprite(config,game) 
{

	var that = this;
	this.game = game;
	//sert a calculer la frame courante
	this.animFrame = 0;
	//frame a afficher
	this.currentFrame = 0;
	//on recupere l'anim idle qui est la premiere du tableau
	this.currentAnim = config.anims[0];
	
	//on definit une position arbitraire (TODO : faire des MAJ avec les controles)
	this.x = 350;
	this.y = 350;
	//on definit l'image du sprite
	this.image = new Image();
	this.image.src = config.imageName; //on recupere le nom du fichier
	//on attend d'avoir lu l'image
	this.image.onload = function(){
		//!!!THIS => IMAGE (puisque nous sommes dans le image.onload)
		//on definit la taille d'une frame
		that.frameWidth = this.width / config.nbFrameMax;
		that.frameHeight = this.height / config.nbRows;
	}
}

Sprite.prototype.draw = function(context,game){
	this.animFrame++;
	if (this.animFrame % (Math.floor(60 / this.currentAnim.fps)) == 0 )
	{
		if(game.compteurSpacecraftB <=3 || this.currentAnim.cycle != 1) // animation pour aller en bas avec le vaisseau
		 	this.currentFrame ++;

		if (this.currentFrame == this.currentAnim.nbFrame)
			this.currentFrame = 0;
		
	}
	
	context.drawImage(this.image,
		this.currentFrame * this.frameWidth, 
		this.currentAnim.nbRow * this.frameHeight,
		this.frameWidth, this.frameHeight,
		this.x, this.y , this.frameWidth, this.frameHeight)
}
