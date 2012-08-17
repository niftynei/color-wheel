var basecolors = [30, 150, 200];

function startAnim(e) {
	e.target.style.opacity = 100;
	var colors = colorWheel(basecolors, 50);	
	if (!e.target.interval) {
		e.target.interval = setInterval(function () { 
				colors.cycle();
				e.target.style.backgroundColor = "rgb(" + colors.r() +", "+ colors.g() + ", " + colors.b() + ")";
			}, 100);
		} else {
			clearInterval(e.target.interval);
			e.target.interval = undefined;
		}
}

function endAnim(e) {
	e.target.style.opacity = 0.75;
}

function load() {
	var elems = document.getElementsByTagName("div");
	for (var i = 0; i < elems.length; i++) {
		elems[i].addEventListener('mouseover', startAnim, false);
		elems[i].addEventListener('mouseout', endAnim, false);
	}
}

window.addEventListener('load', load, false);
