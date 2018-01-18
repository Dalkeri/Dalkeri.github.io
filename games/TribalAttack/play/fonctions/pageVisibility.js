var hidden, visibilityChange, visible = 1; 
if (typeof document.hidden !== "undefined") 
{ // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
  // visible = 0;
} 
else if (typeof document.mozHidden !== "undefined")
{
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
  // visible = 0;
} 
else if (typeof document.msHidden !== "undefined") 
{
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
  // visible = 0;
} 
else if (typeof document.webkitHidden !== "undefined") 
{
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
  // visible = 0;
}

function handleVisibilityChange(game) 
{
  if (document[hidden]) {
    visible = 0;
  } else {
    visible = 1;
  }
}
// console.log(hidden, visibilityChange)
document.addEventListener(visibilityChange, handleVisibilityChange, false);