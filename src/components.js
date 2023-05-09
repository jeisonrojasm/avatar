import { boxImages } from "./index.js";


const socialNetworksArr = Object.keys(boxImages);
const socialNetworks = socialNetworksArr.map(e => `https://www.${e}.com`);
console.log(socialNetworks);

AFRAME.registerComponent('handle-click-social-network', {

    init: function () {
        this.redirectSocialNetwork = function (e) {
            const socialNetwork = e.target.id;
            const username = e.target.getAttribute('username');
            for (let i = 0; i < socialNetworksArr.length; i++) {
                if (socialNetwork === socialNetworksArr[i]) {
                    if (socialNetwork === 'linkedin') {
                        window.open(`${socialNetworks[i]}/in/${username}`);
                    } else if (socialNetwork === 'telegram') {
                        window.open(`https://t.me/${username}`);
                    } else if (socialNetwork === 'messenger') {
                        window.open(`https://m.me/${username}`);
                    } else if (socialNetwork === 'snapchat') {
                        window.open(`https://www.snapchat.com/add/${username}`);
                    } else if (socialNetwork === 'spotify') {
                        window.open(`https://open.spotify.com/user/${username}`);
                    } else if (socialNetwork === 'tiktok') {
                        window.open(`https://www.tiktok.com/@${username}`);
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

AFRAME.registerComponent("modelo-gltf", {

    schema: {
        type: "model"
    },
    init: function () {
        this.model = null;
        this.loader = new THREE.GLTFLoader
    },
    update: function () {
        var e = this,
            o = this.el,
            t = this.data;
        var loaderAnimacion = new THREE.GLTFLoader();
        var loaderModelo = this.loader;
        t && (this.remove(),
            loaderAnimacion.load('../assets/anim-dancing.glb', function (animacion) {
                loaderModelo.load(t, function (modelo) {

                    modelo.scene.scale.set(2, 2, 2);

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