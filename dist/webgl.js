var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

/**
 * Setting up css styling
 */
//To style with JS document.getElement.style.property = new style
c.style.backgroundColor = 'silver';
// c.style.height = '100%';
// c.style.width = '100%';
// c.style.minHeight = '500px';
// c.style.minWidth = '500px';
c.height = 670;//window.screen.availHeight;
c.width = window.screen.availWidth
/** End **/

ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();