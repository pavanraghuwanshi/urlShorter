const express = require("express");
const urlRoute = require("./routers/url");
const {connectToMongoDB} = require('./connect');
const URL = require("./modals/url");

const app = express();

const PORT = 8001;

connectToMongoDB('mongodb://0.0.0.0:27017/shrot-url').then(()=>console.log("mongoDB connected Succesfully"))


     app.use(express.json());
     app.use("/url",urlRoute);
     
     app.get('/:shortID', async(req,res)=>{

          const shortID = req.params.shortID;
         const entry = await URL.findOneAndUpdate({
               shortID
          },
          {
               $push:{
                    visitHistory:{
                    timestamp:Date.now(),
               },
               }
          }
     )
     res.redirect(entry.redirectURL);
     })


app.listen(PORT, ()=> console.log("server started at port =",PORT))