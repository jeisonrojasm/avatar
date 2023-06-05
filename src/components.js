import { boxImages } from "./ar.js";

const socialNetworksArr = Object.keys(boxImages);
const socialNetworks = socialNetworksArr.map(e => `https://www.${e}.com`);

AFRAME.registerComponent('handle-click-social-network', {

    init: function () {
        this.redirectSocialNetwork = function (e) {
            const socialNetwork = e.target.id;
            const username = e.target.getAttribute('username');
            for (let i = 0; i < socialNetworksArr.length; i++) {
                if (socialNetwork === socialNetworksArr[i]) {
                    if (socialNetwork === 'Linkedin') {
                        window.open(`${socialNetworks[i]}/in/${username}`);
                    } else if (socialNetwork === 'Telegram') {
                        window.open(`https://t.me/${username}`);
                    } else if (socialNetwork === 'WhatsApp') {
                        window.open(`https://wa.me/${username}`);
                    } else if (socialNetwork === 'Messenger') {
                        window.open(`https://m.me/${username}`);
                    } else if (socialNetwork === 'Snapchat') {
                        window.open(`https://www.snapchat.com/add/${username}`);
                    } else if (socialNetwork === 'Spotify') {
                        window.open(`https://open.spotify.com/user/${username}`);
                    } else if (socialNetwork === 'correo') {
                        const subject = "Asunto del correo";
                        const body = "Cuerpo del correo";
                        const mailtoUrl = `mailto:${username}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        window.open(mailtoUrl);
                    } else if (socialNetwork === 'Tiktok') {
                        window.open(`https://www.tiktok.com/@${username}`);
                    } else if (socialNetwork === 'Discord') {
                        window.open(`https://discord.gg/${username}`);
                    } else {
                        window.open(`${socialNetworks[i]}/${username}`);
                    }
                }
            }
        }

        this.el.addEventListener('click', this.redirectSocialNetwork);
    },

    remove: function () {
        this.el.removeEventListener('click', this.redirectSocialNetwork);
    }
});

const animations = [
    '../assets/1-anim-flareDancing.glb',
    '../assets/2-anim-punchingBag.glb',
    '../assets/3-anim-shootingArrow.glb',
    '../assets/4-anim-shootingGun.glb',
    '../assets/5-anim-waveDancing.glb',
    '../assets/6-anim-guitarPlaying.glb',
    '../assets/7-anim-jump.glb',
    '../assets/8-anim-salute.glb',
    '../assets/9-anim-sittingThumbsUp.glb',
    '../assets/10-anim-sitting.glb'
];

AFRAME.registerComponent("modelo-gltf", {

    schema: {
        type: "model"
    },
    init: function () {
        this.model = null;
        this.loader = new THREE.GLTFLoader;
    },
    update: function () {
        var e = this,
            o = this.el,
            t = this.data;
        var loaderAnimacion = new THREE.GLTFLoader();
        var loaderModelo = this.loader;
        const animationToLoad = Math.floor(Math.random() * animations.length);
        t && (this.remove(),
            loaderAnimacion.load(animations[animationToLoad], function (animacion) {
                loaderModelo.load(t, function (modelo) {

                    modelo.scene.scale.set(2.0, 2.0, 2.0);
                    modelo.scene.rotation.x += -1.5

                    for (let i = 0; i < animacion.animations[0].tracks.length; i++) {
                        const str = animacion.animations[0].tracks[i].name;
                        const newStr = str.replace('mixamorig', '');
                        animacion.animations[0].tracks[i].name = newStr;
                    }

                    // Extraer las animaciones del modelo animado y guardarlas en una instancia de AnimationClip
                    const nombreAnimacion = animacion.animations[0].name;
                    const duracionAnimacion = animacion.animations[0].duration;
                    const tracksAnimacion = animacion.animations[0].tracks;
                    const animation = new THREE.AnimationClip(nombreAnimacion, duracionAnimacion, tracksAnimacion);

                    // Agregar las animaciones al modelo
                    modelo.animations[0] = animation;

                    e.model = modelo.scene || modelo.scenes[0], e.model.animations = modelo.animations, o.setObject3D("mesh", e.model), o.emit("model-loaded", {
                        format: "gltf",
                        model: e.model
                    })
                }, void 0, function (e) {
                    var r = e && e.message ? e.message : "Failed to load glTF model";
                    warn(r), o.emit("model-error", {
                        format: "gltf",
                        src: modelo
                    })
                }
                )
            })
        )
    },
    remove: function () {
        this.model && this.el.removeObject3D("mesh")
    }

});