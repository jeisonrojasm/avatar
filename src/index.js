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

function onScanSuccess(content) {
    console.log(content);

    const lastIndexOfSlash = content.lastIndexOf('avatar=');
    const idAvatar = content.slice(lastIndexOfSlash + 7);

    localStorage.setItem('idAvatarCurrent', `${idAvatar}`);
    idAvatarCurrentLS = localStorage.getItem('idAvatarCurrent');
    idAvatarLastLS = localStorage.getItem('idAvatarLast');

    if (idAvatarCurrentLS !== idAvatarLastLS) {

        const modal = document.createElement('div');
        modal.innerText = 'Trayendo avatar...';
        modal.setAttribute('id', 'modal');

        document.querySelector('#scan-frame-container').remove();
        const body = document.querySelector('body');

        body.insertBefore(modal, body.firstChild);

        document.querySelector('#reader').classList.add('readerBlack');

        localStorage.setItem('idAvatarLast', `${idAvatarCurrentLS}`);

        getData(idAvatar);
    }
}

html5QrCode.start({ facingMode: "environment" }, { fps: 10 }, onScanSuccess)
    .catch((error) => console.log("Error al iniciar el escaneo:", error));

let dataExterna;

async function getData(idAvatar) {
    try {
        const response = await fetch(`https://main.d14z3n2zfezi4a.amplifyapp.com/api/avatars/${idAvatar}`);
        // const response = await fetch(`http://localhost:3001/avatars/${idAvatar}`);
        const data = await response.json();
        localStorage.setItem('data', `${JSON.stringify(data)}`);

        const { social } = data;
        const { urlRPM } = data;
        dataExterna = data;
        const amountOfBoxes = social.length;

        console.log(data);
        console.log(social);
        console.log(amountOfBoxes);
        window.location.href = './src/ar.html';

    } catch (error) {
        alert('Es posible que estés intentando escanear un código QR inválido. Asegúrate de intentar escanear un código QR válido e inténtalo de nuevo.');
        window.location.href = './index.html';
    }
};