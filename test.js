
/**
 * @DrApfelStrudel
 * Track environment
 */

import { Sound, Track, sine, square
       , simDetune, harmonic, vibrato
       , Organ} from "./index";

var t1 = Track1();

var testTrack = new Track(8);
testTrack.addSounds([Organ(0, 4, -12, 0.15)]);
testTrack.addSounds([Organ(0, 4, 0, 0.15)]);
testTrack.addSounds([Organ(0, 4, 3, 0.15)]);
testTrack.addSounds([Organ(0, 4, 7, 0.15)]);
testTrack.addSounds([Organ(0, 4, 10, 0.15)]);
testTrack.addSounds([Organ(0, 4, 14, 0.15)]);

testTrack.addSounds([Organ(4, 8, -17, 0.15)]);
testTrack.addSounds([Organ(4, 8, -5, 0.15)]);
testTrack.addSounds([Organ(4, 8, -2, 0.15)]);
testTrack.addSounds([Organ(4, 8, 2, 0.15)]);
testTrack.addSounds([Organ(4, 8, 5, 0.15)]);
testTrack.addSounds([Organ(4, 8, 9, 0.15)]);

for(var i = 0; i < 8; i += 0.5) {
  var kick = new Sound(i, i+0.125, sine, -42, 0.4);
  var kick2 = new Sound(i, i+0.125, sine, -30, 0.4);
  kick.setRelease(0.1);
  kick2.setRelease(0.1);
  t1.addSounds([kick, kick2]);
}

/*
    Track1 needs a bit loading time
*/
export function dsp(t) {
  return t1.play(t);
}

/* WIP */
function Track1() {
  var t1 = new Track(4); 
  var u = undefined;

  var synthNodes = [0, u, 7, 10, 7, 3, 0, -2
                   ,3, u, 7, 10, 12, 3, 0, -2
                   ,0, u, 3, 8, 7, 3, 2, 0
                   ,-2, u, 3, 7, 10, 3, 7, u];
                 
  var bassNodes = [-24, -24, -12, -12, -24, -24, -12, -12
                  ,-24, -24, -12, -12, -24, -24, -12, -12
                  ,-28, -28, -16, -16, -28, -28, -16, -16
                  ,-26, -26, -14, -14, -26, -26, -14, -14];
                
  var leadNodes = [12, 15, 19, 22, 24, 27, 26, 26, 24, 24, 19, 19];
                
  var synthSounds = [];
  var bassSounds = [];
  var leadSounds = [];

  for (var i = 0; i < synthNodes.length; i++) {
    if (synthNodes[i] === undefined) continue;
      var s = new Sound(i/8, i/8 + 0.125, harmonic(simDetune(square,0.15)), synthNodes[i]+8, 0.2);
      s.setRelease(0.2);
      synthSounds.push(s);
  }

  for (var i = 0; i < bassNodes.length; i++) {
    var s = new Sound(i/8, i/8 + 0.125, simDetune(square,0.1), bassNodes[i]+8, 0.15);
    bassSounds.push(s);   
    s = new Sound(i/8, i/8 + 0.125, simDetune(sine,0.1), bassNodes[i]-4, 0.15);
    bassSounds.push(s);
    
  }

  for (var i = 0; i < leadNodes.length; i++) {
    var s = new Sound(i/4, i/4 + 0.25, harmonic(vibrato(simDetune(square,0.1), 0.006, 8)), leadNodes[i]+8, 0.12);
    s.setRelease(0.25);
    s.setAttack(0.02);
    leadSounds.push(s);
  }

  t1.addSounds(synthSounds);
  t1.addSounds(bassSounds);
  t1.addSounds([Organ(0, 4, 20, 0.15)])
  //t1.addSounds(leadSounds); 
  return t1;
}
