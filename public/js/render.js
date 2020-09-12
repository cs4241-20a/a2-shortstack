import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/GLTFLoader.js';

import { AnimationMixer } from 'https://unpkg.com/three@0.120.1/src/animation/AnimationMixer.js';

import { RGBELoader } from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/RGBELoader.js';

let drawingSurface, copySIZE, copyOFFSET;

drawingSurface = document.getElementById('threeJS');
copySIZE = document.getElementById('copySIZE');
copyOFFSET = document.getElementById('copyOFFSET');

let scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(20, 1.0, 0.1, 1000);
renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

drawingSurface.appendChild(renderer.domElement);

let pmremGenerator = new THREE.PMREMGenerator(renderer);

new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .setPath('assets/')
    .load('royal_esplanade_1k.hdr', function (texture) {
        let envMap = pmremGenerator.fromEquirectangular(texture).texture;
;
        scene.environment = envMap;

        texture.dispose();
        pmremGenerator.dispose();
    });

let gltfLoader = new GLTFLoader().setPath('assets/');

gltfLoader.load('animated.gltf', function (gltf) {
    mixer = new AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
    });

    scene.add(gltf.scene);
});


let clock = new THREE.Clock();

var r = "https://threejs.org/examples/textures/cube/Bridge2/";
var urls = [ r + "posx.jpg", r + "negx.jpg",
                        r + "posy.jpg", r + "negy.jpg",
                        r + "posz.jpg", r + "negz.jpg" ];

var textureCube = new THREE.CubeTextureLoader().load( urls );
textureCube.format = THREE.RGBFormat;

let mixer;

function animate() {
    let delta = clock.getDelta();
    if(mixer) {
        mixer.update(delta);
    }

    let x = Math.sin(clock.getElapsedTime() / 3.0) * 5.0;
    let y = Math.cos(clock.getElapsedTime() / 6.0) * 1.0 + 2.0;
    let z = Math.sin(clock.getElapsedTime() / 9.0) * 2.0 + 8;

    camera.position.set(x, y, z);
    camera.lookAt(0.0, 0.5, 0.0);

    renderer.render(scene, camera);

    requestAnimationFrame(animate);

}

animate();

window.onresize = () => {
    setRenderSize();
};

setRenderSize();

function setRenderSize() {
    camera.aspect = copySIZE.clientWidth / copySIZE.offsetHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(copySIZE.clientWidth, copySIZE.offsetHeight);

    drawingSurface.style.marginTop = copyOFFSET.offsetHeight + 'px';
}
