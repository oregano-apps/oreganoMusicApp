const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");

exports.createSong = catchAsync(async (req, res, next) => {
    console.log(req.body)
})

exports.uploadAudio = catchAsync(async (req, res, next) => {
    console.log('require')
})
