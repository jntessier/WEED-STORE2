


if( 'undefined' === typeof window) {  importScripts('app.js'); } 


//--------------------------------------------------------------------------------------------------------------------

import * as THREE from 'three';

let container = document.getElementById('container');
let camera, scene, renderer;
let uniforms;``
let isCapturing;
let toggleCapture;
/*
let loader = new THREE.TextureLoader();
let texture;
loader.setCrossOrigin("anonymous");
loader.load(
'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
function do_something_with_texture(tex) {
  texture = tex;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.LinearFilter;
  init_background();
  animate();
});*/

const width = window.innerWidth, height = window.innerHeight;








// init

camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

scene = new THREE.Scene();


const geometry = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

// animation

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}


function init_background() {
    
  
    if (camera == undefined)  { camera = new THREE.Camera();    camera.position.z = 1; }
  
    if (scene == undefined) {    scene = new THREE.Scene(); }
  
    var geometry = new THREE.PlaneGeometry(2, 2);
  
    uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
      u_noise: { type: "t", value: texture },
      u_mouse: { type: "v2", value: new THREE.Vector2() } };
  
  
    var material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent });
  
    material.extensions.derivatives = true;
  
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
  
    container.appendChild(renderer.domElement);
  
    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
  
    document.addEventListener('pointermove', e => {
      let ratio = window.innerHeight / window.innerWidth;
      uniforms.u_mouse.value.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
      uniforms.u_mouse.value.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;
  
      e.preventDefault();
    });
  }
  
  function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
  }
  
  function animate(delta) {
    requestAnimationFrame(animate);
    render(delta);
  }
  
  
  
  
  
  
  let capturer = new CCapture({
    verbose: true,
    framerate: 60,
    // motionBlurFrames: 4,
    quality: 90,
    format: 'webm',
    workersPath: 'js/' });
  
  let capturing = false;
  
  isCapturing = function (val) {
    if (val === false && window.capturing === true) {
      capturer.stop();
      capturer.save();
    } else if (val === true && window.capturing === false) {
      capturer.start();
    }
    capturing = val;
  };
  toggleCapture = function () {  isCapturing(!capturing); };
  
  window.addEventListener('keyup', function (e) {if (e.keyCode == 68) toggleCapture();});
  
  let then = 0;
  function render(delta) 
  {
    uniforms.u_time.value = -10000 + delta * 0.0005;  renderer.render(scene, camera);
  
    if (capturing) {   capturer.capture(renderer.domElement);  }
  }