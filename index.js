
/**
 * @name DrApfelStrudel
 * @module Sounds
 */
 
 export function sine(t, n) {
   return Math.sin(t * note(n) * Math.PI);
 }
 
 export function simDetune(synth, detune) {
   return function(t, n) {
     return synth(t, n) * 0.8 + synth(t+0.1, n+detune) * 0.2;
   }
 }
 
 export function square(t, n) {
   var sineVal = sine(t, n);
   if (sineVal >= 0) return 1
   return -1;
 }
 
 export function Sound(start, end, syn, not, volume) {
  var synth = syn;
  var vol = volume || 0;
  var note = not || 0;
  
  function play(t) {
    var shouldPlay = start <= t && t <= end;
    if (!shouldPlay || !synth) return 0;
    
    return synth(t, note) * vol; 
  }
  
  function getStart() {
    return start;
  }
  
  function getEnd() {
    return end;
  }
  
  function setSynth(syn) {
    synth = syn;
  }
  
  function setNote(n) {
    note = n;
  }
  
  function setVol(v) {
    vol = v;
  }
  
  this.setVol = setVol;
  this.play = play;
  this.getStart = getStart;
  this.getEnd = getEnd;
  this.setSynth = setSynth;
  this.setNote = setNote;
}
 
export function Track() {
  var mainVol = 1;
  var sounds = [];
  var speed = 1;
  
  function addSounds(sounds) {
    for (var i = 0; i < sounds.length; i++) {
      addSound(sounds[i]);
    }
  }
  
  function addSound(sound) {
    for (var i = Math.floor(sound.getStart()); i < sound.getEnd()*4; i++) {
      if (sounds[i]) {
        sounds[i].push(sound);
      }
      else {
        sounds[i] = [sound];
      }
    }
  }
  
  function play(t) {
    var timeSound = sounds[Math.floor(t*4)];
    var t = t * speed;
    if (timeSound) {
      var sum = 0;
      for (var i = 0; i < timeSound.length; i++) {
        sum += timeSound[i].play(t);
      }
      return sum * mainVol;
    }
    else {
      return 0;
    }
  }
  
  function setSpeed(s) {
    speed = s;
  }
  
  this.play = play;
  this.addSounds = addSounds;
  this.setSpeed = setSpeed;
}

function note(n) {
  return 440 * Math.pow (Math.pow (2, 1/12), n);
}
