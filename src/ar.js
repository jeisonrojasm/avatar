const data = JSON.parse(localStorage.getItem('data'));

const marker = document.querySelector('a-marker');
const scene = document.querySelector('a-scene');

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el ancho y la altura de la ventana
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    // Calcular la relación de aspecto
    let aspectRatio = windowWidth / windowHeight;

    // Mostrar la relación de aspecto en la consola
    console.log('La relación de aspecto de la ventana es: ' + aspectRatio);
    setTimeout(() => {

        var canvasElement = document.querySelector('a-scene canvas');

        canvasElement.classList.remove('a-canvas')
        canvasElement.classList.add('a-canvas-avatar')

        if (aspectRatio < 0.2) {
            canvasElement.classList.add('a-canvas-200')
        } else if (aspectRatio < 0.4) {
            canvasElement.classList.add('a-canvas-180')
        } else if (aspectRatio < 0.6) {
            canvasElement.classList.add('a-canvas-150')
        } else if (aspectRatio < 0.8) {
            canvasElement.classList.add('a-canvas-220')
        } else if (aspectRatio < 1) {
            canvasElement.classList.add('a-canvas-90')
        } else if (aspectRatio < 1.2) {
            canvasElement.classList.add('a-canvas-70')
        } else if (aspectRatio < 1.6) {
            canvasElement.classList.add('a-canvas-60')
        } else if (aspectRatio < 2) {
            canvasElement.classList.add('a-canvas-50')
        } else if (aspectRatio < 2.4) {
            canvasElement.classList.add('a-canvas-40')
        } else if (aspectRatio >= 3) {
            canvasElement.classList.add('a-canvas-35')
        }

    }, 2000);
});

const deviceWidth = window.innerWidth;

const boxPositionsDesktop = [
    {
        position1: '0.0 -1.7 -5.0'
    },
    {
        position1: '-0.3 -1.7 -5.0',
        position2: '0.3 -1.7 -5.0'
    },
    {
        position1: '-0.6 -1.7 -5.0',
        position2: '0.0 -1.7 -5.0',
        position3: '0.6 -1.7 -5.0'
    },
    {
        position1: '-0.9 -1.7 -5.0',
        position2: '-0.3 -1.7 -5.0',
        position3: '0.3 -1.7 -5.0',
        position4: '0.9 -1.7 -5.0'
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
    camera.setAttribute('position', '0 1 0');
    camera.setAttribute('rotation', '-10 0 0');
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
    aText.setAttribute('position', '0 1.9 -5');
    aText.setAttribute('scale', '0.6 0.6 0.6');

    return aText;
}

const createEntity = (content) => {
    const entity = document.createElement("a-entity");
    entity.setAttribute('modelo-gltf', content);
    entity.setAttribute('animation-mixer', '');
    entity.setAttribute('handle-click-change-animation', '');
    entity.setAttribute('aabb-collider', '');
    entity.setAttribute('id', 'avatar');
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
    clickeableArea.setAttribute("geometry", "depth: 0.25; width: 0.55; height: 2");
    clickeableArea.setAttribute("material", "color: #ff0000; transparent: true; opacity: 0.0");
    clickeableArea.setAttribute("handle-click-change-animation", "");

    return clickeableArea;
}

createCamera();

const markerData = {};

const entity = createEntity(urlRPM);
const text = createText(name);
const clickeableArea = createAreaToChangeAnimation();

scene.setAttribute('gesture-detector', '');
scene.setAttribute('gesture-detector-mouse', '');
scene.appendChild(text);
scene.appendChild(entity);
scene.appendChild(clickeableArea);

// Darle características a la entidad que contiene el modelo GLB
entity.setAttribute('position', '0 -1.0 -5');
entity.setAttribute('rotation', '0 0 0');
entity.setAttribute('scale', `1.35 1.35 1.35`);

// Crear cada una de las cajas, añadirle las redes sociales e incorporarlas a la escena
for (let i = 0; i < amountOfBoxes; i++) {
    let socialName = social[i].name;

    if (socialName === 'Correo electrónico') {
        socialName = 'correo';
    }

    let positions;
    let scales;
    positions = [...boxPositionsDesktop];
    scales = '0.4 0.4 0.4';

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