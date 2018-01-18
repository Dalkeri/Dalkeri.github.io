

drawCharacter = function(context,pos,c,size,game) {
	var frameWidth = game.hudLetters.width / game.lettersConfig.nbFrame;
	if(c.charCodeAt() >= 'a'.charCodeAt() && c.charCodeAt() <= 'z'.charCodeAt()) {
		var offset = c.charCodeAt() - 'a'.charCodeAt();
		// var frameWidth = game.hudLetters.width / game.lettersConfig.nbFrame;
		context.drawImage(game.hudLetters, offset * frameWidth,
						0, frameWidth, game.hudLetters.height,
						pos.x,pos.y, frameWidth * size, game.hudLetters.height * size);
		
	}
	else if(c == "!")
	{
		// var frameWidth = game.hudLetters.width / game.lettersConfig.nbFrame;
		context.drawImage(game.hudLetters, 27 * frameWidth,
						0, frameWidth, game.hudLetters.height,
						pos.x,pos.y, frameWidth * size, game.hudLetters.height * size);
	}
	else if(c == "?")
	{
		// var frameWidth = game.hudLetters.width / game.lettersConfig.nbFrame;
		context.drawImage(game.hudLetters, 26 * frameWidth,
						0, frameWidth, game.hudLetters.height,
						pos.x,pos.y, frameWidth * size, game.hudLetters.height * size);
	}
	else if(c == ".")
	{
		// var frameWidth = game.hudLetters.width / game.lettersConfig.nbFrame;
		context.drawImage(game.hudLetters, 28 * frameWidth,
						0, frameWidth, game.hudLetters.height,
						pos.x,pos.y, frameWidth * size, game.hudLetters.height * size);
	}
	else if(c == ":")
	{
		// var frameWidth = game.hudLetters.width / game.lettersConfig.nbFrame;
		context.drawImage(game.hudLetters, 29 * frameWidth,
						0, frameWidth, game.hudLetters.height,
						pos.x,pos.y, frameWidth * size, game.hudLetters.height * size);
	}
	else if(c == ",")
	{
		// var frameWidth = game.hudLetters.width / game.lettersConfig.nbFrame;
		context.drawImage(game.hudLetters, 30 * frameWidth,
						0, frameWidth, game.hudLetters.height,
						pos.x,pos.y, frameWidth * size, game.hudLetters.height * size);
	}
	else if(c == "-")
	{
		// var frameWidth = game.hudLetters.width / game.lettersConfig.nbFrame;
		context.drawImage(game.hudLetters, 31 * frameWidth,
						0, frameWidth, game.hudLetters.height,
						pos.x,pos.y, frameWidth * size, game.hudLetters.height * size);
	}
	else if(c == '"')
	{
		// var frameWidth = game.hudLetters.width / game.lettersConfig.nbFrame;
		context.drawImage(game.hudLetters, 32 * frameWidth,
						0, frameWidth, game.hudLetters.height,
						pos.x,pos.y, frameWidth * size, game.hudLetters.height * size);
	}

}

drawNumber = function(context,pos,n,size,game) {
		var frameWidth = game.hudNumbers.width / game.numbersConfig.nbFrame;
		context.drawImage(game.hudNumbers,n * frameWidth,
						0, frameWidth, game.hudNumbers.height,
						pos.x,pos.y, frameWidth * size,game.hudNumbers.height * size);
 }



drawString = function(context,origine,string,size,game) {
	var pos = {x:origine.x,y:origine.y};
	for(var i=0;i<string.length;i++) {
		if(string[i].charCodeAt() >= '0'.charCodeAt() && string[i].charCodeAt() <= '9'.charCodeAt()) { //un nombre
			this.drawNumber(context,pos,parseInt(string[i]),size,game);
			pos.x += (game.hudNumbers.width / game.numbersConfig.nbFrame ) * size;
		}
		else 
		{
			this.drawCharacter(context,pos,string[i],size,game);
			pos.x += (game.hudLetters.width / game.lettersConfig.nbFrame ) * size;
		}
	}
}
