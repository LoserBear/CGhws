import * as THREE from "https://threejs.org/build/three.module.js";



function buildVehicle() {
  const cygeometry = new THREE.CylinderGeometry(3.5, 4, 5, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 0x006400
  });
  const cylinder = new THREE.Mesh(cygeometry, material);
  cylinder.position.y = 7.5;
  cylinder.position.x = -3;



  const cygeometry2 = new THREE.CylinderGeometry(1, 1, 10, 32);
  const cylinder2 = new THREE.Mesh(cygeometry2, material);
  cylinder2.rotation.z = Math.PI / 2;
  cylinder2.position.y = 7.5;
  cylinder2.position.x = 3;


  const geometry = new THREE.BoxGeometry(20, 5, 10);
  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 2.5;


	
  const group = new THREE.Group();
  group.add(cube);
  group.add(cylinder);
  group.add(cylinder2);

  return group;
}

export {buildVehicle};