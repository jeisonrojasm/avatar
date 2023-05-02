const video = document.getElementById('preview');
const scanner = new Instascan.Scanner({ video });

const marker = document.querySelector('a-marker');
const scene = document.getElementById('scene');



// SCAN QR VALUE

const boxPositions = {
    position1: '-3.0 7.0 0.0',
    position2: '-1.0 7.0 0.0',
    position3: '1.0 7.0 0.0',
    position4: '3.0 7.0 0.0'
};

const boxDimensions = {
    depth: '1.25',
    height: '1.25',
    width: '1.25'
};

const boxImages = {
    linkedin: 'https://cdn.glitch.global/8c23ebc0-9534-463d-a1e1-54b9894f2582/Linkedin.jpg?v=1681321316606',
    facebook: 'https://cdn.glitch.global/8c23ebc0-9534-463d-a1e1-54b9894f2582/Faceboook.jpg?v=1681321316216',
    youtube: 'https://cdn.glitch.global/8c23ebc0-9534-463d-a1e1-54b9894f2582/Youtube.jpg?v=1681321317020',
    discord: 'https://cdn.glitch.global/8c23ebc0-9534-463d-a1e1-54b9894f2582/Discord.jpg?v=1681321315750'
};

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
    }
});

// ESCANEAR QR

scanner.addListener('scan', function (content) {
    console.log('QR: ' + content);

    const lastIndexOfSlash = content.lastIndexOf('/');
    const lastIndexOfDot = content.lastIndexOf('.');

    const idAvatar = content.slice(lastIndexOfSlash + 1, lastIndexOfDot);

    while (marker.firstChild) {
        marker.removeChild(marker.firstChild);
    }

    const camera = document.querySelector('a-camera');

    if (camera) {
        scene.removeChild(camera);
    }

    getData(idAvatar);
});

const boxImagesLength = Object.keys(boxImages).length;

// FETCH

async function getData(idAvatar) {
    try {
        const response = await fetch(`http://localhost:3001/avatars/${idAvatar}`);
        const data = await response.json();

        const { social } = data;
        const { urlRPM } = data;
        console.log(social);

        console.log(data);

        createCamera();

        const markerData = {};

        marker.addEventListener('markerFound', function () {
            while (marker.firstChild) {
                marker.removeChild(marker.firstChild);
            }
            console.log('Marcador Encontrado');
            const entity = createEntity(urlRPM);
            marker.appendChild(entity);

            for (let i = 0; i < social.length; i++) {
                const socialName = social[i].name;
                const box = createBox(socialName, boxPositions[`position${i + 1}`], boxImages[socialName], boxDimensions.depth, boxDimensions.height, boxDimensions.width);

                markerData[socialName] = box;
                marker.appendChild(box);
            }
        });

        marker.addEventListener('markerLost', function () {
            while (marker.firstChild) {
                marker.removeChild(marker.firstChild);
            }
        });

    } catch (error) {
        console.log(error);
    }
}

// MÉTODOS

const createCamera = () => {
    const camera = document.createElement('a-camera');
    camera.setAttribute('camera', '');
    camera.setAttribute('raycaster', '');
    camera.setAttribute('position', '0 0 0');
    camera.setAttribute('fov', '45');
    camera.setAttribute('look-controls-enabled', 'false');

    scene.appendChild(camera);
};

const createEntity = (content) => {
    const entity = document.createElement('a-entity');
    entity.setAttribute('position', '0.0 0.0 0.0');
    entity.setAttribute('scale', '3 3 3');
    entity.setAttribute('gltf-model', content);
    entity.setAttribute('animation-mixer', '');
    entity.setAttribute('handleModelLoaded', '');
    return entity;
}

const createBox = (boxId, boxPosition, boxMaterial, depth, height, width) => {
    const box = document.createElement('a-box');
    box.setAttribute('id', boxId);
    box.setAttribute('position', boxPosition);
    box.setAttribute('color', 'white');
    box.setAttribute('material', `src:${boxMaterial}`);
    box.setAttribute('depth', depth);
    box.setAttribute('height', height);
    box.setAttribute('width', width);
    box.setAttribute('handle-click-social-network', '');
    return box;
}