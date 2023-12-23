const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const { connectmongoDB } = require("./connection");
const URL = require("./models/url");

const PORT = 3000;

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    {
      shortID
    },
    {
      $push: {
        visitHistory:{ 
            timestamp : Date.now()}
      },
    }
  );
  return res.redirect(entry.redirectURL)
});





app.listen(PORT, () => {
  console.log("Server Start at 3000");
});




//connection DB
connectmongoDB("mongodb://127.0.0.1:27017/UrlShortner")
  .then(() => {
    console.log("DB connected Succesfully");
  })
  .catch((err) => {
    console.log("Error in DB connection");
  });
