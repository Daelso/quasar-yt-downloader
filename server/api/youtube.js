const express = require("express");
let router = express.Router();
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

//Route is base/youtube

router.route("/getTitle").post(async (req, res) => {
  try {
    const videoUrl = req.body.link;
    console.log(videoUrl);

    const info = await ytdl.getInfo(videoUrl);

    const title = info.videoDetails.title;

    res.status(200).send(title);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.route("/downloadVideo").post(async (req, res) => {
  try {
    const videoUrl = req.body.link;

    const options = {
      quality: "highestvideo", // Select the highest quality
      filter: "videoandaudio", // We want video and audio
    };
    const info = await ytdl.getInfo(videoUrl); //queries youtube video info

    const title = info.videoDetails.title;

    const videoPath = path.join(__dirname, "temp", `${title}.mp4`); // Specify the path to save the video
    const videoWriteStream = fs.createWriteStream(videoPath); //create the writestream
    ytdl(videoUrl, options).pipe(videoWriteStream); //send it dowwwwn

    videoWriteStream.on("finish", () => {
      res.download(videoPath, `${title}.mp4`, () => {
        fs.unlinkSync(videoPath); // Delete the temporary file after download is complete
      });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
