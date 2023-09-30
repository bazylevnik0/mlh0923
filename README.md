# mlh0923<br>
set and play a system of objects with gravity connection<br>
<br>
gravitation of law f = k(g)*m1*m2/r^2<br>
k(g) - gravitational constant<br>
<br>
gravity not a force but a curvature(shape) of the space<br>
more mass - more curvature<br>

--------------------------------------------------------<br>
tech: canvas, button<br>
-canvas with handling the position of touching(clicking) and the time of touching<br>
*for creating an object with the position and the size(time)<br>
-button switch: start/stop animation<br>
*need setInterval<br>
<br>
structure:<br>
array - arr []<br>
class - object {x,y,size}<br>
time  - object with functions:<br>
1)recalc - need algorithm for to measure of shift for each object
*maybe naive - just thoughts: sort with size comparing, and iterate from biger to smallest, with recalculating interaction only in iterates pair(current and last), not sure about it is true or not - but it is only one in my head. reason - all objects will go to the biggest(first) like a chain not a heap<br>
2)start animation<br>
3)pause animation<br>
--------------------------------------------------------<br>
*making with Poe participating(LM)