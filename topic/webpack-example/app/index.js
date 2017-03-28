/*var str = require('./app.js');
document.body.innerHTML = "<div>"+str+"</div>";*/

/*define(["./app.js"],function (str){
	document.body.innerHTML = "<div>"+str+"</div>";	
})*/

var str = require('./app');

require("./css/reset");
require("./css/style");


document.body.innerHTML = "<div>"+str+"</div>";