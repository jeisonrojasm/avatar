const video = document.getElementById('preview');
const scanner = new Instascan.Scanner({ video });

const marker = document.querySelector('a-marker');
const scene = document.getElementById('scene');

const boxPositions = [
    {
        position1: '0.0 16.0 0.0'
    },
    {
        position1: '-1.0 16.0 0.0',
        position2: '1.0 16.0 0.0'
    },
    {
        position1: '-2 16.0 0.0',
        position2: '0.0 16.0 0.0',
        position3: '2 16.0 0.0'
    },
    {
        position1: '-3.0 16.0 0.0',
        position2: '-1.0 16.0 0.0',
        position3: '1.0 16.0 0.0',
        position4: '3.0 16.0 0.0'
    }
];

const boxDimensions = {
    depth: '1.5',
    height: '1.5',
    width: '1.5'
};

const boxImagesPath = '../assets/images/';

export const boxImages = {
    Instagram: `${boxImagesPath}instagram.png`,
    Facebook: `${boxImagesPath}facebook.png`,
    Twitter: `${boxImagesPath}twitter.png`,
    WhatsApp: `${boxImagesPath}whatsapp.png`,
    LinkedIn: `${boxImagesPath}linkedin.png`,
    correo: `${boxImagesPath}correo.png`,
    Telegram: `${boxImagesPath}telegram.png`,
    Messenger: `${boxImagesPath}messenger.png`,
    Snapchat: `${boxImagesPath}snapchat.png`,
    Spotify: `${boxImagesPath}spotify.png`,
    Youtube: `${boxImagesPath}youtube.png`,
    Discord: `${boxImagesPath}discord.png`,
    Pinterest: `${boxImagesPath}pinterest.png`,
    TikTok: `${boxImagesPath}tiktok.png`
};

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
    }
});

localStorage.setItem('idAvatarCurrent', '');
let idAvatarCurrentLS = localStorage.getItem('idAvatarCurrent');
let idAvatarLastLS = localStorage.setItem('idAvatarLast', '');

// ESCANEAR QR
scanner.addListener('scan', function (content) {
    console.log('QR: ' + content);

    const lastIndexOfSlash = content.lastIndexOf('avatar=');
    const idAvatar = content.slice(lastIndexOfSlash + 7);

    localStorage.setItem('idAvatarCurrent', `${idAvatar}`);
    idAvatarCurrentLS = localStorage.getItem('idAvatarCurrent');
    idAvatarLastLS = localStorage.getItem('idAvatarLast');

    if (idAvatarCurrentLS !== idAvatarLastLS) {
        while (marker.firstChild) {
            marker.removeChild(marker.firstChild);
        }

        const camera = document.querySelector('a-camera');

        if (camera) {
            scene.removeChild(camera);
        }

        console.log('Haciendo fetch...');
        localStorage.setItem('idAvatarLast', `${idAvatarCurrentLS}`);
        getData(idAvatar);
    }
});

// FETCH
async function getData(idAvatar) {
    try {
        const response = await fetch(`https://main.d14z3n2zfezi4a.amplifyapp.com/api/avatars/${idAvatar}`);
        // const response = await fetch(`http://localhost:3001/avatars/${idAvatar}`);
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
                let socialName = social[i].name;

                if (socialName === 'Correo electrónico') {
                    socialName = 'correo';
                }

                const userName = social[i].identifier;
                const box = createBox(socialName, boxPositions[amountOfBoxes - 1][`position${i + 1}`], boxImages[socialName], boxDimensions.depth, boxDimensions.height, boxDimensions.width, userName);

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
        alert('Es posible que estés intentando escanear un código QR inválido. Asegúrate de intentar escanear un código QR válido e inténtalo de nuevo.');
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
    // camera.setAttribute('facingMode', 'environment');
    camera.setAttribute('user-controls', '');

    scene.appendChild(camera);
};

const createEntity = (content) => {
    const entity = document.createElement("a-entity");
    entity.setAttribute('position', '0.0 0.0 0.0');
    entity.setAttribute('scale', '3 3 3');
    entity.setAttribute('modelo-gltf', content);
    entity.setAttribute('animation-mixer', '');
    entity.setAttribute('rotation', '90 0 0');
    return entity;
}

const createBox = (boxId, boxPosition, boxMaterial, depth, height, width, username) => {
    const box = document.createElement('a-box');
    box.setAttribute('id', boxId);
    box.setAttribute('position', boxPosition);
    box.setAttribute('color', 'white');
    box.setAttribute('material', `src:${boxMaterial}`);
    box.setAttribute('depth', depth);
    box.setAttribute('height', height);
    box.setAttribute('width', width);
    box.setAttribute('username', username);
    box.setAttribute('handle-click-social-network', '');
    return box;
}