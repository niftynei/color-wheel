// TODO: spin colors by direction (left, up || right, down)
//	 will require a rewrite of colorwheel

var colors = [0, 0, 0];
var colorSteps = [['G'],['R'],['B']];
var colorStep = 0;
var colors = colorWheel(colors, 255, 50);
colors.setCycle(colorSteps[2]);

var directionChanged = function () {
 	
 return false;
}

var scroll = function (e) {
	e.preventDefault();
	if (e.target.id === "scroll") {
		if (directionChanged()) {
			colors.toggleStep();
		};
		colors.step();
		e.target.style.backgroundColor = colors.toString();
		document.getElementsByTagName("p")[0].innerHTML = colors.toHex();
	}
}

var changeColors = function (e) {
	colors.setCycle(colorSteps[colorStep]);
	colorStep = (colorStep + 1) % colorSteps.length;
}

var load = function () {
	var scroll = document.getElementById("scroll");
	scroll.addEventListener('click', changeColors, false);
}

window.addEventListener('mousewheel', scroll, false);
window.addEventListener('load', load, false);
