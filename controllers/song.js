const catchAsync = require("./../utils/catchAsync");
const appError = require("./../utils/appError");
const SongModel = require('./../models/Song')



exports.createSong = catchAsync(async (req, res, next) => {
    // 1. create a song with these properties
    const newSong = req.body
    console.log(newSong)
    await SongModel.create(newSong)

    // 2. send a response
    res.status(201).json({status: "success", newSong})

})

exports.uploadAudio = catchAsync(async (req, res, next) => {
    const audioPath = req.file
    console.log('request arrived')
    console.log(audioPath)
    res.send({audioPath})
})

exports.getSongByName = catchAsync(async (req, res, next) => {
    const songName = req.params.name.toLowerCase();
    const song = await SongModel.find({name: {$regex: `${songName}`}})
    console.log(song)
    if (!song) {
        res.status(404).json({status: "failed", message: "There is no song with this name"})
        return
    }
    res.status(200).json({status: "success", song})
})

exports.getAllSongs = catchAsync(async (req, res, next) => {
    const songs = await SongModel.find({})
    res.status(200).json({status: "success", songs})
})
