const express = require("express");
const axios = require("axios");
let router = express.Router();

require("dotenv").config();

//Route is base/youtube

router.route("/convertVideo").post(async (req, res) => {
  const vidId = Object.values(req.body)[0];

  const configuration = {
    method: "GET",
    url: "https://youtube-mp36.p.rapidapi.com/dl",
    params: { id: vidId },
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.API_HOST,
    },
  };

  const test = await axios.request(configuration);
  res.status(200).send(test.data);
});

module.exports = router;
