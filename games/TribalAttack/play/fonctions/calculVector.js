function CalculVector(xE,yE,xV,yV) // xE1 et yE1 -> coordonnées de l'enemy, xV2 et yV2 -> coordonnées du vaisseau / leurre
{
	this.xE = xE;
	this.yE = yE;

	this.xV = xV;
	this.yV = yV;
	var norme = NormeVect();
	this.res = { x:(this.xV - this.xE)/norme, y: (this.yV - this.yE)/norme};

	return this.res;
}


// calcul la norme du vecteur
function NormeVect()
{
	return Math.sqrt( ((this.xE - this.xV) * (this.xE - this.xV))  +  ((this.yE - this.yV) * (this.yE - this.yV)) );
}