const shortid = require("shortid")
const URL = require("../modals/url");



async function handleGenerateNewShortURL(req,res) {

     const body = req.body;
     if(!body.url) return res.status(400).json({error: "url is required"})
     const shortID = shortid();
     await URL.create({
          shortID:shortID,
          redirectURL:body.url,
          visitHistory:[],
     })

     return res.json({id:shortID});
     
}

async function  handleGentAnalytics(req,res){
          const shortID = req.params.shortID;
          const result = await URL.findOne({shortID});
          const visitHistory = Array.isArray(result.visitHistory) ? result.visitHistory : [];
          return res.json({
               totalClicks: visitHistory.length || 0,
               analytics: visitHistory || 0,
          })
}

          module.exports = {
               handleGenerateNewShortURL,
               handleGentAnalytics
          }