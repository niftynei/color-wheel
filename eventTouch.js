function load(e) {
	console.log("functionloaded");
	var txtbox = document.getElementById('textbox');
	var checkbox = document.getElementById('checkbox');
	var radiobutton = document.getElementById('radiobutton');
	var button = document.getElementById('button');
	var div = document.getElementById('div');
	var innerDiv = document.getElementById('innerDiv');
	var messageBox = document.getElementById('messageBox');
	var body = document.getElementsByTagName('body')[0];
}
function click(e) {
	console.log("clicked on " + e.target.id);
	//e.stopPropagation;
}
function handler(e) {
	console.log("event type: " + e + " from:" + this.id + " target: " + e.target.id);
	//e.stopPropagation();
}

window.addEventListener('load', load, false);
innerDiv.addEventListener('click', handler, false);
innerDiv.addEventListener('click', click, false);
div.addEventListener('click', handler, false);
txtbox.addEventListener('blur', handler, false);
txtbox.addEventListener('change', handler, false);
body.addEventListener('contextmenu', handler, false);
div.addEventListener('dblclick', handler, false);
txtbox.addEventListener('focus', handler, false);

//.addEventListener('keypress', handler, false);
//.addEventListener('keyup', handler, false);
//.addEventListener('keydown', handler, false);
//.addEventListener('mousedown', handler, false);
//.addEventListener('mouseenter', handler, false);
//.addEventListener('mouseleave', handler, false);
//.addEventListener('mousemove', handler, false);
//.addEventListener('mouseout', handler, false);
//.addEventListener('mouseup', handler, false);
//.addEventListener('mousewheel', handler, false);
//.addEventListener('paste', handler, false);
//.addEventListener('cut', handler, false);
//.addEventListener('copy', handler, false);
//.addEventListener('reset', handler, false);
//.addEventListener('resize', handler, false);
//.addEventListener('scroll', handler, false);
//.addEventListener('select', handler, false);
//.addEventListener('submit', handler, false);
//.addEventListener('textinput', handler, false);
//.addEventListener('unload', handler, false);
//.addEventListener('wheel', handler, false);
console.log("script run");
