const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");
app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

const data = [
    {
        id: 1,
        urlMarker: "https://cdn.glitch.global/195d740c-12b9-4a9d-9a6d-7203f8059e7b/marker1.patt?v=1681148685876",
        urlModel: "https://models.readyplayer.me/642da562204b1d02c9d6c8c1.glb",
        socialNetwork1: "linkedin",
        socialNetwork2: "discord",
        socialNetwork3: "youtube",
        socialNetwork4: "facebook",
    },
    {
        id: 2,
        urlMarker: "https://cdn.glitch.global/195d740c-12b9-4a9d-9a6d-7203f8059e7b/MARCADORotraPrueba2.patt?v=1682617848999",
        urlModel: "https://models.readyplayer.me/643ef8fb4fe9dc6782cf5de2.glb",
        socialNetwork1: "facebook",
        socialNetwork2: "youtube",
        socialNetwork3: "discord",
        socialNetwork4: "linkedin",
    },
    {
        id: 3,
        urlMarker: "https://cdn.glitch.global/195d740c-12b9-4a9d-9a6d-7203f8059e7b/MARCADORprueba3.patt?v=1682617850417",
        urlModel: "https://models.readyplayer.me/64484f2c71111f79b8480d73.glb",
        socialNetwork1: "youtube",
        socialNetwork2: "linkedin",
        socialNetwork3: "facebook",
        socialNetwork4: "discord",
    },
]

app.get("/", (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`La API está escuchando en el puerto ${port}.`);
});