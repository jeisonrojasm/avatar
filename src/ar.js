const data = JSON.parse(localStorage.getItem('data'));

const marker = document.querySelector('a-marker');
const scene = document.querySelector('a-scene');

const deviceWidth = window.innerWidth;

const boxPositionsDesktop = [
    {
        position1: '0.0 -1.6 -5.0'
    },
    {
        position1: '-0.5 -1.6 -5.0',
        position2: '0.5 -1.6 -5.0'
    },
    {
        position1: '-1 -1.6 -5.0',
        position2: '0.0 -1.6 -5.0',
        position3: '1 -1.6 -5.0'
    },
    {
        position1: '-1.5 -1.6 -5.0',
        position2: '-0.5 -1.6 -5.0',
        position3: '0.5 -1.6 -5.0',
        position4: '1.5 -1.6 -5.0'
    }
];

const boxPositionsMobile = [
    {
        position1: '0.0 -1.4 -5.0'
    },
    {
        position1: '-0.5 -1.4 -5.0',
        position2: '0.5 -1.4 -5.0'
    },
    {
        position1: '-1 -1.4 -5.0',
        position2: '0.0 -1.4 -5.0',
        position3: '1 -1.4 -5.0'
    },
    {
        position1: '-1.5 -1.4 -5.0',
        position2: '-0.5 -1.4 -5.0',
        position3: '0.5 -1.4 -5.0',
        position4: '1.5 -1.4 -5.0'
    }
];

const boxDimensionsDesktop = {
    depth: '0.25',
    height: '0.25',
    width: '0.25'
};

const boxDimensionsMobile = {
    depth: '0.25',
    height: '0.25',
    width: '0.6'
};

const boxImagesPath = '../assets/images/';

export const boxImages = {
    Instagram: `${boxImagesPath}instagram.png`,
    Facebook: `${boxImagesPath}facebook.png`,
    Twitter: `${boxImagesPath}twitter.png`,
    WhatsApp: `${boxImagesPath}whatsapp.png`,
    LinkedIn: `${boxImagesPath}linkedin.png`,
    Correo: `${boxImagesPath}correo.png`,
    Telegram: `${boxImagesPath}telegram.png`,
    Messenger: `${boxImagesPath}messenger.png`,
    Snapchat: `${boxImagesPath}snapchat.png`,
    Spotify: `${boxImagesPath}spotify.png`,
    Youtube: `${boxImagesPath}youtube.png`,
    Discord: `${boxImagesPath}discord.png`,
    Pinterest: `${boxImagesPath}pinterest.png`,
    TikTok: `${boxImagesPath}tiktok.png`
};

const { social, name } = data; //[]
// const urlRPM = data.urlRPM + '?quality=low';

// Pruebas con modelo de alta calidad
// const urlRPM = 'https://models.readyplayer.me/6596aa0586bea20eae21c2a4.glb?quality=high&textureQuality=high&textureSizeLimit=1024';
const urlRPM = data.urlGLB;
console.log(urlRPM);
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

const createText = (text) => {
    const aText = document.createElement("a-text");
    aText.setAttribute('font', 'https://cdn.aframe.io/fonts/Monoid.fnt');
    aText.setAttribute('value', `${text}`);
    aText.setAttribute('color', 'white');
    aText.setAttribute('align', 'center');

    if (deviceWidth > 500) {
        aText.setAttribute('position', '0 1.5 -5');
        aText.setAttribute('scale', '0.6 0.6 0.6');
    } else {
        aText.setAttribute('position', '0 1.3 -5');
        aText.setAttribute('scale', '2 0.8 1');
    }
    return aText;
}

const createEntity = (content) => {
    const entity = document.createElement("a-entity");
    entity.setAttribute('modelo-gltf', content);
    entity.setAttribute('animation-mixer', '');
    entity.setAttribute('handle-click-change-animation', '');
    entity.setAttribute('aabb-collider', '');
    return entity;
}

// const createBox = (boxId, boxPosition, boxMaterial, depth, height, width, username) => {
//     const box = document.createElement('a-box');
//     box.setAttribute('id', boxId);
//     box.setAttribute('position', boxPosition);
//     box.setAttribute('color', 'white');
//     box.setAttribute('material', `src:${boxMaterial}; transparent: true;`);
//     box.setAttribute('depth', depth);
//     box.setAttribute('height', height);
//     box.setAttribute('width', width);
//     box.setAttribute('username', username);
//     box.setAttribute('handle-click-social-network', '');
//     return box;
// }

const createSocialNetworkBox = (socialName, userName, boxPosition, scales) => {
    console.log('name', socialName);
    console.log('socialNetworkUsername', userName);
    const socialNetworkBox = document.createElement("a-entity");
    socialNetworkBox.setAttribute('gltf-model', `#${socialName.toLowerCase()}`); // social[i].name.toLowerCase()
    socialNetworkBox.setAttribute('scale', scales);
    socialNetworkBox.setAttribute('position', boxPosition);
    socialNetworkBox.setAttribute('username', userName); // social[i].identifier
    socialNetworkBox.setAttribute('handle-click-social-network', '')
    socialNetworkBox.setAttribute('id', socialName) // social[i].name

    return socialNetworkBox;
}

const createAreaToChangeAnimation = () => {
    const clickeableArea = document.createElement('a-entity');
    clickeableArea.setAttribute("position", "0 0 -5");
    if (deviceWidth > 500) {
        clickeableArea.setAttribute("geometry", "depth: 0.25; width: 0.55; height: 2");
    } else {
        clickeableArea.setAttribute("geometry", "depth: 0.25; width: 2; height: 2");
    }
    clickeableArea.setAttribute("material", "color: #ff0000; transparent: true; opacity: 0.0");
    clickeableArea.setAttribute("handle-click-change-animation", "");

    return clickeableArea;
}

createCamera();

const markerData = {};

const entity = createEntity(urlRPM);
const text = createText(name);
const clickeableArea = createAreaToChangeAnimation();

scene.appendChild(text);
scene.appendChild(entity);
scene.appendChild(clickeableArea);

// Darle características a la entidad que contiene el modelo GLB
if (deviceWidth > 500) {
    entity.setAttribute('position', '0 -0.8 -5');
    entity.setAttribute('rotation', '0 180 180')
    entity.setAttribute('scale', `0.5 0.5 0.5`);
} else {
    entity.setAttribute('position', '0 -0.9 -5');
    entity.setAttribute('rotation', '0 180 180')
    entity.setAttribute('scale', `1.5 0.5 0.5`);
}

// Crear cada una de las cajas, añadirle las redes sociales e incorporarlas a la escena
for (let i = 0; i < amountOfBoxes; i++) {
    let socialName = social[i].name;

    if (socialName === 'Correo electrónico') {
        socialName = 'correo';
    }

    let positions;
    let scales;
    // let boxDimensions;
    if (deviceWidth < 500) {
        positions = [...boxPositionsMobile];
        scales = '0.76 0.2 0.2';
        //     boxDimensions = { ...boxDimensionsMobile };
    } else {
        positions = [...boxPositionsDesktop];
        scales = '0.4 0.4 0.4';
        //     boxDimensions = { ...boxDimensionsDesktop };
    }

    const userName = social[i].identifier;
    // const box = createBox(socialName, positions[amountOfBoxes - 1][`position${i + 1}`], boxImages[socialName], boxDimensions.depth, boxDimensions.height, boxDimensions.width, userName);
    const box = createSocialNetworkBox(socialName, userName, positions[amountOfBoxes - 1][`position${i + 1}`], scales);

    // markerData[socialName] = box;
    scene.appendChild(box);
}


// marker.addEventListener('markerFound', function () {
//     while (marker.firstChild) {
//         marker.removeChild(marker.firstChild);
//     }

//     const entity = createEntity(urlRPM);
//     marker.appendChild(entity);

//     for (let i = 0; i < amountOfBoxes; i++) {
//         let socialName = social[i].name;

//         if (socialName === 'Correo electrónico') {
//             socialName = 'correo';
//         }

//         let positions;
//         if (deviceWidth < 500) {
//             positions = [...boxPositionsMobile];
//         } else {
//             positions = [...boxPositionsDesktop];
//         }

//         const userName = social[i].identifier;
//         const box = createBox(socialName, positions[amountOfBoxes - 1][`position${i + 1}`], boxImages[socialName], boxDimensions.depth, boxDimensions.height, boxDimensions.width, userName);

//         markerData[socialName] = box;
//         marker.appendChild(box);
//     }
// });

// marker.addEventListener('markerLost', function () {
//     while (marker.firstChild) {
//         marker.removeChild(marker.firstChild);
//     }
// });