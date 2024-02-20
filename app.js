//---- File Import
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const morgan = require("morgan");

//---- Declartion
const app = express();
const port = 3000;
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"),{ flags: "a" });
const logFormat =":date[iso] - :method :url :status :res[content-length] - :response-time ms";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//---- Middleware
app.use(express.urlencoded({ extended: true }));
app.use(morgan(logFormat, { stream: accessLogStream }));

//---- Routes
app.get("/", (req, res) => {
  res.json({
    "To upload": "POST method: http://localhost:3000/upload",
    "To list": "GET method http://localhost:3000/files",
    "To delete":"DELETE method http://localhost:3000/deletefile/samplefilename.txt",
    "To download":"GET method http://localhost:3000/downloadfile/samplefilename.txt",
  });
});

app.post("/upload", (req, res) => {
  upload.single("myFile")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).json({ error: "An error occurred while uploading the file" });
    }
    console.log(req.file);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    return res.send({ message: "File is uploaded successfully" });
  });
});

app.get("/files", (req, res) => {
  fs.readdir("uploads/", (err, files) => {
    if (err) {
      return res.status(500).send("Unable to read the file names");
    }
    console.log(files);
    res.json({ FileName: files, FileCount: files.length });
  });
});

app.delete("/deletefile/:filename", (req, res) => {
  const inputFile = req.params.filename;
  const filepath = path.join(__dirname + "/uploads/" + inputFile);
  console.log(inputFile, filepath);

  fs.stat(filepath, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        return res.status(404).json({ error: "File not found" });
      } else {
        return res.status(500).json({ error: "Unable to check file status" });
      }
    } else {
      fs.unlink(filepath, (err) => {
        if (err) console.log(err);
        console.log("file deleted");
      });
      res.json({ Message: `${inputFile} file deleted successfully.` });
    }
  });
});

app.get("/downloadfile/:filename", (req, res) => {
  const inputFile = req.params.filename;
  const filepath = path.join(__dirname + "/uploads/" + inputFile);
  console.log(inputFile, filepath);

  res.download(filepath, (err) => {
    if (err) {
      return res.status(400).send({Message:"File is not exist, unable to download the file. Check the file name on /files"});
    }
    console.log("File is downloaded successfully");
  });
});

app.listen(port, () => {
  console.log(`The server is started on port ${port}`);
});
