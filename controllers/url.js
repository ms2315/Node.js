const shortid = require('shortid');
const URL = require('../models/url');

async function handelurlGenerator (req , res ) 
{
    const body = req.body;

    if(!body.url) {return res.status(400).json({msg : "Enter a URL"})}

    const shortID = shortid();
    await URL.create({
        shortID : shortID ,
        redirectURL : body.url,
        visitHistory : []
    });
    return res.render( 'home' , {id : shortID});
}

async function analyticsHandler(req , res)
{
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID});

    return res.json({
        totalClicks : result.visitHistory.length , 
        analytics : result.visitHistory
    })

}
module.exports = {handelurlGenerator , analyticsHandler}