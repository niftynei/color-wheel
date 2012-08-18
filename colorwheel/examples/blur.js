var basecolor = [255, 136, 174];
var targetcolor = [255, 136, 0];

function getColors (string) {
	var parse = /\D*(\d+) *, *(\d+) *, *(\d+)/;
	var values = parse.exec(string);
	return values.slice(1,4).map(function (x) { return parseInt(x) });
}

function startAnim(e) {
	e.target.style.opacity = 100;
	var colors = colorWheel(basecolor);
	colors.setTransform(getColors(e.target.style.backgroundColor),targetcolor, 50);
	if (e.target.interval) {
		clearInterval(e.target.interval);	
	}
	e.target.interval = setInterval(function () { 
			colors.stepConcurrent();
			e.target.style.backgroundColor = colors.toString();
		}, 50);
}

function endAnim(e) {
	if (e.target.interval) {
		clearInterval(e.target.interval);
		e.target.interval = undefined;
	} 
	var newbase = getColors(e.target.style.backgroundColor);
	var colors = colorWheel(newbase);
	colors.setTransform(newbase, basecolor, 100);
	e.target.interval = setInterval(function () {
		colors.stepConcurrent();
		e.target.style.backgroundColor = colors.toString();
	}, 200);
}

function write(e) {
	e.target.value = "blur";
}

function load() {
	var elems = document.getElementsByTagName("input");
	for (var i = 0; i < elems.length; i++) {
		elems[i].addEventListener('focus', startAnim, false);
		elems[i].addEventListener('blur', endAnim, false);
		elems[i].style.backgroundColor = "rgb(" + basecolor[0] +"," + basecolor[1] + "," + basecolor[2] + ")";
	}
	elems[elems.length-1].addEventListener('blur', write, false);
}

window.addEventListener('load', load, false);
