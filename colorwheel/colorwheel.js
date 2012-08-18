var colorWheel = function(basecolors, delt, increment) {
	var BASECOLOR_R = basecolors[0] || 0;
	var BASECOLOR_G = basecolors[1] || 0;
	var BASECOLOR_B = basecolors[2] || 0;
	var delta_r = delt || 10;
	var delta_g = delt || 10;
	var delta_b = delt || 10;
	var inc = increment || 10;
	var cycleDef = ['G', 'R', 'B', 'R'];
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
	var setDeltaR = function (delta) {
		delta_r = delta;
	},
	setDeltaG = function (delta) {
		delta_g = delta;
	},
	setDeltaB = function (delta) {
		delta_b = delta;
	};
	var slide_r = function (amount) {
		BASECOLOR[0] = bounded(BASECOLOR_R + Math.floor(delta_r * amount));	
		return BASECOLOR;
	};
	var slide_g = function (amount) {
		BASECOLOR[1] = bounded(BASECOLOR_G + Math.floor(delta_g * amount));
		return BASECOLOR;
	};
	var slide_b = function (amount) {
		BASECOLOR[2] = bounded(BASECOLOR_B + Math.floor(delta_b * amount));
		return BASECOLOR;
	};
	var spin = function(inc) {
		var increment = inc;
		var counter = 1;
		var up = 1;
		var finished = false;
		var checkCounter = function () {
			if (counter <= 0 || counter > increment) {
				finished = true;
				counter = counter > increment ? increment : 0;
			}
		};
		var moveCounter = function () {
			if (up == 1) {
				counter += 1;
			} else {
				counter += -1;
			}
		};
		return {
			up : function () {
				var factor = (Math.PI * counter) / (increment * 2);
				moveCounter();
				checkCounter();
				return Math.sin(factor);
			},
			down: function () {
				var factor = (Math.PI * counter) / (increment * 2);
				moveCounter();
				checkCounter();
				return Math.cos(factor);
			},
			finished: function () {
				return finished;
			},
			reset : function () {
				finished = !finished;
				counter = 1;
			},
			toggleDirection : function () {
				up = up * -1;
			},
			getDirection : function () {
				return up;
			}
		}
	};
	var bounded = function (colorvalue) {
		if (colorvalue < 0) return 0;
		if (colorvalue > 255) return 255;
		return colorvalue;
	};
	var slider = function (inc) {
		var up = true;
		var spinner = spin(inc);
		var getValue = function () {
			return nextval = up ? spinner.up() : spinner.down();
		}
		return {
			nextLoop: function () {
				var nextval = getValue();
				if (spinner.finished()) {
					spinner.reset();
					stepFinished = true;
					up = !up;
				}
				return nextval;
			},
			nextStep: function () {
				return getValue();
			},
			toggle : function() {
				up = !up;
			},
			toggleSpinner : function () {
				spinner.toggleDirection();
			},
			getSpinnerDirection : function () {
				return spinner.getDirection();
			}
		}
	};
	var spinner_r = slider(inc);
	var spinner_g = slider(inc);
	var spinner_b = slider(inc);
	var setSpinners = function (inc) {
		spinner_r = slider(inc);
		spinner_g = slider(inc);
		spinner_b = slider(inc);
	};
	var setDeltas = function (startColor, endColor) {
		delta_r = endColor[0] - startColor[0];
		delta_g = endColor[1] - startColor[1];
		delta_b = endColor[2] - startColor[2];
	};

	setSpinners(inc);
	return {
		getBase : function () {
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
		toString : function () {
			return "rgb(" + BASECOLOR[0] + "," + BASECOLOR[1] + "," + BASECOLOR[2] + ")";
		},
		toHex : function () {
			var r = this.r().toString(16);
			var g = this.g().toString(16);
			var b = this.b().toString(16);
			if (r.length < 2) r = "0" + r;
			if (g.length < 2) g = "0" + g;
			if (b.length < 2) b = "0" + b;
			return "#" + r + g + b;
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
		setCycle : function (array) {
			cycleDef = array;
			return this;
		},
		cycle : function () {
			if (stepFinished) {
				stepFinished = false;
				cycleCount = (cycleCount + 1) % cycleDef.length;
			}
			switch (cycleDef[cycleCount]) {
				case 'R': slide_r(spinner_r.nextLoop()); break;
				case 'G': slide_g(spinner_g.nextLoop()); break;
				case 'B': slide_b(spinner_b.nextLoop()); break;
			}
		},
		step : function () {
			switch (cycleDef[cycleCount]) {
				case 'R': slide_r(spinner_r.nextStep()); break;
				case 'G': slide_g(spinner_g.nextStep()); break;
				case 'B': slide_b(spinner_b.nextStep()); break;
			}
		},
		toggleStep : function () {
			switch (cycleDef[cycleCount]) {
				case 'R': spinner_r.toggleSpinner(); break;
				case 'G': spinner_g.toggleSpinner(); break;
				case 'B': spinner_b.toggleSpinner(); break;
			}
		},
		nextInCycle : function () {
			cycleCount = (cycleCount + 1) % cycleDef.length;
		},
		cycleConcurrent: function () {
			slide_r(spinner_r.nextLoop());
			slide_g(spinner_g.nextLoop());
			slide_b(spinner_b.nextLoop());
		},
		stepConcurrent: function () {
			slide_r(spinner_r.nextStep());
			slide_g(spinner_g.nextStep());
			slide_b(spinner_b.nextStep());
		},
		setTransform : function (startcolor, endcolor, increment) {
			setSpinners(increment);
			this.setBase(startcolor);
			setDeltas(startcolor, endcolor);
		},
		getCurrentSpinnerDirection : function () {
			return this.getSpinnerDirection(cycleDef[cycleCount]);
		},
		getSpinnerDirection : function (color) {
			var direction;
			switch (color) {
				case 'R': direction = spinner_r.getSpinnerDirection(); break;
				case 'G': direction = spinner_g.getSpinnerDirection(); break;
				case 'B': direction = spinner_b.getSpinnerDirection(); break;
			}
			return direction;
		}
	}
};

