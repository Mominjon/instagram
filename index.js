var fs = require('fs'),
request = require('request');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const homedata = require("./data/data")
const util = require("util");
const { json } = require('express');
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.set('view engine', 'ejs');
app.use(express.static('./public'));


var fs = require('fs'),
http = require('http'),
https = require('https');

var Stream = require('stream').Transform;

var downloadImageToUrl = (url, filename, callback) => {

    var client = http;
    if (url.toString().indexOf("https") === 0){
      client = https;
     }

    client.request(url, function(response) {                                        
      var data = new Stream();                                                    

      response.on('data', function(chunk) {                                       
         data.push(chunk);                                                         
      });                                                                         

      response.on('end', function() {                                             
         fs.writeFileSync(filename, data.read());                               
      });                                                                         
   }).end();
};

app.get("/home",async(req, res) => {
    downloadImageToUrl(homedata.data[0].profile_pic_url, `public/img/${homedata.data[0].username}.png`);
    homedata.data[0].feed.data.map(elem => {
        if(elem.image_versions2){
            downloadImageToUrl(`${elem.image_versions2.candidates[0].url}`, `public/img/${elem.client_cache_key}.jpg`, function(){
            });
        }else {
        }
    })
    res.render("index", {data: homedata})
})

app.get("/", (req, res) => res.render("Login"))

app.get("/profile", (req, res) => res.render("profile", {
    data: homedata
}))




app.post("/aded" , async(req, res) => {
    let value = req.body
    await writeFile(__dirname + "/data/data.json", JSON.stringify(value,null, 4))
    res.send("ok")
})


const port = 8000
app.listen(port, () => {console.log("server runing port " + port)})