var basecolors = [30, 150, 200];

function startAnim(e) {
	e.target.style.opacity = 100;
	var colors = colorWheel(basecolors, 50);	
	if (!e.target.interval) {
		e.target.interval = setInterval(function () { 
				colors.cycle();
				e.target.style.backgroundColor = "rgb(" + colors.r() +", "+ colors.g() + ", " + colors.b() + ")";
				//console.log(e.target.style.backgroundColor);
			}, 100);
		} else {
			clearInterval(e.target.interval);
			e.target.interval = undefined;
		}
}

function endAnim(e) {
	// end color swirling (use new prop on elem?)
	//if (e.target.interval) {
	//	clearInterval(e.target.interval);
	//}
	e.target.style.opacity = 0.75;
}

function load() {
	console.log("load elements");
	// for each div element on the page, attach a listener
	var elems = document.getElementsByTagName("div");
	for (var i = 0; i < elems.length; i++) {
		//elems[elem].addEventListener('mouseenter', startAnim, false);
		//elems[elem].addEventListener('mouseleave', endAnim, false);
		elems[i].addEventListener('mouseover', startAnim, false);
		elems[i].addEventListener('mouseout', endAnim, false);
	}
}

window.addEventListener('load', load, false);
