const video = document.getElementById('preview');
const scanner = new Instascan.Scanner({ video });

const marker = document.querySelector('a-marker');
const scene = document.getElementById('scene');

const boxPositions = [
    {
        position1: '0.0 7.0 0.0'
    },
    {
        position1: '-1.0 7.0 0.0',
        position2: '1.0 7.0 0.0'
    },
    {
        position1: '-2 7.0 0.0',
        position2: '0.0 7.0 0.0',
        position3: '2 7.0 0.0'
    },
    {
        position1: '-3.0 7.0 0.0',
        position2: '-1.0 7.0 0.0',
        position3: '1.0 7.0 0.0',
        position4: '3.0 7.0 0.0'
    }
];

const boxDimensions = {
    depth: '1.5',
    height: '1.5',
    width: '1.5'
};

const boxImagesPath = '../assets/images/';

const boxImages = {
    instagram: `${boxImagesPath}instagram.png`,
    facebook: `${boxImagesPath}facebook.png`,
    twitter: `${boxImagesPath}twitter.png`,
    whatsapp: `${boxImagesPath}whatsapp.png`,
    linkedin: `${boxImagesPath}linkedin.png`,
    correo: `${boxImagesPath}correo.png`,
    telegram: `${boxImagesPath}telegram.png`,
    messenger: `${boxImagesPath}messenger.png`,
    snapchat: `${boxImagesPath}snapchat.png`,
    spotify: `${boxImagesPath}spotify.png`,
    youtube: `${boxImagesPath}youtube.png`,
    discord: `${boxImagesPath}discord.png`,
    pinterest: `${boxImagesPath}pinterest.png`,
    tiktok: `${boxImagesPath}tiktok.png`
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
        const amountOfBoxes = social.length;

        console.log(data);
        console.log(social);
        console.log(amountOfBoxes);

        createCamera();

        const markerData = {};

        marker.addEventListener('markerFound', function () {
            while (marker.firstChild) {
                marker.removeChild(marker.firstChild);
            }
            console.log('Marcador Encontrado');
            const entity = createEntity(urlRPM);
            marker.appendChild(entity);

            const position = 0
            for (let i = 0; i < amountOfBoxes; i++) {
                const socialName = social[i].name;
                const box = createBox(socialName, boxPositions[amountOfBoxes - 1][`position${i + 1}`], boxImages[socialName], boxDimensions.depth, boxDimensions.height, boxDimensions.width);

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
    const entity = document.createElement("a-entity");
    entity.setAttribute('position', '0.0 0.0 0.0');
    entity.setAttribute('scale', '3 3 3');
    entity.setAttribute('modelo-gltf', content);
    entity.setAttribute('animation-mixer', '');
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