


function save(game)
{
	if (localStorage) // Le navigateur supporte le localStorage
	{ 
		console.log("jeu sauvegarde");
		localStorage['Score'] = game.score;
	} 
	else 
	{
		console.log("SAUVEGARDE SCORE IMPOSSIBLE : Pas de localStorage");
	}
}