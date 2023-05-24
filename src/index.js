let qrBoxWidth;

if (window.innerWidth < 300) {
    qrBoxWidth = 150;
} else if (window.innerWidth < 400) {
    qrBoxWidth = 200;
} else if (window.innerWidth < 500) {
    qrBoxWidth = 250;
} else if (window.innerWidth < 700) {
    qrBoxWidth = 350;
} else {
    qrBoxWidth = 550;
}
const html5QrCode = new Html5Qrcode("reader");

localStorage.setItem('idAvatarCurrent', '');
let idAvatarCurrentLS = localStorage.getItem('idAvatarCurrent');
let idAvatarLastLS = localStorage.setItem('idAvatarLast', '');

const progressBar = document.getElementById('progress');
const progressBarContainer = document.getElementById('progress-bar-container');

function onScanSuccess(content) {
    document.querySelector('#scan-frame-container').classList.add('hidden');
    progressBarContainer.classList.remove('hidden');
    progressBarContainer.classList.add('progress-bar-container-shown');

    const lastIndexOfSlash = content.lastIndexOf('avatar=');
    const idAvatar = content.slice(lastIndexOfSlash + 7);

    localStorage.setItem('idAvatarCurrent', `${idAvatar}`);
    idAvatarCurrentLS = localStorage.getItem('idAvatarCurrent');
    idAvatarLastLS = localStorage.getItem('idAvatarLast');

    if (idAvatarCurrentLS !== idAvatarLastLS) {

        // const modal = document.createElement('div');
        // modal.innerText = 'Trayendo avatar...';
        // modal.setAttribute('id', 'modal');

        // document.querySelector('#scan-frame-container').remove();
        // const body = document.querySelector('body');

        // body.insertBefore(modal, body.firstChild);

        // document.querySelector('#reader').classList.add('readerBlack');
        progressBar.style.width = 10 + '%';

        localStorage.setItem('idAvatarLast', `${idAvatarCurrentLS}`);

        setTimeout(() => {
            for (let i = 1; i < 4; i++) {
                progressBar.style.width = (i * 10) + '%';
                if (i === 3) {
                    getData(idAvatar);
                }
            }
        }, 2000);

    }
}

html5QrCode.start({ facingMode: "environment" }, { fps: 10 }, onScanSuccess)
    .catch((error) => alert(`${error}\n\nLínea 49`));



async function getData(idAvatar) {
    try {
        const response = await fetch(`https://main.d14z3n2zfezi4a.amplifyapp.com/api/avatars/${idAvatar}`);
        const totalBytes = response.headers.get('content-length');

        if (!totalBytes) {
            console.error('No se pudo obtener el tamaño total de la respuesta de la API.');
            return;
        }

        const data = await response.clone().json(); // Almacenar el cuerpo de la respuesta

        const reader = response.body.getReader();
        let receivedBytes = 0;


        while (true) {

            const lector = await reader.read();
            const { done, value } = lector;

            if (done) {
                break;
            }

            receivedBytes += value.length;
            const percentComplete = (receivedBytes / totalBytes) * 100;
            progressBar.style.width = percentComplete + '%';
        }

        localStorage.setItem('data', `${JSON.stringify(data)}`);

        window.location.href = './src/ar.html';

    } catch (error) {
        alert(`${error} \n\nEs posible que estés intentando escanear un código QR NO válido. Asegúrate de intentar escanear un código QR válido e inténtalo de nuevo.`);
        window.location.href = './index.html';
    }
};