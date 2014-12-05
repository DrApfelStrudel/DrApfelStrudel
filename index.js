
/**
 * @name DrApfelStrudel
 * @module Sounds
 */
 
 export function sine(t, n) {
   return Math.sin(t * note(n) * Math.PI);
 }
 
 export function vibrato(synth, str, speed) {
   return function(t, n) {
     var vib = Math.sin(t * Math.PI * speed) * str;
     return synth(t, n + vib);
   }
 }
 
 export function harmonic(synth) {
   return function(t, n) {
     return synth(t, n) * 0.7 + synth(t, n+12) * 0.2 + synth(t, n+24) * 0.1; 
   }
 }
 
 export function simDetune(synth, detune) {
   return function(t, n) {
     return synth(t, n) * 0.8 + synth(t+0.1, n+detune) * 0.2;
   }
 }
 
 export function square(t, n) {
   var sineVal = sine(t, n);
   if (sineVal >= 0) return 1;
   return -1;
 }
 
 export function Sound(start, end, syn, not, volume) {
  var synth = syn;
  var vol = volume || 0;
  var note = not || 0;
  var attack = 0;
  var release = 0;
  var length = end - start;
  
  function play(t) {
    var shouldPlay = start <= t && t <= end + release;
    if (!shouldPlay || !synth) return 0;
    var currentTime = t - start;
    var currentAttack = attack === 0 ? 1 :
                        (currentTime <= attack ?
                        currentTime/attack
                        : 1);
    var currentRelease = release === 0 ? 1 :
                         currentTime === 0 ? 1 :
                         (currentTime >= length ?
                         1 - (1/release)*(currentTime-length) : 1);
                        
    return currentRelease * currentAttack * synth(currentTime, note) * vol; 
  }
  
  function getStart() {
    return start;
  }
  
  function getEnd() {
    return end + release;
  }
  
  function setSynth(syn) {
    synth = syn;
  }
  
  function setAttack(t) {
    attack = t;
  }
  
  /* How many time units after the key release 
     the key should ring for */
  function setRelease(t) {
    release = t;
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
  this.setAttack = setAttack;
  this.setRelease = setRelease;
}
 
export function Track() {
  var mainVol = 1;
  var sounds = [];
  var save = [];

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
    if(save[t] !== undefined) return save[t];
    var timeSound = sounds[Math.floor(t*4)];
    if (timeSound) {
      var sum = 0;
      for (var i = 0; i < timeSound.length; i++) {
        sum += timeSound[i].play(t);
      }
      save[t] = sum * mainVol;
      return sum * mainVol;
    }
    else {
      save[t] = 0;
      return 0;
    }
  }
  
  this.play = play;
  this.addSounds = addSounds;
}

function note(n) {
  return 440 * Math.pow (Math.pow (2, 1/12), n);
}
