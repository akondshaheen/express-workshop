var fs = require("fs");
var express = require("express");
var formidable = require("express-formidable");

var app = express();

app.use(express.static("public"));
app.use(formidable());

app.post("/create-post", function (req, res) {
  fs.readFile(__dirname + "/data/posts.json", (err, data) => {
    if (err) throw err;
    var info = JSON.parse(data);

    var mainInfo = {
      ...info,
      [Date.now()]: req.fields.blogpost,
    };
    var lastInfo = JSON.stringify(mainInfo);

    console.log("data", info);
    fs.writeFile(__dirname + "/data/posts.json", lastInfo, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
  });

  res.send("Hello there!");
});

app.get("/get-posts", function (req, res) {
  res.sendfile(__dirname + "/data/posts.json");
});



app.listen(8000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
