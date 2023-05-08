const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");
app.use(cors({
    origin: "http://127.0.0.1:5502"
}));

const data = [{
    "id": "642da562204b1d02c9d6c8c1",
    "name": "CristianOrtega",
    "social": [
        {
            "name": "facebook",
            "identifier": "CristianOrtega"
        },
        {
            "name": "discord",
            "identifier": "CristianOrtega"
        },
        {
            "name": "youtube",
            "identifier": "CristianOrtega"
        },
        {
            "name": "linkedin",
            "identifier": "CristianOrtega"
        }
    ],
    "urlRPM": "https://models.readyplayer.me/642da562204b1d02c9d6c8c1.glb"
},
{
    "id": "643ef8fb4fe9dc6782cf5de2",
    "name": "JeisonRojas",
    "social": [
        {
            "name": "discord",
            "identifier": "JeisonRojas"
        },
        {
            "name": "facebook",
            "identifier": "JeisonRojas"
        },
        {
            "name": "linkedin",
            "identifier": "JeisonRojas"
        },
        {
            "name": "youtube",
            "identifier": "JeisonRojas"
        }
    ],
    "urlRPM": "https://models.readyplayer.me/643ef8fb4fe9dc6782cf5de2.glb"
},
{
    "id": "64484f2c71111f79b8480d73",
    "name": "AndreaRojas",
    "social": [
        {
            "name": "pinterest",
            "identifier": "AndreaRojas"
        },
        {
            "name": "tiktok",
            "identifier": "AndreaRojas"
        },
        {
            "name": "youtube",
            "identifier": "AndreaRojas"
        },
        {
            "name": "discord",
            "identifier": "AndreaRojas"
        }
    ],
    "urlRPM": "https://models.readyplayer.me/64484f2c71111f79b8480d73.glb"
}];


app.get('/avatars/:idAvatar', (req, res) => {
    const id = req.params.idAvatar;
  
    const result = data.find(obj => obj.id === id);
  
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Objeto no encontrado' });
    }
  });

app.listen(port, () => {
    console.log(`La API está escuchando en el puerto ${port}.`);
});