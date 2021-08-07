const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node")
const songController = require('./../controllers/song')
const spotifyController = require('./../controllers/spotify')
const multer = require('multer')

const upload = multer({ dest: 'images/' })

router.post("/spotifyLogin", spotifyController.login_to_spotify)

router.post("/refresh", spotifyController.getRefreshToken)

router.post('/createSong', songController.createSong)
router.post('/uploadAudio', upload.single('soundBlob'), songController.uploadAudio)

module.exports = router;