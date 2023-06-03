const express = require("express"),
  serveStatic = require("serve-static"),
  port = process.env.PORT || 5000;

const cors = require("cors");

const app = express();

require("dotenv").config();
app.use(serveStatic(__dirname + "/dist/spa"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["http://localhost:8080"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const downloadRoutes = require("./server/api/youtube");
app.use("/youtube", downloadRoutes);

app.listen(process.env.PORT || 5000, function () {
  console.log(`Server started on port ${port}`);
});
