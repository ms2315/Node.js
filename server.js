const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const { connectmongoDB } = require("./connection");
const URL = require("./models/url");
const path = require('path')  //built in module for ejs engine
const staticRouter = require('./routes/staticRouter')


const PORT = 3000;

// set ejs engine
app.set('view engine' , 'ejs');
app.set('views' , path.resolve("./views"))

app.use('/' , staticRouter);

//middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/url", urlRoute);

//routes 
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
  if(entry){
    return res.redirect(entry.redirectURL)

  }
  
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
