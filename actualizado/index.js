const root = document.getElementById('root');
const scene = document.querySelector('a-scene');

const boxPositions = {
    position1: '-0.6 1.8 0.0',
    position2: '-0.2 1.8 0.0',
    position3: '0.2 1.8 0.0',
    position4: '0.6 1.8 0.0',
}

const boxImages = {
    linkedin: 'https://cdn.glitch.global/8c23ebc0-9534-463d-a1e1-54b9894f2582/Linkedin.jpg?v=1681321316606',
    facebook: 'https://cdn.glitch.global/8c23ebc0-9534-463d-a1e1-54b9894f2582/Faceboook.jpg?v=1681321316216',
    youtube: 'https://cdn.glitch.global/8c23ebc0-9534-463d-a1e1-54b9894f2582/Youtube.jpg?v=1681321317020',
    discord: 'https://cdn.glitch.global/8c23ebc0-9534-463d-a1e1-54b9894f2582/Discord.jpg?v=1681321315750',
}

async function getData() {
    try {
        const response = await fetch('http://localhost:3001/');
        const data = await response.json();

        const camera = document.createElement('a-camera');
        camera.setAttribute('camera', '');
        camera.setAttribute('raycaster', '');
        camera.setAttribute('position', '0 0 0');
        camera.setAttribute('fov', '45');
        camera.setAttribute('look-controls-enabled', 'false');

        root.insertAdjacentElement('afterbegin', camera);

        const markerData = {};

        data.forEach(e => {
            const marker = createMarker(`marker${e.id}`, 'pattern', e.urlMarker);
            const entity = createEntity(`entity${e.id}-marker${e.id}`, e.urlModel);

            marker.appendChild(entity);

            marker.addEventListener('markerFound', function () {
                for (let i = 1; i < 5; i++) {
                    const box = createBox(e[`socialNetwork${i}`], `marker${e.id}`, boxPositions[`position${i}`], boxImages[`${e[`socialNetwork${i}`]}`]);
                    markerData[`box${i}-marker${e.id}`] = box;
                }

                const idMarker = marker.id;
                for (let i = 1; i < 5; i++) {
                    if (markerData.hasOwnProperty(`box${i}-${idMarker}`)) {
                        marker.appendChild(markerData[`box${i}-${idMarker}`]);
                    }
                }
            });

            marker.addEventListener('markerLost', function () {
                const idMarker = marker.id;
                for (let i = 1; i < 5; i++) {
                    if (markerData.hasOwnProperty(`box${i}-${idMarker}`)) {
                        marker.removeChild(markerData[`box${i}-${idMarker}`]);
                    }
                }

                for (let i = 1; i < 5; i++) {
                    delete markerData[`box${i}-marker${e.id}`];
                }
            });

            root.insertAdjacentElement('afterbegin', marker);
        });

    } catch (error) {
        console.log(error);
    }
}

const createMarker = (markerId, markerType, markerURL) => {
    const marker = document.createElement('a-marker');
    marker.setAttribute('id', markerId);
    marker.setAttribute('type', markerType);
    marker.setAttribute('preset', 'custom');
    marker.setAttribute('url', markerURL);
    marker.setAttribute('ar-tracking', '');
    return marker;
}

const createEntity = (entityId, entityURL) => {
    const entity = document.createElement('a-entity');
    entity.setAttribute('id', entityId);
    entity.setAttribute('gltf-model', entityURL);
    entity.setAttribute('position', '0.0 0.0 0.0');
    entity.setAttribute('scale', '1.0 0.8 0.8');
    return entity;
}

const createBox = (boxId, boxClass, boxPosition, boxMaterial) => {
    const box = document.createElement('a-box');
    box.setAttribute('id', boxId);
    box.setAttribute('class', boxClass);
    box.setAttribute('position', boxPosition);
    box.setAttribute('color', 'white');
    box.setAttribute('material', `src:${boxMaterial}`);
    box.setAttribute('depth', '0.3');
    box.setAttribute('height', '0.3');
    box.setAttribute('width', '0.3');
    box.setAttribute('handle-click-social-network', '');
    return box;
}

window.addEventListener('DOMContentLoaded', getData);
