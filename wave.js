var colorWheel = function(basecolors, delt) {
	var BASECOLOR_R = basecolors[0] || 0;
	var BASECOLOR_G = basecolors[1] || 0;
	var BASECOLOR_B = basecolors[2] || 0;
	var delta_r = delt || 10;
	var delta_g = delt || 10;
	var delta_b = delt || 10;
	var cycleDef = ['G', 'R', 'B', 'R'];
//	var cycleDef = ['B'];
	var cycleCount = 0;
	var stepFinished = false;

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
				var factor = (Math.PI * counter) / (increment * 2);
				current = Math.sin(factor);
				counter = ((counter + 1) % increment);
				if (counter === 0) {
					finished = true;
				}
				return current;
			},
			finished : function () {
				return finished;
			}
		}
	};
	var spinc = function(inc) {
		var increment = inc;
		var counter = 1;
		var current =0;
		var finished = false;
		return {
			next: function () {
				var factor = (Math.PI * counter) / (increment * 2);
				current = Math.cos(factor);
				counter = ((counter + 1) % increment);
				if (counter === 0) { finished = true; };
				return current;
			},
			finished: function () {
				return finished;
			}
		}
	}
	var bounded = function (colorvalue) {
		if (colorvalue < 0) return 0;
		if (colorvalue > 255) return 255;
		return colorvalue;
	};
	var slider = function (inc) {
		var up = true;
		var spinup = spin(inc);
		var spindown = spinc(inc);
		return {
			nextInc: function () {
				var nextval;
				if (up) {
					nextval = spinup.next();
					if (spinup.finished()) {
						spinup = spin(inc);
						stepFinished = true;
						up = !up;
					}
				} else {
					nextval = spindown.next();
					if (spindown.finished()){
						spindown = spinc(inc);
						stepFinished = true;
						up = !up;
					}
				}
				return nextval;
			},
			toggle : function() {
				up = !up;
			}
		}
	};
	var spinner_r = slider(10);
	var spinner_g = slider(10);
	var spinner_b = slider(10);
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
			if (stepFinished) {
				stepFinished = false;
				cycleCount = (cycleCount + 1) % cycleDef.length;
			}
			switch (cycleDef[cycleCount]) {
				case 'R': this.slideR(spinner_r.nextInc()); break;
				case 'G': this.slideG(spinner_g.nextInc()); break;
				case 'B': this.slideB(spinner_b.nextInc()); break;
			}
		},
		cycleConcurrent: function () {
			this.slideR(spinner_r.nextInc());
			this.slideG(spinner_g.nextInc());
			this.slideB(spinner_b.nextInc());
		}
	}
};

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
