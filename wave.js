var colorWheel = function(basecolors, delt) {
	var BASECOLOR_R = basecolors[0] || 0;
	var BASECOLOR_G = basecolors[1] || 0;
	var BASECOLOR_B = basecolors[2] || 0;
	var delta_r = delt || 10;
	var delta_g = delt || 10;
	var delta_b = delt || 10;
	var cycleDef = ['G', 'R', 'B', 'R'];
	//var cycleDef = ['B'];
	var cycleCount = 0;
	var next = true;

	var BASECOLOR = [BASECOLOR_R, BASECOLOR_G, BASECOLOR_B];

	var setR = function(r) {
		BASECOLOR[0] = r;
	};
	var setG = function(g) {
		BASECOLOR[1] = g;	
	};
	var setB = function(b) {
		BASECOLOR[2] = b;
	};
	var spin = function(inc) {
	  var increment = inc;	
		var counter = 1;
		var current = 0;
		var finished = false;
		return {
			next : function() {
				var factor = (Math.PI * 2 * counter) / increment;
				current = Math.cos(factor);
//				console.log(current + " counter: " + counter + " increment:" + increment);
				counter = ((counter + 1) % increment);
				if (counter === 0) {
					finished = true;
				}
				return current;
			},
			finished : function () {
				return finished;
			},
			current : function () {
				return current;
			}
		}
	};
	var spinner = spin(10);
	var bounded = function (colorvalue) {
		if (colorvalue < 0) return 0;
		if (colorvalue > 255) return 255;
		return colorvalue;
	};
	return {
		baseColor : function () {
			return BASECOLOR;
		},
		r : function () {
			return BASECOLOR[0];
		},
		g : function () {
			return BASECOLOR[1];
		},
		b : function () {
			return BASECOLOR[2];
		},
		setBase : function (array) {
			BASECOLOR_R = array[0];
			BASECOLOR_G = array[1];
			BASECOLOR_B = array[2];
			for (var i = 0; i < BASECOLOR.length; i++) {
				BASECOLOR[i] = array[i];
			}
			return this;
		},
		slideR : function (inc) {
			BASECOLOR[0] = bounded(BASECOLOR_R + Math.floor(delta_r * inc));	
			return BASECOLOR;
		},
		slideG : function (inc) {
			BASECOLOR[1] = bounded(BASECOLOR_G + Math.floor(delta_g * inc));
			return BASECOLOR;
		},
		slideB : function (inc) {
			BASECOLOR[2] = bounded(BASECOLOR_B + Math.floor(delta_b * inc));
			return BASECOLOR;
		},
		cycle : function () {
			if (spinner.finished()) {
				cycleCount = (cycleCount + 1) % cycleDef.length;
				spinner = spin(10);
			}
			switch (cycleDef[cycleCount]) {
				case 'R': this.slideR(spinner.next()); break;
				case 'G': this.slideG(spinner.next()); break;
				case 'B': this.slideB(spinner.next()); break;
			}
		}
	}
};

var basecolors = [50, 50, 200];

function startAnim(e) {
	e.target.style.opacity = 100;
	// start color swirling -- cycle through blues
	//var parse = /(\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})/;
	//var colorArray = parse.exec(color);
	
	var colors = colorWheel(basecolors, 50);	
	e.target.interval = setInterval(function () { 
			colors.cycle();
			e.target.style.backgroundColor = "rgb(" + colors.r() +", "+ colors.g() + ", " + colors.b() + ")";
			//console.log(e.target.style.backgroundColor);
		}, 100);
}

function endAnim(e) {
	// end color swirling (use new prop on elem?)
	clearInterval(e.target.interval);
	e.target.style.backgroundColor = "#eee";
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
