import * as THREE from "https://threejs.org/build/three.module.js";
import {OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {Candle} from "./Candle.js";
import {doPointerDown} from "./pick.js";


var camera, scene, renderer;
var candles = [];
var pickables = [];
var raycaster;
var mouseLoc;

function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor (0x888888);
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(90,120,0);
	let controls = new OrbitControls(camera, renderer.domElement);
	controls.minPolarAngle = THREE.Math.degToRad(30);
	controls.maxPolarAngle = THREE.Math.degToRad(80);
	controls.minDistance = 100;
	controls.maxDistance = 200;
	
	
	var loader = new THREE.TextureLoader();
	var texture = loader.load(
	'https://threejs.org/examples/textures/hardwood2_diffuse.jpg',
        function(texture) {
        },
			undefined, 
        function(xhr) {
          console.log('An error happened');
        }
        );
	texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(200,200);
	var texMat = new THREE.MeshPhongMaterial({
            map: texture,
            alphaTest:0.5
    });
		
		
	let floor=new THREE.Mesh(new THREE.PlaneGeometry(10000,10000),texMat);
	floor.rotation.x = - 1/2 * Math.PI;
	scene.add(floor);
	
	
	
	
	let spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.angle = Math.PI/4;
	spotLight.intensity =0.15
	spotLight.position.y = 50000;
	scene.add(spotLight);
	
	for(var x=-30,z=30,i=0;i<9;i++,x+=30){
		
		candles.push(new Candle(x,z,i));
		candles[i].flame();
		if(x==30){
			x=-60;
			z-=30;
		}
	}
	
	raycaster = new THREE.Raycaster();
	mouseLoc = new THREE.Vector2();
	document.addEventListener ('pointerdown', doPointerDown, false);
    window.addEventListener('resize', onWindowResize, false);
	
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(){
		
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
		candles.forEach(function(candle){candle.flameMesh.lookAt(camera.position.x, 0, camera.position.z);});
}
export{camera, scene, renderer,candles,pickables,mouseLoc,raycaster};
export{init,animate};
