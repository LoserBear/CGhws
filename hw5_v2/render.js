import {scene,camera,renderer} from "./main_v2.js";
function render() {
    renderer.render(scene, camera);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
export {onWindowResize,render};