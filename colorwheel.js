var colorWheel = function(basecolors, delt, increment) {
	var BASECOLOR_R = basecolors[0] || 0;
	var BASECOLOR_G = basecolors[1] || 0;
	var BASECOLOR_B = basecolors[2] || 0;
	var delta_r = delt || 10;
	var delta_g = delt || 10;
	var delta_b = delt || 10;
	var inc = increment || 10;
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
	var spinner_r = slider(inc);
	var spinner_g = slider(inc);
	var spinner_b = slider(inc);
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
			console.log(cycleDef);
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

