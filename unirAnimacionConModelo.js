import * as THREE from './three.js-master/build/three';
import { GLTFExporter } from './three.js-master/examples/jsm/exporters/GLTFExporter';

// const API = 'https://models.readyplayer.me/642da562204b1d02c9d6c8c1.json';

// fetch(API)
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(error => console.log(error))

// Crear una instancia del cargador GLTFLoader de Three.js    
const loader = new THREE.GLTFLoader();

const markerEl = document.querySelector('a-marker');
const marker = markerEl.object3D;

const exporter = new GLTFExporter();

console.log(exporter);

exporter.parse(scene, function (gltf) {
    const fbx = new THREE.FBXExporter().parse(gltf.scene);
    console.log(fbx);
});

const blob = new Blob([fbx], { type: 'application/octet-stream' });
const url = URL.createObjectURL(blob);

const link = document.createElement('a');
link.href = url;
link.download = 'modelo.fbx';
link.click();

// Cargar el modelo de Ready Player Me
loader.load('./assets/modelo.glb', function (gltf) {
    // Obtener el modelo de la escena
    const model = gltf.scene;

    // Escalar el modelo y ajustar su posición
    model.scale.set(1.0, 0.8, 0.8);
    model.position.set(0, 0, 0);

    // Añadir el modelo a la escena
    marker.add(model);

    // Crear una instancia del cargador FBXLoader de Three.js
    const animationLoader = new THREE.FBXLoader();

    const animacion = './assets/Capoeira.fbx';

    // Cargar la animación de Mixamo
    animationLoader.load(animacion, function (animation) {
        // Ajustar la escala, la posición y la orientación de la animación
        animation.scale.set(0.01, 0.01, 0.01);
        animation.position.set(0, 0, 0);
        animation.rotation.set(0, Math.PI, 0);

        // Crear una instancia de AnimationMixer para la animación
        const mixer = new THREE.AnimationMixer(model);

        // Agregar la animación al mixer
        const action = mixer.clipAction(animation.animations[0]);
        action.play();

        // Agregar una función de actualización para el mixer en el render loop
        function update() {
            mixer.update(clock.getDelta());
        }

        // Inicializar un reloj para el mixer
        const clock = new THREE.Clock();

        // Render loop
        function render() {
            update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        render();
    });
});