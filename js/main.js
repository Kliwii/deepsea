//Three JS - Import Modules
import * as THREE from '../node_modules/three/build/three.module.js';
import { DragControls } from '../node_modules/three/examples/jsm/controls/DragControls.js';
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from '../node_modules/three/examples/jsm/loaders/MTLLoader.js';

////////////////////////////// tone.js
//
//Audio
//
let startButton = document.getElementById("start");
let loadingAnimation = document.getElementById("loadingAnimation");
let overlay = document.getElementById("overlay");
let loaded = false;

setTimeout(() => {
  loaded = true;
  
  gsap.to(startButton, {duration: 1, ease: Power3.easeInOut, opacity: 1});
  gsap.to(loadingAnimation, {duration: 1, ease: Power3.easeInOut, opacity: 0});
  gsap.to(loadingAnimation, {duration: 0, delay: 1, ease: Power3.easeInOut, display: "none"});

  startButton.addEventListener("click", async () => {
    //Remove Overlay
    gsap.to(overlay, {duration: 1, ease: Power3.easeInOut, opacity: 0});
    gsap.to(overlay, {duration: 0, delay: 1, ease: Power3.easeInOut, display: "none"});
    gsap.to(startButton, {duration: 1, ease: Power3.easeInOut, top: 150});
    gsap.to(startButton, {duration: 1, delay: 3, ease: Power3.easeInOut, opacity: 0});
    gsap.to(startButton, {duration: 0, delay: 4, ease: Power3.easeInOut, display: "none"});
    gsap.to(camera.position, {duration: 4, delay: 3, ease: Power3.easeInOut, y: 1});
  
    //Start Audio
    await Tone.start();
    playerDive.start();
    setTimeout(function(){
      audioStart();
    }, 4000);
  });

}, 4000);

//
//Sounds - Init Players
//
//Dive
var playerDive = new Tone.Player("./audio/dive.mp3").toDestination();
playerDive.volume.value = 0;
//Ambient
var playerAmbient = new Tone.Player("./audio/water.mp3").toDestination();
playerAmbient.loop = true;
playerAmbient.volume.value = -10;
//Lead
let playerLead = new Tone.Player("./audio/strings.mp3").toDestination();
playerLead.loop = true;
playerLead.volume.value = -15;
//Bass
let playerBass = new Tone.Player("./audio/bass.mp3").toDestination();
playerBass.loop = true;
playerBass.volume.value = -15;
//Drums
let playerDrums = new Tone.Player("./audio/drums.mp3").toDestination();
playerDrums.loop = true;
playerDrums.volume.value = -30;
//Effects
let playerEffects = new Tone.Player("./audio/submarine.mp3").toDestination();
playerEffects.loop = true;
playerEffects.volume.value = -30;

//PolySynth
let synth;
synthSetup();
async function synthSetup () {
  //Reverb
  const reverb = new Tone.Reverb({
    decay: 5,
    wet: 0.5,
    preDelay: 0.2
  });
  await reverb.generate();
  reverb.toDestination();

  //Lowpass
  let lowpass = new Tone.Filter(2400, "lowpass");
  lowpass.connect(reverb);

  //Chorus
  let chorus = new Tone.Chorus(1.5, 2.5, 0.5);
  chorus.type = "sawtooth";
  chorus.connect(lowpass);

  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator : {
      type : "sawtooth"
    },
    envelope : {
      "attack" : 0,
      "decay" : 0
    }
  }).connect(chorus);
  synth.volume.value = -20;
}

//
//Synth Notes -- Version 1
//
/*
function play1() {
  synth.triggerAttack(["C#3", "E5"]);
}
function play2() {
  synth.triggerAttack(["B3", "B4"]);
}
function play3() {
  synth.triggerAttack(["A#3", "A#4"]);
}
function play4() {
  synth.triggerAttack(["B2", "D#4"]);
}
function play5() {
  synth.triggerAttack(["C#4", "C#5"]);
}
function play6() {
  synth.triggerAttack(["B3", "B4"]);
}
function play7() {
  synth.triggerAttack(["A#3", "A#4"]);
}
function play8() {
  synth.triggerAttack(["A#3", "F#4"]);
}
function stopPlaying() {
  synth.triggerRelease(["C#3", "E5", "B3", "B4", "A#3", "A#4", "B2", "D#4", "C#4", "C#5", "F#4"]);
}
*/

//
//Synth Notes -- Version 2
//
function play1() {
  synth.triggerAttack(["G#2", "B3"]);
}
function play2() {
  synth.triggerAttack(["B2", "B3"]);
}
function play3() {
  synth.triggerAttack(["F#3", "A#3"]);
}
function play4() {
  synth.triggerAttack(["B3", "D#4"]);
}
function play5() {
  synth.triggerAttack(["C#4", "C#5"]);
}
function play6() {
  synth.triggerAttack(["B3", "B4"]);
}
function play7() {
  synth.triggerAttack(["B1", "D#4"]);
}
function play8() {
  synth.triggerAttack(["A#3", "F#4"]);
}
function stopPlaying() {
  synth.triggerRelease(["G#2", "B3", "B2", "B4", "A#2", "A#4", "D#4", "C#4", "C#5", "F#4", "B1", "F#3", "A#3"]);
}


/*
//
//Synth Notes -- Version 3
//
function play1() {
  synth.triggerAttack(["C#2", "E4"]);
}
function play2() {
  synth.triggerAttack(["G#2", "B3"]);
}
function play3() {
  synth.triggerAttack(["F#3", "A#3"]);
}
function play4() {
  synth.triggerAttack(["B1", "D#4"]);
}
function play5() {
  synth.triggerAttack(["B2", "C#4"]);
}
function play6() {
  synth.triggerAttack(["D#2", "B3"]);
}
function play7() {
  synth.triggerAttack(["C#2", "A#3"]);
}
function play8() {
  synth.triggerAttack(["F#3", "A#2"]);
}
function stopPlaying() {
  synth.triggerRelease(["C#2", "E4", "G#2", "B3", "F#3", "A#3", "B1", "D#4", "B2", "C#4", "D#2", "A#2"]);
}
*/

//Audio Init
function audioStart() {
  audioPlayerAmbient();
  audioPlayerLead();
  audioPlayerBass();
  audioPlayerDrums();
  audioPlayerEffects();
}

function audioPlayerAmbient() {
  playerAmbient.start();
}

window.levelLead = 0;
function audioPlayerLead() {
  playerLead.start();
  
  const meterLead = new Tone.Meter();
  playerLead.connect(meterLead);
  setInterval(function(){ 
    //levelLead = 1 + (meterLead.getValue()/30);
    gsap.to(window, {duration: 0.1, ease: Power3.easeInOut, levelLead: 1 + (meterLead.getValue()/30)});
    //console.log(levelLead);
  }, 100);
}

function updateLeadVolume(leadUserVolume) {
  playerLead.volume.value = leadUserVolume;
}

window.levelBass = 0;
function audioPlayerBass() {
  playerBass.start();
  
  const meterBass = new Tone.Meter();
  playerBass.connect(meterBass);
  setInterval(function(){ 
    //levelBass = 1 + (meterBass.getValue()/30);
    gsap.to(window, {duration: 0.1, ease: Power3.easeInOut, levelBass: 1 + (meterBass.getValue()/30)});
    //console.log(levelBass);
  }, 100);
}

function updateBassVolume(bassUserVolume) {
  playerBass.volume.value = bassUserVolume;
}

function audioPlayerDrums() {
  playerDrums.start();
}

function updateDrumsVolume(drumsUserVolume) {
  playerDrums.volume.value = drumsUserVolume;
}

function audioPlayerEffects() {
  playerEffects.start();
}

function updateEffectsVolume(effectsUserVolume) {
  playerEffects.volume.value = effectsUserVolume;
}

////////////////////////////// three.js
//
//Init
//
window.addEventListener('load', init, false);
function init() {
  createWorld();
  createLights();
  createOcean();
  loadShip();
  createBoje();
  createGridBottom();
  loadSubmarine();
  createMountains();
  createParticleSystem(300, 7);
  createLines();
  createPrimitive();
  createPrimitive2()
  createRock();
  createRock2();
  createRock3();
  createRock4();
  createFish();
  setTimeout(function(){ 
    animation();
  }, 1000);
}

//
//Theme - Colors
//
var Theme = {
  primary: 0xE7ECEF,
  darker: 0x222222,
  water: 0x476C9B,
  water2: 0x56CBF9,
  red: 0xF05D5E,
  yellow: 0xFBBA72,
  green: 0x417B5A,
  green2: 0x61C9A8
};

//
//Randomize Helper Function
//
function mathRandom(num = 8) {
  var numValue = - Math.random() * num + Math.random() * num;
  return numValue;
};

//
//Create World
//
var scene, camera, renderer;
var _ocean;
var _width, _height;
function createWorld() {
  _width = window.innerWidth;
  _height= window.innerHeight;
  //---
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(Theme.darker, 7, 10);
  scene.background = new THREE.Color(Theme.darker);
  //---
  camera = new THREE.PerspectiveCamera(50, _width/_height, 1, 1000);
  camera.position.set(0,10,10);
  //---
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  renderer.setSize(_width, _height);
  renderer.shadowMap.enabled = true;
  //---
  document.body.appendChild(renderer.domElement);
  //---
  window.addEventListener('resize', onWindowResize, false);
}

//
//Resize
//
function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
}

//
//Lights
//
var _hemisphereLight, _lightBottom, _lightTop, _ambientLight;
function createLights() {
  //_ambientLights = new THREE.AmbientLight(0xFFFFFF, 1);
  _hemisphereLight = new THREE.HemisphereLight(Theme.primary, Theme.water, 1);
  _lightBottom = new THREE.PointLight(Theme.water2, 1);
  _lightBottom.position.set(0,1,5);
  _lightTop = new THREE.PointLight(Theme.water2, 1, 5);
  _lightTop.position.set(0,11,5);
  _ambientLight = new THREE.SpotLight(Theme.red, 0);
  _ambientLight.position.set(0,5,5);
  _ambientLight.angle = 0.6;
  _ambientLight.penumbra = 0.3;

  /*
  var spotLightHelper = new THREE.SpotLightHelper( _ambientLight );
  scene.add( spotLightHelper );
  */

  scene.add(_ambientLight);
  scene.add(_lightTop);
  scene.add(_lightBottom);
  scene.add(_hemisphereLight);
}

//
//Create Primitives
//
var _primitive;
function createPrimitive() {
  var mesh_geo = new THREE.IcosahedronGeometry(1, 1);
  var mesh_mat = new THREE.MeshStandardMaterial({color:Theme.darker, flatShading:true});
  //---
  _primitive = new THREE.Mesh(mesh_geo, mesh_mat);
  _primitive.position.set(0,1,1);
  scene.add(_primitive);
  
  //Add Drag Controls
  var draggableObjects = [_primitive];
  var controls = new DragControls( draggableObjects, camera, renderer.domElement );
  controls.addEventListener( 'dragstart', dragStartCallback );
  controls.addEventListener( 'drag', dragActiveCallback );
	controls.addEventListener( 'dragend', dragEndCallback );
}

//
//Create Primitives 2
//
var _primitive2;
function createPrimitive2() {
  var mesh_geo = new THREE.IcosahedronGeometry(4, 2);
  var mesh_mat = new THREE.MeshStandardMaterial({color:Theme.red, wireframe: true});
  //---
  _primitive2 = new THREE.Mesh(mesh_geo, mesh_mat);
  _primitive2.position.set(0,2,-4);
  scene.add(_primitive2);
}

//
//Create Rock - Lead
//
var _rock;
function createRock() {
  var mesh_geo = new THREE.IcosahedronGeometry( 0.25, 1, 16 )
  var mesh_mat = new THREE.MeshStandardMaterial({color:Theme.darker, flatShading:true});
  //---
  _rock = new THREE.Mesh(mesh_geo, mesh_mat);
  _rock.position.set(3,1,2);
  scene.add(_rock);

  //Add Drag Controls
  var draggableObjects = [_rock];
  var controls = new DragControls( draggableObjects, camera, renderer.domElement );
  controls.addEventListener( 'dragstart', dragStartCallbackRock );
  controls.addEventListener( 'drag', dragActiveCallbackRock );
  controls.addEventListener( 'dragend', dragEndCallback );
}

//
//Create Rock 2 - Bass
//
var _rock2;
function createRock2() {
  var mesh_geo = new THREE.IcosahedronGeometry( 0.4, 1, 16 )
  var mesh_mat = new THREE.MeshStandardMaterial({color:Theme.darker, flatShading:true});
  //---
  _rock2 = new THREE.Mesh(mesh_geo, mesh_mat);
  _rock2.position.set(-3,1,4);
  scene.add(_rock2);

  //Add Drag Controls
  var draggableObjects = [_rock2];
  var controls = new DragControls( draggableObjects, camera, renderer.domElement );
  controls.addEventListener( 'dragstart', dragStartCallbackRock2 );
  controls.addEventListener( 'drag', dragActiveCallbackRock2 );
  controls.addEventListener( 'dragend', dragEndCallback );
}

//
//Create Rock 3 - Submarine
//
var _rock3;
function createRock3() {
  var mesh_geo = new THREE.IcosahedronGeometry( 0.3, 1, 16 )
  var mesh_mat = new THREE.MeshStandardMaterial({color:Theme.darker, flatShading:true});
  //---
  _rock3 = new THREE.Mesh(mesh_geo, mesh_mat);
  _rock3.position.set(1,0,6);
  scene.add(_rock3);

  //Add Drag Controls
  var draggableObjects = [_rock3];
  var controls = new DragControls( draggableObjects, camera, renderer.domElement );
  controls.addEventListener( 'dragstart', dragStartCallbackRock3 );
  controls.addEventListener( 'drag', dragActiveCallbackRock3 );
  controls.addEventListener( 'dragend', dragEndCallback );
}

//
//Create Rock 4 - Drums
//
var _rock4;
function createRock4() {
  var mesh_geo = new THREE.IcosahedronGeometry( 0.5, 1, 16 )
  var mesh_mat = new THREE.MeshStandardMaterial({color:Theme.darker, flatShading:true});
  //---
  _rock4 = new THREE.Mesh(mesh_geo, mesh_mat);
  _rock4.position.set(-1,0,2);
  scene.add(_rock4);

  //Add Drag Controls
  var draggableObjects = [_rock4];
  var controls = new DragControls( draggableObjects, camera, renderer.domElement );
  controls.addEventListener( 'dragstart', dragStartCallbackRock4 );
  controls.addEventListener( 'drag', dragActiveCallbackRock4 );
  controls.addEventListener( 'dragend', dragEndCallback );
}

//
//Boot
//
var ship;

function loadShip() {
  var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    } 
  }; 
  var onError = function (xhr) { }; 
  var mtlLoader = new MTLLoader();
  mtlLoader.load('./models/boot2+.mtl', function (materials) {
    materials.preload();

    // Load the object
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./models/boot2+.obj', function (model) {
      model.scale.set(0.4, 0.4, 0.4);
      model.position.x = -1;
      model.position.y = 9;
      model.position.z = 3;
      model.rotation.y = Math.PI / 1.5;
      ship = model;
      scene.add(ship);
    }, onProgress, onError);
  });
}

//
//Submarine
//
var submarine;

function loadSubmarine() {
  var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    } 
  }; 
  var onError = function (xhr) { }; 
  var mtlLoader = new MTLLoader();
  mtlLoader.load('./models/submarine.mtl', function (materials) {
    materials.preload();
  
    // Load the object
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./models/submarine.obj', function (model) {
      model.scale.set(0.7, 0.7, 0.7);
      model.position.x = 4.2;
      model.position.y = -1.5;
      model.position.z = -1;
      model.rotation.y = Math.PI / 1.7;
      submarine = model;
      scene.add(submarine);
    }, onProgress, onError);
  });
}

//
//Boje
//
var _boje;
function createBoje() {
  var mesh_geo = new THREE.IcosahedronGeometry( 0.4, 1, 16 )
  var mesh_mat = new THREE.MeshStandardMaterial({color:Theme.primary, flatShading:true});
  //---
  _boje = new THREE.Mesh(mesh_geo, mesh_mat);
  _boje.position.set(1,9,5);
  scene.add(_boje);
}

//
//Grid
//

function createGridBottom() {
  var gridHelper = new THREE.GridHelper(20, 40, Theme.primary, Theme.red);
  gridHelper.position.y = -1;
  scene.add(gridHelper);
}
/*
function createGridBottom() {
  var planeGeometry = new THREE.PlaneGeometry(20, 20, 20, 1);
  var planeMaterial = new THREE.MeshStandardMaterial({color: Theme.red, side: THREE.DoubleSide, wireframe: true});
      
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, -1, 0);
  scene.add(plane);
}
*/

//
//Mountains
//
let mountain1;
let mountain2;

function createMountains() {

  var shape1 = new THREE.Shape();
  shape1.moveTo(0, 0, 0);
  shape1.lineTo(0, 0, 0);
  shape1.lineTo(3, 3, 0);
  shape1.lineTo(5, 1, 0);
  shape1.lineTo(6.5, 2, 0);
  shape1.lineTo(9, 0.5, 0);
  shape1.lineTo(10, 1, 0);
  shape1.lineTo(12, 0, 0);

  var shape2 = new THREE.Shape();
  shape2.moveTo(0, 0, 0);
  shape2.lineTo(0, 0, 0);
  shape2.lineTo(3, 1, 0);
  shape2.lineTo(5, 0.5, 0);
  shape2.lineTo(7, 1.5, 0);
  shape2.lineTo(8, 1, 0);
  shape2.lineTo(11, 3.5, 0);
  shape2.lineTo(14, 0, 0);

  var shapeGeo1 = new THREE.ShapeGeometry(shape1);
  var shapeGeo2 = new THREE.ShapeGeometry(shape2);

  var shapeMat1 = new THREE.MeshStandardMaterial({color:Theme.green2, flatShading:true});
  var shapeMat2 = new THREE.MeshStandardMaterial({color:Theme.red, flatShading:true});

  mountain1 = new THREE.Mesh(shapeGeo1, shapeMat1);
  mountain2 = new THREE.Mesh(shapeGeo2, shapeMat2);

  mountain1.position.set(-12,-1,0.25);
  mountain2.position.set(-2,-1,0.5);

  scene.add(mountain1, mountain2);

}

//
//Lines
//
var linesGroup = new THREE.Object3D();
var lineElem;

var createLines = function(lineScale = 2, linePos = 10) {
  var line_geo = new THREE.CubeGeometry(1, lineScale/40, lineScale/40);
  var line_mat = new THREE.MeshStandardMaterial({color:Theme.green2, side:THREE.DoubleSide});
  var lineAmp = 5;

  for (var i = 0; i<40; i++) {
    lineElem = new THREE.Mesh(line_geo, line_mat);
    lineElem.position.x = -linePos;
    lineElem.position.z = (mathRandom(lineAmp));
    //gsap.to(lineElem.position, 3, {x:linePos, repeat:-1, delay:mathRandom(3)});
    gsap.to(lineElem.position, 3, {x:linePos, repeat:-1, yoyo:true, delay:mathRandom(3)});
    //lineElem.receiveShadow = true;
    //lineElem.castShadow = true;
    lineElem.position.y = Math.abs(mathRandom(5));

    lineElem.material.transparent = true;
    lineElem.material.opacity = 0; 

    linesGroup.add(lineElem);
  }

  scene.add(linesGroup);
};

//
//Particle System
//
var particleGroup = new THREE.Object3D();
function createParticleSystem(num, amp) {
  var particle_geo = new THREE.CircleGeometry(0.5,10);
  var particle_mat = new THREE.MeshPhysicalMaterial({color:Theme.primary, side:THREE.DoubleSide});

  for (var i = 1; i < num; i++) {
    var particle_scale = 0.001+Math.abs(mathRandom(0.05));
    var particle = new THREE.Mesh(particle_geo, particle_mat);
    particle.position.set(mathRandom(amp),mathRandom(amp),mathRandom(amp));
    particle.rotation.set(mathRandom(1),mathRandom(1),mathRandom(1));
    particle.scale.set(particle_scale,particle_scale,particle_scale);
    particle.speedValue = mathRandom(1);

    particleGroup.add(particle);
  }
  scene.add(particleGroup);
}

//
//Fish
//
var fishes = [];

function createFish() {

  //const randSpread = pos => THREE.Math.randFloatSpread(pos);
  const rand = (min, max) => THREE.Math.randFloat(min, max);

  for (let i = 0; i < 5; i += 1) {
    const fish = new Fly({
      light: true,
      bodyColor: Theme.water,
      wingColor: Theme.water2,
      lightColor: Theme.green,
    });
    fish.group.position.set(rand(-1, -4), rand(0, 2), rand(0, 2));

    const scale = rand(0.006, 0.02);
    fish.group.scale.set(scale, scale, scale);

    scene.add(fish.group);
    fishes.push(fish);
  }
}

class Fly {
  constructor({ light, bodyColor, wingColor, lightColor }) {
    this.group = new THREE.Group();

    this.bodyColor = bodyColor;
    this.wingColor = wingColor;

    this.vAngle = 0;

    this.drawBody();
    this.drawWings();

    if (light) {
      this.lightColor = lightColor;
      this.drawLight();
    }
  }
  drawBody() {
    const flyGeometry = new THREE.CylinderGeometry(12, 16, 18, 4);
    const flyMaterial = new THREE.MeshStandardMaterial({
      color: this.bodyColor,
      roughness: 1,
      flatShading: true,
    });
    const fly = new THREE.Mesh(flyGeometry, flyMaterial);
    fly.rotation.y = 45 * (Math.PI / 180);
    this.group.add(fly);
  }
  drawWings() {
    this.rightWing = new THREE.Mesh(
      new THREE.BoxGeometry(5, 12, 12),
      new THREE.MeshStandardMaterial({
        color: this.wingColor,
        roughness: 1,
        flatShading: true,
      })
    );
    this.rightWing.position.set(6, 1, 0);
    this.rightWing.rotation.x = Math.PI / 2;
    this.rightWing.rotation.z = Math.PI / 4;
    this.rightWing.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -6, 0));
    this.group.add(this.rightWing);

    this.leftWing = this.rightWing.clone();
    this.leftWing.position.x = -this.rightWing.position.x;
    this.leftWing.rotation.z = -this.rightWing.rotation.z;
    this.group.add(this.leftWing);
  }
  drawLight() {
    const geometry = new THREE.CylinderGeometry(16, 8, 6, 4);
    const flyLight = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
      color: this.lightColor,
      flatShading: true,
    }));
    flyLight.rotation.y = 45 * (Math.PI / 180);

    const light = new THREE.PointLight(this.lightColor, 1, 400);
    light.add(flyLight);
    light.position.set(0, -12, 0);
    light.castShadow = true;
    this.group.add(light);
  }
  moveWings() {
    this.vAngle += 0.04;
    const wingAmplitude = Math.PI / 8;
    this.rightWing.rotation.z = (Math.PI / 4) - (Math.cos(this.vAngle) * wingAmplitude);
    this.leftWing.rotation.z = -this.rightWing.rotation.z;
  }
}

//
//Draggable
//
window.currentSpherePosition = 0;

function dragStartCallback(event) {
  event.object.material.emissive.set(Theme.water);

  //Notes
  if (event.object.position.x >= -3 && event.object.position.x < -2.25 ) {
    play1();
    //console.log("LLLL Start");
  } else if (event.object.position.x >= -2.25 && event.object.position.x < -1.5) {
    play2();
    //console.log("LLL Start");
  } else if (event.object.position.x >= -1.5 && event.object.position.x < -0.75) {
    play3();
    //console.log("LL Start");
  } else if (event.object.position.x >= -0.75 && event.object.position.x < 0) {
    play4();
    //console.log("L Start");
  } else if (event.object.position.x >= 0 && event.object.position.x < 0.75) {
    play5();
    //console.log("R Start");
  } else if (event.object.position.x >= 0.75 && event.object.position.x < 1.5) {
    play6();
    //console.log("RR Start");
  } else if (event.object.position.x >= 1.5 && event.object.position.x < 2.25) {
    play7();
    //console.log("RRR Start");
  } else if (event.object.position.x >= 2.25 && event.object.position.x < 3) {
    play8();
    //console.log("RRRR Start");
  }
}

function dragStartCallbackRock(event) {
  event.object.material.emissive.set(Theme.water2);
}

function dragStartCallbackRock2(event) {
  event.object.material.emissive.set(Theme.red);
}

function dragStartCallbackRock3(event) {
  event.object.material.emissive.set(Theme.yellow);
}

function dragStartCallbackRock4(event) {
  event.object.material.emissive.set(Theme.green);
}

function dragActiveCallback(event) {
  //console.log("Drag Active");

  camera.rotation.y = (event.object.position.x / 100);
  //console.log(camera.rotation.y);

  //Begrenzung
  event.object.position.z = 1;

  if (event.object.position.y < 0) {
    event.object.position.y = 0;
    //console.log("Bottom");
  }
  if (event.object.position.y > 2) {
    event.object.position.y = 2;
    //console.log("Top");
  }
  if (event.object.position.x < -3) {
    event.object.position.x = -3;
    //console.log("Left");
  }
  if (event.object.position.x > 3) {
    event.object.position.x = 3;
    //console.log("Right");
  }

  //
  //Klaviatur
  //
  //Notes
  if (event.object.position.x >= -3 && event.object.position.x < -2.25 ) {
    window.spherePosition = 1;
    if (window.spherePosition != window.currentSpherePosition) {
      //synth.triggerRelease(["B3", "B4", "A#3", "A#4", "B2", "D#4", "C#4", "C#5", "F#4"]);
      stopPlaying();
      play1();
      window.currentSpherePosition = 1;
      console.log("LLLL Play");
    }
    //console.log("LLLL");
  } else if (event.object.position.x >= -2.25 && event.object.position.x < -1.5) {
    window.spherePosition = 2;
    if (window.spherePosition != window.currentSpherePosition) {
      //synth.triggerRelease(["C#3", "E5", "A#3", "A#4", "B2", "D#4", "C#4", "C#5", "F#4"]);
      stopPlaying();
      play2();
      window.currentSpherePosition = 2;
      console.log("LLL Play");
    }
    //console.log("LLL");
  } else if (event.object.position.x >= -1.5 && event.object.position.x < -0.75) {
    window.spherePosition = 3;
    if (window.spherePosition != window.currentSpherePosition) {
      //synth.triggerRelease(["C#3", "E5", "B3", "B4", "B2", "D#4", "C#4", "C#5", "F#4"]);
      stopPlaying();
      play3();
      window.currentSpherePosition = 3;
      console.log("LL Play");
    }
    //console.log("LL");
  } else if (event.object.position.x >= -0.75 && event.object.position.x < 0) {
    window.spherePosition = 4;
    if (window.spherePosition != window.currentSpherePosition) {
      //synth.triggerRelease(["C#3", "E5", "B3", "B4", "A#3", "A#4", "C#4", "C#5", "F#4"]);
      stopPlaying();
      play4();
      window.currentSpherePosition = 4;
      console.log("L Play");
    }
    //console.log("L");
  } else if (event.object.position.x >= 0 && event.object.position.x < 0.75) {
    window.spherePosition = 5;
    if (window.spherePosition != window.currentSpherePosition) {
      //synth.triggerRelease(["C#3", "E5", "B3", "B4", "A#3", "A#4", "B2", "D#4", "F#4"]);
      stopPlaying();
      play5();
      window.currentSpherePosition = 5;
      console.log("R Play");
    }
    //console.log("R");
  } else if (event.object.position.x >= 0.75 && event.object.position.x < 1.5) {
    window.spherePosition = 6;
    if (window.spherePosition != window.currentSpherePosition) {
      //synth.triggerRelease(["C#3", "E5", "A#3", "A#4", "B2", "D#4", "C#4", "C#5", "F#4"]);
      stopPlaying();
      play6();
      window.currentSpherePosition = 6;
      console.log("RR Play");
    }
    //console.log("RR");
  } else if (event.object.position.x >= 1.5 && event.object.position.x < 2.25) {
    window.spherePosition = 7;
    if (window.spherePosition != window.currentSpherePosition) {
      //synth.triggerRelease(["C#3", "E5", "B3", "B4", "B2", "D#4", "C#4", "C#5", "F#4"]);
      stopPlaying();
      play7();
      window.currentSpherePosition = 7;
      console.log("RRR Play");
    }
    //console.log("RRR");
  } else if (event.object.position.x >= 2.25 && event.object.position.x < 3) {
    window.spherePosition = 8;
    if (window.spherePosition != window.currentSpherePosition) {
      //synth.triggerRelease(["C#3", "E5", "B3", "B4", "A#4", "B2", "D#4", "C#4", "C#5"]);
      stopPlaying();
      play8();
      window.currentSpherePosition = 8;
      console.log("RRRR Play");
    }
    //console.log("RRRR");
  }

  //Volume 
  synth.volume.value = -40 + (event.object.position.y * 15);
  //console.log(synth.volume.value);

  //Move Submarine
  if (event.object.position.x >= 0) { 
    submarine.position.x = 4.2 + (event.object.position.x/2);
    //console.log(event.object.position.x/2);
  }
}

window.fishPosition = 1;

function dragActiveCallbackRock(event) {
  event.object.position.z = 2;
  event.object.position.x = 3;

  if (event.object.position.y < 0) {
    event.object.position.y = 0;
    //console.log("Bottom");
  }
  if (event.object.position.y > 2) {
    event.object.position.y = 2;
    //console.log("Top");
  }
  //console.log("Drag Active");

  //Lautstärke anpassen
  let leadUserVolume = (event.object.position.y - 2) * 15
  updateLeadVolume(leadUserVolume);
  window.fishPosition = event.object.position.y;
}

window.particleSpeed = 1;
function dragActiveCallbackRock2(event) {
  event.object.position.z = 4;
  event.object.position.x = -3;

  if (event.object.position.y < 0) {
    event.object.position.y = 0;
    //console.log("Bottom");
  }
  if (event.object.position.y > 2) {
    event.object.position.y = 2;
    //console.log("Top");
  }
  //console.log("Drag Active");

  //Lautstärke anpassen
  let bassUserVolume = (event.object.position.y - 2) * 15
  updateBassVolume(bassUserVolume);
  window.particleSpeed = event.object.position.y;

  if ((event.object.position.y / 2) >= 0.5) {
    gsap.to(lineElem.material, {duration: 0.4, ease: Power3.easeInOut, opacity: 1});
  } else {
    gsap.to(lineElem.material, {duration: 0.4, ease: Power3.easeInOut, opacity: 0});
  }
}

window.submarinePosition = -1;
function dragActiveCallbackRock3(event) {
  event.object.position.z = 6;
  event.object.position.y = 0;

  if (event.object.position.x < 1) {
    event.object.position.x = 1;
    //console.log("Bottom");
  }
  if (event.object.position.x > 2) {
    event.object.position.x = 2;
    //console.log("Top");
  }
  //console.log("Drag Active");

  //Lautstärke anpassen
  let effectsUserVolume = (event.object.position.x - 2) * 30
  updateEffectsVolume(effectsUserVolume);

  //Submarine
  window.submarinePosition = -2 + (event.object.position.x);
  submarine.position.z = window.submarinePosition;
}

window.drumLightIntensity = 0;
function dragActiveCallbackRock4(event) {
  event.object.position.z = 2;
  event.object.position.y = 0;

  if (event.object.position.x < -3) {
    event.object.position.x = -3;
    //console.log("Bottom");
  }
  if (event.object.position.x > -1) {
    event.object.position.x = -1;
    //console.log("Top");
  }
  //console.log("Drag Active");

  //Lautstärke anpassen
  let drumsUserVolume = (-(event.object.position.x + 1) * 15) - 30 
  updateDrumsVolume(drumsUserVolume);

  //Ambient Light anpassen
  window.drumLightIntensity = 1 + (drumsUserVolume/30);
  _ambientLight.intensity = window.drumLightIntensity * 5;
}

function dragEndCallback(event) {
  event.object.material.emissive.set(0x000000);
  stopPlaying();
  window.currentSpherePosition = 0;
  //console.log("Drag End");
}

//
//Ocean
//
var oceanElement = function(wirefr = true, geo_frag = 50) {
  var geo_size = 25;
  var geo = new THREE.PlaneGeometry(geo_size,geo_size,geo_frag,geo_frag);
  geo.mergeVertices();
  this.mesh = new THREE.Object3D();
  var l = geo.vertices.length;
  this.waves = [];
  //---
  for (var i = 0; i<l; i++) {
    var v = geo.vertices[i];
    this.waves.push({
      y:v.y,
      x:v.x,
      z:v.z,
      ang:Math.PI*2,
      amp:Math.random()*(0.2),
      speed:0.03+Math.random()*0.05
    });
  };
  var wmat = new THREE.MeshPhysicalMaterial({color:Theme.water, wireframe:true, transparent:false, opacity:1 });
  var mat = new THREE.MeshPhysicalMaterial({color:Theme.water, transparent:true, opacity:0.85, wireframe:false});
  this.wire = new THREE.Mesh(geo, wmat);
  this.mesh = new THREE.Mesh(geo, mat);
  if (wirefr) this.mesh.add(this.wire);
  this.mesh.add(this.mesh);
  this.mesh.reseivedShadow = true;
  this.mesh.rotation.x = -90 * Math.PI / 180;
  this.mesh.position.y = 9;
}

oceanElement.prototype.moveVertices = function() {
  var verts = this.mesh.geometry.vertices;
  var l = verts.length;
  //---
  for (var i= 0; i<l; i++) {
    var v = verts[i];
    var vpros = this.waves[i];
    v.x = vpros.x + Math.cos(vpros.ang)*vpros.amp;
    v.y = vpros.y + Math.sin(vpros.ang/2)*vpros.amp;
    v.z = vpros.z + Math.cos(vpros.ang/3)*vpros.amp;
    vpros.ang += vpros.speed;
  };
  this.mesh.geometry.verticesNeedUpdate = true;
  this.mesh.geometry.morphTargetsNeedUpdate = true;
}

function createOcean() {
  _ocean = new oceanElement();
  _ocean.mesh.scale.set(1,1,1);
  scene.add(_ocean.mesh);
}

//
//Animation
//
let counter = 0;
let counter2 = 0;
let shipVel = 1+Math.random()*4;
let shipAmp = 1+Math.random()*6;
let shipPos = Math.random()*.2;

function animation() {
  const timer = 0.0001 * Date.now();
  const time = Date.now()*0.003;

  //Ocean
  _ocean.moveVertices();

  //Boot
  ship.rotation.z = (Math.sin(time / shipVel) * shipAmp) * Math.PI / 180;
  ship.rotation.x = (Math.cos(time) * shipVel) * Math.PI / 180;
  ship.position.y = 9 + (Math.sin(time / shipVel) * shipPos);

  //Boje
  _boje.rotation.z = 1 + (Math.sin(time / shipVel) * shipAmp) * Math.PI / 180;
  _boje.rotation.x = 1 + (Math.cos(time) * shipVel) * Math.PI / 180;
  _boje.position.y = 9 + (Math.sin(time / shipVel) * shipPos);

  //Submarine
  submarine.rotation.z = ((Math.sin(time / shipVel) * shipAmp) * Math.PI / 180) / 2;
  submarine.rotation.x = ((Math.cos(time) * shipVel) * Math.PI / 180) / 2;
  submarine.position.y = -1 + ((Math.sin(time / shipVel) * shipPos) / 2);
  //submarine.position.x = 4 + ((Math.sin(time / shipVel) * shipPos) / 2);

  //Mountains
  mountain2.geometry.vertices[1].setY(1 + levelLead);
  mountain2.geometry.vertices[3].setY(1.5 + levelLead);
  mountain2.geometry.vertices[5].setY(3.5 + levelLead);
  mountain2.geometry.verticesNeedUpdate = true;

  mountain1.geometry.vertices[1].setY(3 + levelBass);
  mountain1.geometry.vertices[3].setY(2 + levelBass);
  mountain1.geometry.vertices[5].setY(1 + levelBass);
  mountain1.geometry.verticesNeedUpdate = true;
  
  //Primitive Animation
  _primitive.rotation.y += 0.0015;

  //console.log(window.fishPosition, window.particleSpeed, window.submarinePosition, drumLightIntensity);
  if (window.fishPosition == 2 && window.particleSpeed == 2 && window.submarinePosition == 0 && drumLightIntensity == 1) {
    _primitive2.rotation.y += 0.0010;
  }

  if (window.fishPosition >= 1 && window.particleSpeed >= 1) {
    gsap.to(_primitive2.position, 1, {z:-3});
  } else {
    gsap.to(_primitive2.position, 1, {z:-4});
  }

  //Rock Bouncing indicating drag direction
  if (counter <= 150){
    _rock.position.y += 0.0005;
    _rock4.position.x += 0.0005;
    counter++;
  }
  if (counter > 150){
    _rock.position.y -= 0.0005;
    _rock4.position.x -= 0.0005;
    counter++;
  }
  if (counter > 300){
    counter = 0;
  }

  if (counter2 <= 300){
    _rock2.position.y += 0.0005;
    _rock3.position.x += 0.0005;
    counter2++;
  }
  if (counter2 > 300){
    _rock2.position.y -= 0.0005;
    _rock3.position.x -= 0.0005;
    counter2++;
  }
  if (counter2 > 600){
    counter2 = 0;
  }

  //Rotation depending on Loudness of Element
  _rock.rotation.y += (window.fishPosition / 500);
  _rock2.rotation.y += (window.particleSpeed / 500);
  _rock3.rotation.y += (((1 + window.submarinePosition) * 2) / 500);
  _rock4.rotation.y += (window.drumLightIntensity / 250);

  //ParticleSystem Animation
  for (var i = 0, l = particleGroup.children.length; i<l; i++) {
    var newObject = particleGroup.children[i];
    newObject.rotation.x += (newObject.speedValue/10);
    newObject.rotation.y += newObject.speedValue/10;
    newObject.rotation.z += newObject.speedValue/10;
  };
  particleGroup.rotation.y += (0.0005 + (window.particleSpeed / 2000));
  particleGroup.rotation.z += (window.particleSpeed / 4000);

  //Fishes
  fishes.forEach((fish, index) => {
    fish.moveWings();

    const xPos = -3 + (1 * Math.cos(timer + index));
    const yPos = 1 + ((1 * Math.sin(timer * index)) + 0.3);
    const zPos = (-2 + window.fishPosition) + (1 + (0.25 * Math.sin(timer + index)));
    fish.group.position.set(xPos, yPos, zPos);
  });

  //---
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
}
