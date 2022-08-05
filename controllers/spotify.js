const SpotifyWebApi = require("spotify-web-api-node")
const catchAsync = require('./../utils/catchAsync')

exports.getRefreshToken = catchAsync(async (req, res, next) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
      //redirectUri: process.env.REDIRECT_URI,
      //clientId: process.env.CLIENT_ID,
      //clientSecret: process.env.CLIENT_SECRET,
      redirectUri: "http://localhost:3000",
      clientId: "44ac6a7030a545d681e0ff5e34777f28",
      clientSecret: "180e8d7fa7c84caa964b7b7ab4fa787f",
      refreshToken,
    })
  
    await spotifyApi
      .refreshAccessToken()
      .then(data => {
        res.status(200).json({
          accessToken: data.body.accessToken,
          expiresIn: data.body.expiresIn,
        })
      })
      .catch(err => {
        console.log(err)
        return null
      })
  })
  

exports.login_to_spotify = catchAsync(async (req, res, next) => {
    code = req.body.code
    const spotifyApi = new SpotifyWebApi({
      // redirectUri: process.env.REDIRECT_URI,
      // clientId: process.env.CLIENT_ID,
      // clientSecret: process.env.CLIENT_SECRET,
      redirectUri: "http://localhost:3000",
      clientId: "44ac6a7030a545d681e0ff5e34777f28",
      clientSecret: "180e8d7fa7c84caa964b7b7ab4fa787f",
    })
  
    await spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        res.status(200).json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch(err => {
        console.log(err)
        return null
      })
  })
  