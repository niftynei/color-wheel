# Color Wheel  
### A JavaScript library for dynamic color transformations

This library provides smooth transformations between color values.  

### To use:

1. Declare your base colors [R, G, B]: `var basecolors = [30, 150, 200]`
2. Choose a delta for the transformation. Valid values are 0 to 255.  
Note, this increments upward.  If your base values start at 255, they'll stay at 255.
3. Create a new color wheel `colors = colorwheel(basecolors, delta)`
3. Define a cycle. `colors.setCycle(['R', 'G', 'R', 'B'])`
4. Walk through the cycle `colors.cycle()`

### Examples

Using a step function: http://knapsenterprises.com/colorwheel/waves.html

Using a cycle function: http://knapsenterprises.com/colorwheel/scroll.html

Using the transition function: http://knapsenterprises.com/colorwheel/blur.html

### Using

#### Including the library
Include `<script src="/path/to/file/colorwheel.js" type="text/javascript"></script>` on your page.

#### Instatiating a colorwheel

`colorWheel(basecolor, delta, increment)`

Where `basecolor` is the starting base point for a color transformation, `delta` is the amount each of the color axis should be toggled, and `increment` is the number of steps or cycles it takes to reach the delta.

### Methods

#### getBase()

Returns an array of the current RGB color values.

#### setBase(array)

Sets the Base color and current color to provided array of RGB color values. Ex: `array = [123, 233, 12]`

#### r()

Returns current R value.

#### g() 

Returns current G value.

#### b()

Returns current B value.

#### toString()

Returns the current RGB color value, in attribute ready form.  Ex: `"rgb(123, 233, 12)"`

#### toHex()

Returns the current RGB color value as a Hex code. Value returned is a string.  Ex: `#01FA12`

#### setCycle(array)

Sets the points to walk between while using the cycle function.  First occurrence slides up the delta value.  Second occurrence slides down the delta value.  `array = ['R', 'G', 'R', 'B'[`

#### cycle()

Generate the next color value using the defined color cycle.  This will set the current color to the next color in the transition.  Cycles infinitely.  Colors can be retrieved after cycle by using `toString()` or `toHex()`

#### step()

Generate the next color value using the current color in the color cycle.  The color stops incrementing once the maximum delta has been reached.  The direction that step moves can be toggled by calling `toggleStep()`.  The color can be advanced by calling `nextInCycle()`.  Colors can be retrieved after step with `toString()` or `toHex()`.

#### toggleStep()

Changes the direction of the step for the current color direction.  Note: using this with cycle() may produce unintended effects.

#### nextInCycle()

Advances the cycle to the next color, as defined by the set color cycle.  The default cycle is `['R', 'G', 'R', 'B']`.  

#### cycleConcurrent()

Sets the color forward by one step for all color values.  Cycles back to the starting point on reaching the maximum delta.

#### stepConcurrent() 

Sets the color forward by one step for all color values. Stops advancing when maximum delta is reached.  

#### setTransform(startcolor, endcolor, increment)

Sets up a cycle between two given colors.  A concurrent function should be used to cycle through this transformation.

#### getCurrentSpinnerDirection() 

Returns the direction (up or down) of the current color for the next step.

#### getSpinnerDirection(color)

Returns the direction (1 or -1) of the given color.  Ex: `color = 'R'`
