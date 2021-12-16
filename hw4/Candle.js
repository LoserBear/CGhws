import * as THREE from "https://threejs.org/build/three.module.js";
import {scene,pickables} from "./main.js";

class Candle{
	x;
	z;
	group;
	spotlight;
	count;
	flameMesh;
	
	constructor(x,z,num){
		this.x=x;
		this.z=z;
		this.group = new THREE.Group();
		this.group.num = num;
	
		var body = new THREE.Mesh (new THREE.CylinderGeometry(5,8,10,6), new THREE.MeshBasicMaterial({color: 0xefe6d3}));
		this.sugar = new THREE.Mesh (new THREE.CylinderGeometry(4,5,2,6), new THREE.MeshBasicMaterial({color: 'brown'}));
		body.position.y = 5;
		this.sugar.position.set(x,11,z);
		this.group.add (body);
		this.sugar.visible=false;
		scene.add(this.sugar);
		this.spotLight = new THREE.SpotLight( 0xfffcbb );
		this.spotLight.angle = Math.PI/4;
		this.spotLight.position.y = 14;
		this.spotLight.penumbra = 0.66;
		this.spotLight.target = body;
		this.group.add(this.spotLight);
		this.flameInterval = setInterval (this.textureAnimate.bind(this), 100);
		
		
		
	}
	
	flame(){
		var loader = new THREE.TextureLoader();
		// load a resource
		var texture = loader.load(
		// URL ...
		'http://i.imgur.com/M2tr5Tm.png?1',
		// onLoad ...
        function(texture) {
        // do something with the texture
        // Plane with default texture coordinates [0,1]x[0,1]
        },
			undefined, // onProgress
        // onError ...
        function(xhr) {
          console.log('An error happened');
        }
        );
	    var texMat = new THREE.MeshBasicMaterial({
            map: texture,
            alphaTest:0.5
        });
		
		
		this.flameMesh = new THREE.Mesh(new THREE.PlaneGeometry(20,20), texMat);
		this.flameMesh.name = "fire";
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set (1/3,1/3);
        texture.offset.set (Math.floor(Math.random() * 3)/3,Math.floor(Math.random() * 3)/3);
        this.group.add (this.flameMesh);
        this.flameMesh.position.y = 14;
	    this.group.position.set(this.x,0.001,this.z);
		scene.add (this.group);
		
		pickables.push(this.group);
		
    }
	
	
	textureAnimate() {
      this.count = (this.count === undefined) ? 1 : this.count;
	    if (this.flameMesh!== undefined){
            var texture = this.flameMesh.material.map;
            texture.offset.x += 1/3;
 		    if (this.count % 3 === 0) {
    	    texture.offset.y -= 1/3;
			}
            this.count++;
        }
    }
	convertToPudding(){
	  this.flameMesh.visible = false;
	  this.spotLight.visible = false;
	  this.sugar.visible=true;
	  clearInterval (this.flameInterval);
	  setTimeout(this.reStartAgain.bind(this),3000);
	}
	reStartAgain(){
	  this.flameMesh.visible = true;
	  this.spotLight.visible = true;
	  this.sugar.visible=false;
	  this.flameInterval = setInterval (this.textureAnimate.bind(this), 100);
	}
};

export{Candle};

