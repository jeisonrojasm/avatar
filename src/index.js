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

// function onScanSuccess(content) {
    document.querySelector('#scan-frame-container').classList.add('hidden');
    progressBarContainer.classList.remove('hidden');
    progressBarContainer.classList.add('progress-bar-container-shown');

    // const lastIndexOfSlash = content.lastIndexOf('user=');
    const lastIndexOfSlash = window.location.href.lastIndexOf('user=');

    // const idUser = content.slice(lastIndexOfSlash + 5);
    const idUser = window.location.href.slice(lastIndexOfSlash + 5);
    
    console.log(idUser);

    localStorage.setItem('idAvatarCurrent', `${idUser}`);
    idAvatarCurrentLS = localStorage.getItem('idAvatarCurrent');
    idAvatarLastLS = localStorage.getItem('idAvatarLast');

    if (idAvatarCurrentLS !== idAvatarLastLS) {
        progressBar.style.width = 10 + '%';

        localStorage.setItem('idAvatarLast', `${idAvatarCurrentLS}`);

        setTimeout(() => {
            for (let i = 1; i < 4; i++) {
                progressBar.style.width = (i * 10) + '%';
                if (i === 3) {
                    getData(idUser);
                }
            }
        }, 2000);
    }
// }

const configuration = {
    videoConstraints: {
        facingMode: "environment",
        fps: 30,
        // width: { ideal: 4096 }, // Ancho ideal de la resolución
        // height: { ideal: 2160 }, // Alto ideal de la resolución
        width: { ideal: 3840 }, // Ancho ideal de la resolución
        height: { ideal: 2160 }, // Alto ideal de la resolución
        frameRate: { ideal: 30 } // Velocidad de cuadros por segundo
    }
};

// html5QrCode.start({ facingMode: "environment" }, configuration, onScanSuccess)
//     .catch((error) => alert(`${error}`));

async function getData(idUser) {
    try {
        // const response = await fetch(`https://main.d14z3n2zfezi4a.amplifyapp.com/api/avatars/${idAvatar}`);
        // const response = await fetch(`https://main.d1emaii8t4nv7o.amplifyapp.com/api/avatars/${idAvatar}`);
        // const response = await fetch(`https://us9pagllek.execute-api.us-east-1.amazonaws.com/prod/avatars/users/${idUser}/shared`);

        // Endpoint Lean Factory
        const response = await fetch(`https://vhka48mki4.execute-api.us-east-1.amazonaws.com/prod/avatars/users/${idUser}/shared`);

        // Endpoint IDI
        // const response = await fetch(`https://main.d31t6gzplc5mtr.amplifyapp.com/api/avatars/${idUser}`);

        const totalBytes = response.headers.get('content-length');

        if (!totalBytes) {
            console.error('No se pudo obtener el tamaño total de la respuesta de la API.');
            return;
        }

        const data = await response.clone().json(); // Almacenar el cuerpo de la respuesta
        console.log(data);

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
        console.log(error);
        alert(`Es posible que estés intentando escanear un código QR NO válido. Asegúrate de intentar escanear un código QR válido e inténtalo de nuevo.`);
        window.location.href = './index.html';
    }
};