import * as THREE from 'three';

// ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// CÁMARA 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;

// WEBGL
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// CORRECCIÓN: CREAMOS UN GRUPO PARA EL SEMÁFORO
const semaforoGrupo = new THREE.Group();
scene.add(semaforoGrupo);

// CUBO ALARGADO
const cajaSemaforo = new THREE.BoxGeometry(1.2, 3.6, 0.5);
const materialCaja = new THREE.MeshStandardMaterial({
  color: 0x2b2b2b,
  roughness: 0.5,
  metalness: 0.6
});
const cuerpo = new THREE.Mesh(cajaSemaforo, materialCaja);
semaforoGrupo.add(cuerpo);

const paloSemaforo = new THREE.BoxGeometry(0.3, 5, 0.3);
const materialPalo = new THREE.MeshStandardMaterial({
  color: 0xC76E00,
  roughness: 0.5,
  metalness: 0.6
});
const palo = new THREE.Mesh(paloSemaforo, materialPalo);
scene.add(palo);
palo.position.y = -2;

const baseSemaforo = new THREE.BoxGeometry(0.6, 0.1, 0.4);
const materialbase = new THREE.MeshStandardMaterial({
  color: 0xFFD700,
  roughness: 0.5,
  metalness: 0.6
});
const base = new THREE.Mesh(baseSemaforo, materialbase);
scene.add(base);
base.position.y = -4.5;

// TRES ESFERAS
const esferaRoja = new THREE.Mesh(
  new THREE.SphereGeometry(0.35, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
esferaRoja.position.y = 1.2;
esferaRoja.position.z = 0.20; 

const esferaAmarilla = new THREE.Mesh(
  new THREE.SphereGeometry(0.35, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xffff00 })
);
esferaAmarilla.position.y = 0;
esferaAmarilla.position.z = 0.20;

const esferaVerde = new THREE.Mesh(
  new THREE.SphereGeometry(0.35, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
esferaVerde.position.y = -1.2;
esferaVerde.position.z = 0.20;

// ESFERAS AÑADIDAS
semaforoGrupo.add(esferaRoja, esferaAmarilla, esferaVerde);

// ILUMINACIÓN
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// ANIMACIÓN
function animate() {
  requestAnimationFrame(animate);

  palo.rotation.y += 0.01;
  base.rotation.y += 0.01;
  semaforoGrupo.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// RESPONSIVIDAD 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});