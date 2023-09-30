# mlh0923
set and play a system of objects with gravity connection

gravitation of law f = k(g)*m1*m2/r^2
k(g) - gravitational constant

gravity not a force but a curvature(shape) of the space
more mass - more curvature

--------------------------------------------------------
tech: canvas, button
-canvas with handling the position of touching(clicking) and the time of touching
*for creating an object with the position and the size(time)
-button switch: start/stop animation
*need setInterval

structure:
array - arr []
class - object {x,y,size}
time  - object with functions:
1)recalc - need algorithm for to measure of shift for each object
*maybe naive - just thoughts: sort with mass comparing, and iterate from biger to smallest, with recalculating interaction only in iterates pair(current and last), not sure about it is true or not - but it is only one in my head.
2)start animation
3)pause animation