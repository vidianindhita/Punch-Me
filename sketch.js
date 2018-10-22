var xspacing = 16;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude = 75.0; // Height of wave
var period = 500.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave

var imageMe;

let backPlayer = new Tone.Player("assets/sounds/sound1.mp3");
let player = new Tone.Sampler({"G1": "assets/sounds/sound1.mp3"});
let player2 = new Tone.Player("assets/sounds/sound2.mp3");
let samplerPlayer2 = new Tone.Sampler({"E1": "assets/sounds/sound2.mp3"});
let player3 = new Tone.Player("assets/sounds/sound2.mp3");


backPlayer.loop = true;
backPlayer.retrigger = true;

player2.loop = true;
player2.retrigger = true;

player3.loop = true;
player3.retrigger = true;

backPlayer.toMaster();
player.toMaster();
player2.toMaster();
player3.toMaster();
samplerPlayer2.toMaster();

function preload() {
  imageMe = loadImage("assets/image/me.png");
}

function setup() {
  createCanvas(windowWidth, 530);

	console.log("Play spacebar to start/stop. Mouse left and right to change speed. Click to reverse");

  w = width+16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));

  backPlayer.start();
}

function draw() {
  background(0);
  calcWave();
  renderWave();
  image(imageMe, 400, 270);

  backPlayer.playbackRate = map(mouseX, 0, width, 0.5, 2);
}


function calcWave() {
  theta += mouseX/10000;

  var x = theta;

  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
  }
}

function renderWave() {
  noStroke();
  fill(255, 50);

  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x*xspacing, height/2+yvalues[x], 16, 16);
  }
}


document.querySelector('.playToggleEyeRight').addEventListener('change', function(e){
  if (e.target.checked){
    player.triggerAttack("G4");
  } else {
    player.triggerRelease();
  }
})

document.querySelector('.playToggleEyeLeft').addEventListener('change', function(e){
  if (e.target.checked){
    player2.start();
  } else {
    player2.stop();
  }
})

document.querySelector('.playToggleNose').addEventListener('change', function(e){
  if (e.target.checked){
    backPlayer.reverse = !(backPlayer.reverse);
    backPlayer.playbackRate = map(mouseX, 0, width, 0.5, 2)*2;
  } else {
  }
})

document.querySelector('.playToggleMustacheRight').addEventListener('change', function(e){
  if (e.target.checked){
    samplerPlayer2.triggerAttack("E3");
  } else {
    samplerPlayer2.triggerRelease();
  }
})

document.querySelector('.playToggleMustacheLeft').addEventListener('change', function(e){
  if (e.target.checked){

    player3.start();
    player3.reverse = !(backPlayer.reverse);
  } else {
    player3.stop();
  }
})
