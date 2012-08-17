# Color Wheel  
### A JavaScript library for dynamic color transformations

This library provides smooth transformations between color values.  

### To use:

1. Declare your base colors [R, G, B]: `var basecolors = [30, 150, 200]`
2. Choose a delta for the transformation. Valid values are 0 to 255.  
Note, this increments upward.  If your base values start at 255, they'll stay at 255.
3. Create a new color wheel `colors = colorwheel(basecolors, delta)`
3. Define a cycle. `colors.setCycle(['R', 'G', 'R', 'B'])`
4. Cycle through the defined cycle. `colors.cycle()`

Note: Not cross browser tested.
