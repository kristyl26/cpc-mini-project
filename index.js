import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import * as Tone from "tone";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./styles.css";

const section = document.querySelector("section.book");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
section.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 0, 6);
scene.add(light);

const loader = new THREE.TextureLoader();

const urls = [
  "textures/edge.png",
  "textures/spine.png",
  "textures/top.png",
  "textures/bottom.png",
  "textures/Artboard 2.png",
  "textures/Artboard 3.png"
];

const materials = urls.map((url) => {
  return new THREE.MeshLambertMaterial({
    map: loader.load(url)
  });
});

const geometry = new THREE.BoxGeometry(3.5, 5, 0.3);

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 6;

let currentTimeline= window.pageYOffset/3000
let aimTimeline= window.pageYOffset/3000

function animate() {
  requestAnimationFrame(animate);

  currentTimeline += (aimTimeline-currentTimeline)*0.1;

  const rx = currentTimeline * -0.07+ 0.5;
  const ry = currentTimeline * 2.5 + Math.PI * 2;

  cube.rotation.set(rx, ry, 0);

  renderer.render(scene, camera);
}
animate();

window.addEventListener("scoll",function(){
  aimTimeline= window.pageYOffset/3000
})
