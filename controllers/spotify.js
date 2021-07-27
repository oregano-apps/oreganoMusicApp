const SpotifyWebApi = require("spotify-web-api-node")


exports.getRefreshToken = (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken,
    })
  
    spotifyApi
      .refreshAccessToken()
      .then(data => {
        return({
          accessToken: data.body.accessToken,
          expiresIn: data.body.expiresIn,
        })
      })
      .catch(err => {
        console.log(err)
        return null
      })
  }
  

exports.login_to_spotify = (req, res) => {
    code = req.body.code
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    })
  
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        console.log(data.body)
        return ({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch(err => {
        console.log(err)
        return null
      })
  }
  