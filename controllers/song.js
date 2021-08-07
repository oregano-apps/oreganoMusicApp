const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");




exports.createSong = catchAsync(async (req, res, next) => {
    console.log(req.body)
})

exports.uploadAudio = catchAsync(async (req, res, next) => {
    const audioPath = req
    console.log('request arrived')
    console.log(audioPath)
    res.send({audioPath})
})
