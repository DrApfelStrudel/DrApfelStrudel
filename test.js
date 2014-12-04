
/**
 * @DrApfelStrudel
 * Track environment
 */

import { Sound, Track, sine, square, simDetune, harmonic } from "./index";

var t1 = new Track();
var u = undefined;

var synthNodes = [0, u, 7, 10, 7, 3, 0, -2
                 ,3, u, 7, 10, 12, 3, 0, -2
                 ,0, u, 3, 8, 7, 3, 2, 0
                 ,-2, u, 3, 7, 10, 3, 7, u];
                 
var bassNodes = [-24, -24, -12, -12, -24, -24, -12, -12
                ,-24, -24, -12, -12, -24, -24, -12, -12
                ,-28, -28, -16, -16, -28, -28, -16, -16
                ,-26, -26, -14, -14, -26, -26, -14, -14];
                
var synthSounds = [];
var bassSounds = [];

for (var i = 0; i < synthNodes.length; i++) {
  if (!synthNodes) continue;
  var s = new Sound(i/8, i/8 + 0.125, harmonic(simDetune(square,0.15)), synthNodes[i], 0.2);
  synthSounds.push(s);
}

for (var i = 0; i < bassNodes.length; i++) {
  var s = new Sound(i/8, i/8 + 0.125, simDetune(square,0.1), bassNodes[i], 0.2);
  bassSounds.push(s);
}

t1.addSounds(synthSounds);
//t1.addSounds(bassSounds);


export function dsp(t) {
  return t1.play(t%4);
}
