import { boxImages } from "./ar.js";

const socialNetworksArr = Object.keys(boxImages);
const socialNetworks = socialNetworksArr.map(e => `https://www.${e}.com`);

AFRAME.registerComponent('handle-click-social-network', {

    init: function () {
        this.redirectSocialNetwork = function (e) {
            console.log('Se ejecutó el click de red social');
            const socialNetwork = e.target.id.toLowerCase();
            console.log('socialNetwork', socialNetwork);
            const username = e.target.getAttribute('username');
            for (let i = 0; i < socialNetworksArr.length; i++) {
                if (socialNetwork === socialNetworksArr[i].toLowerCase()) {
                    if (socialNetwork === 'linkedin') {
                        window.open(`${socialNetworks[i]}/in/${username}`);
                    } else if (socialNetwork === 'telegram') {
                        window.open(`https://t.me/${username}`);
                    } else if (socialNetwork === 'whatsapp') {
                        window.open(`https://wa.me/${username}`);
                    } else if (socialNetwork === 'messenger') {
                        window.open(`https://m.me/${username}`);
                    } else if (socialNetwork === 'snapchat') {
                        window.open(`https://www.snapchat.com/add/${username}`);
                    } else if (socialNetwork === 'spotify') {
                        window.open(`https://open.spotify.com/user/${username}`);
                    } else if (socialNetwork === 'correo') {
                        const subject = "Asunto del correo";
                        const body = "Cuerpo del correo";
                        const mailtoUrl = `mailto:${username}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        window.open(mailtoUrl);
                    } else if (socialNetwork === 'tiktok') {
                        window.open(`https://www.tiktok.com/@${username}`);
                    } else if (socialNetwork === 'discord') {
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

AFRAME.registerComponent('gesture-detector', {
    schema: {
        threshold: { default: 2 } // Ajusta según sea necesario
    },

    init: function () {
        this.startPosition = { x: 0, y: 0 };
        this.el.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.el.addEventListener('touchmove', this.onTouchMove.bind(this));
    },

    onTouchStart: function (event) {
        this.startPosition = this.getTouchEventPosition(event);
    },

    onTouchMove: function (event) {
        var currentPosition = this.getTouchEventPosition(event);
        var deltaX = currentPosition.x - this.startPosition.x;
        var deltaY = currentPosition.y - this.startPosition.y;

        if (Math.abs(deltaX) > this.data.threshold || Math.abs(deltaY) > this.data.threshold) {
            // Desplazamiento táctil detectado, emular el comportamiento WASD
            var camera = document.querySelector('[camera]');
            var entities = document.querySelectorAll('a-entity');
            console.log('entity', entities);
            var entityRotation = entities[0].getAttribute('rotation');
            console.log('entityRotation', entityRotation);

            // Ajusta la velocidad de desplazamiento según tus necesidades
            var positionSpeed = 0.01;
            var rotationSpeed = 1;

            // Calcula la nueva posición de la cámara
            var newPosition = {
                x: camera.object3D.position.x,
                y: camera.object3D.position.y,
                z: camera.object3D.position.z - deltaY * positionSpeed
            };

            // Aplica la nueva posición a la cámara
            console.log('newPosition', newPosition);

            if (newPosition.z > -0.10) camera.setAttribute('position', newPosition);

            entities.forEach(function (entity) {
                var entityRotation = entity.getAttribute('rotation');

                var newRotation = {
                    x: entityRotation.x,
                    y: entityRotation.y + deltaX * rotationSpeed,
                    z: entityRotation.z
                }

                entity.setAttribute('rotation', newRotation);
            })

            // Actualiza la posición inicial para el próximo movimiento
            this.startPosition = currentPosition;
        }
    },

    getTouchEventPosition: function (event) {
        var touch = event.touches[0];
        return { x: touch.clientX, y: touch.clientY };
    }
});

AFRAME.registerComponent('gesture-detector-mouse', {
    schema: {
        threshold: { default: 2 } // Ajusta según sea necesario
    },

    init: function () {
        this.startPosition = { x: 0, y: 0 };
        this.mouseDown = false;

        this.el.addEventListener('mousedown', this.onTouchStart.bind(this));
        this.el.addEventListener('mousemove', this.onTouchMove.bind(this));
        this.el.addEventListener('mouseup', this.onTouchEnd.bind(this));
    },

    onTouchStart: function (event) {
        this.mouseDown = true;
        this.startPosition = this.getMouseEventPosition(event);
    },

    onTouchMove: function (event) {
        if (!this.mouseDown) return;

        var currentPosition = this.getMouseEventPosition(event);
        var deltaX = currentPosition.x - this.startPosition.x;
        var deltaY = currentPosition.y - this.startPosition.y;

        if (Math.abs(deltaX) > this.data.threshold || Math.abs(deltaY) > this.data.threshold) {
            // Desplazamiento con el mouse detectado, emular el comportamiento WASD
            var camera = document.querySelector('[camera]');
            var entities = document.querySelectorAll('a-entity');
            var entityRotation = entities[0].getAttribute('rotation');

            var positionSpeed = 0.01;
            var rotationSpeed = 1;

            var newPosition = {
                x: camera.object3D.position.x,
                y: camera.object3D.position.y,
                z: camera.object3D.position.z - deltaY * positionSpeed
            };

            // Aplica la nueva posición a la cámara
            if (newPosition.z > -0.10) camera.setAttribute('position', newPosition);

            entities.forEach(function (entity) {
                var entityRotation = entity.getAttribute('rotation');

                var newRotation = {
                    x: entityRotation.x,
                    y: entityRotation.y + deltaX * rotationSpeed,
                    z: entityRotation.z
                }

                entity.setAttribute('rotation', newRotation);
            })

            // Actualiza la posición inicial para el próximo movimiento
            this.startPosition = currentPosition;
        }
    },

    onTouchEnd: function () {
        this.mouseDown = false;
        // Realiza acciones adicionales cuando se levanta el botón del mouse (opcional)
    },

    getMouseEventPosition: function (event) {
        return { x: event.clientX, y: event.clientY };
    }
});



const animations = [
    // '../assets/1-anim-flareDancing.glb',
    // '../assets/2-anim-punchingBag.glb',
    // '../assets/3-anim-shootingArrow.glb',
    // '../assets/4-anim-shootingGun.glb',
    // '../assets/5-anim-waveDancing.glb',
    // '../assets/6-anim-guitarPlaying.glb',
    // '../assets/7-anim-jump.glb',
    // '../assets/8-anim-salute.glb',
    // '../assets/9-anim-sittingThumbsUp.glb',
    '../assets/10-anim-sitting.glb',
    '../assets/11-anim-defeated.glb'
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
        let self;
        if (window.thisModelo) {
            self = window.thisModelo;
        } else {
            self = this;
            window.thisModelo = this;
        }
        var e = self,
            o = self.el,
            t = self.data;
        var loaderAnimacion = new THREE.GLTFLoader();
        var loaderModelo = self.loader;
        const animationToLoad = Math.floor(Math.random() * animations.length);
        t && (self.remove(),
            loaderAnimacion.load(animations[animationToLoad], function (animacion) {
                console.log('animations[animationToLoad]', animations[animationToLoad]);
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

AFRAME.registerComponent("handle-click-change-animation", {
    init: function () {
        this.changeAnimation = function (e) {
            console.log('Se ejecutó el click', e);
            console.log('AFRAME', AFRAME);
            console.log('AFRAME.components', AFRAME.components);
            // Accede al componente "modelo-gltf" y ejecuta su lógica
            var modeloComponent = AFRAME.components['modelo-gltf'];
            if (modeloComponent) {
                modeloComponent.Component.prototype.update.call(this.el);
            }
        }

        this.el.addEventListener('click', this.changeAnimation);
    },

    remove: function () {
        this.el.removeEventListener('click', this.changeAnimation);
    }
});