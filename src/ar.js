const data = JSON.parse(localStorage.getItem('data'));

const marker = document.querySelector('a-marker');
const scene = document.querySelector('a-scene');

const deviceWidth = window.innerWidth;

const boxPositionsDesktop = [
    {
        position1: '0.0 0.0 1.0'
    },
    {
        position1: '-1.0 0.0 1.0',
        position2: '1.0 0.0 1.0'
    },
    {
        position1: '-2 0.0 1.0',
        position2: '0.0 0.0 1.0',
        position3: '2 0.0 1.0'
    },
    {
        position1: '-3.0 0.0 1.0',
        position2: '-1.0 0.0 1.0',
        position3: '1.0 0.0 1.0',
        position4: '3.0 0.0 1.0'
    }
];

const boxPositionsMobile = [
    {
        position1: '0.0 0.0 0.4'
    },
    {
        position1: '-0.5 0.0 0.4',
        position2: '0.5 0.0 0.4'
    },
    {
        position1: '-2 0.0 0.4',
        position2: '0.0 0.0 0.4',
        position3: '2 0.0 0.4'
    },
    {
        position1: '-3.0 0.0 0.4',
        position2: '-1.0 0.0 0.4',
        position3: '1.0 0.0 0.4',
        position4: '3.0 0.0 0.4'
    }
];

const boxDimensions = {
    depth: '0.25',
    height: '0.25',
    width: '0.25'
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

const { social } = data;
const urlRPM = data.urlRPM + '?quality=low';
const amountOfBoxes = social.length;

// MÉTODOS
const createCamera = () => {
    const camera = document.createElement('a-camera');
    camera.setAttribute('camera', '');
    camera.setAttribute('raycaster', '');
    camera.setAttribute('position', '0 0 0');
    camera.setAttribute('fov', '45');
    camera.setAttribute('look-controls-enabled', 'false');
    camera.setAttribute('user-controls', '');

    scene.appendChild(camera);
};

const createEntity = (content) => {
    const entity = document.createElement("a-entity");
    entity.setAttribute('position', '0.0 0.0 -0.5');
    entity.setAttribute('rotation', '0 90 0');
    if (deviceWidth < 500) {
        // entity.setAttribute('scale', `3 2 1.5`);
        entity.setAttribute('scale', `0.4 0.5 0.2`);
    } else {
        // entity.setAttribute('scale', `3 3 3`);
        entity.setAttribute('scale', `0.7 0.8 0.5`);
    }
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

createCamera();

const markerData = {};

marker.addEventListener('markerFound', function () {
    while (marker.firstChild) {
        marker.removeChild(marker.firstChild);
    }

    const entity = createEntity(urlRPM);
    marker.appendChild(entity);

    for (let i = 0; i < amountOfBoxes; i++) {
        let socialName = social[i].name;

        if (socialName === 'Correo electrónico') {
            socialName = 'correo';
        }

        let positions;
        if (deviceWidth < 500) {
            positions = [...boxPositionsMobile];
        } else {
            positions = [...boxPositionsDesktop];
        }

        const userName = social[i].identifier;
        const box = createBox(socialName, positions[amountOfBoxes - 1][`position${i + 1}`], boxImages[socialName], boxDimensions.depth, boxDimensions.height, boxDimensions.width, userName);

        markerData[socialName] = box;
        marker.appendChild(box);
    }
});

marker.addEventListener('markerLost', function () {
    while (marker.firstChild) {
        marker.removeChild(marker.firstChild);
    }
});