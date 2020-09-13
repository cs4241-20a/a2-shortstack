import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/GLTFLoader.js';

import { AnimationMixer } from 'https://unpkg.com/three@0.120.1/src/animation/AnimationMixer.js';

import { RGBELoader } from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/RGBELoader.js';

let drawingSurface, copySIZE;

drawingSurface = document.getElementById('threeJS');
copySIZE = document.getElementById('copySIZE');

let scene, camera, renderer, mixer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(20, 1.0, 0.1, 1000);
renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio( window.devicePixelRatio );
renderer.toneMapping = THREE.ACESFilmicToneMapping;

drawingSurface.appendChild(renderer.domElement);

let pmremGenerator = new THREE.PMREMGenerator(renderer);

new RGBELoader()
    .setDataType(THREE.UnsignedByteType)
    .setPath('assets/')
    .load('quattro_canti_1k.hdr', function (texture) {
        let envMap = pmremGenerator.fromEquirectangular(texture).texture;
        
        scene.environment = envMap;

        texture.dispose();
        pmremGenerator.dispose();
    });

let gltfLoader = new GLTFLoader().setPath('assets/');

let carMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    clearcoat: 0.8
});

gltfLoader.load('animated.gltf', function (gltf) {
    mixer = new AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.timeScale = 3.0;
        action.play();
    });

    let shadowAlpha = new THREE.TextureLoader().load( "assets/shadow_plane.png" );
    shadowAlpha.encoding = THREE.sRGBEncoding;

    let shadowMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        alphaMap: shadowAlpha,
        transparent: true,
    });

    gltf.scene.traverse((o) => {
        if (o.isMesh) {
            if(o.material.name === "shadow_plane") {
                o.material = shadowMaterial;
                o.rotation.y = Math.PI;
                o.position.z = -0.25;
            } else if (o.material.name === "paint") {
                o.material = carMaterial;
            }
        }
    });

    scene.add(gltf.scene);
    document.getElementById('hide_on_load').style.display = "none";
});

let ambientLight = new THREE.AmbientLight( 0x202020 ); // soft white light
scene.add( ambientLight );

let clock = new THREE.Clock();

function animate() {
    let delta = clock.getDelta();
    if(mixer) {
        mixer.update(delta);
    }

    let x = Math.sin(clock.getElapsedTime() / 3.0) * 5.0;
    let y = Math.cos(clock.getElapsedTime() / 6.0) * 3.0 + 4.0;
    let z = Math.sin(clock.getElapsedTime() / 9.0) * 2.0 + 8.0;

    camera.position.set(x, y, z);
    camera.lookAt(0.0, 0.25, 0.0);

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
}

pcolor_input.onchange = () => {
    switch (pcolor_input.value) {
        case "red":
            carMaterial.color.setHex(0xff0000);
            break;
        case "blue":
            carMaterial.color.setHex(0x1111cc);
            break;
        case "green":
            carMaterial.color.setHex(0x00ff00);
            break;
        case "orange":
            carMaterial.color.setHex(0xff3500);
            break;
        case "black":
            carMaterial.color.setHex(0x050505);
            break;
        case "white":
            carMaterial.color.setHex(0xffffff);
            break;
    }
}
