const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express(); 
const fetch = require("node-fetch");

let url = "https://cat-fact.herokuapp.com/facts"; // change to a default

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    let data ={
        sent : false
    }
    res.render("index", {data : data});
});

app.post("/cat", (req,res)=>{
    url = "https://cat-fact.herokuapp.com/facts";
    request(url, (err, response, body)=>{
        if(!err && response.statusCode == 200){
            let parsed =JSON.parse(body);
            let maxNum = parsed["all"].length; 
            let data = {
                type : "Cat",
                fact : parsed["all"][Math.floor(Math.random()*maxNum)]["text"],
                sent : true
            }
            res.render("index", {data:data})
        }
    });
});

app.post("/dog",(req,res)=>{
    url = "https://some-random-api.ml/facts/dog"; 
    request(url, (err, response, body)=>{
        if(!err && response.statusCode == 200){
            let parsed =JSON.parse(body);
            let data = {
                type : "Dog",
                fact : parsed["fact"],
                sent : true
            }
            res.render("index", {data:data})
        }
    });
});

app.post("/randomFact", (req,res)=>{
    url = "https://uselessfacts.jsph.pl/random.json?language=en"; 
    request(url, (err, response, body)=>{
        if(!err && response.statusCode == 200){
            let parsed =JSON.parse(body);
            let data = {
                type : "Random Fact",
                fact : parsed["text"],
                sent : true
            }
            res.render("index", {data:data})
        }
    });
});


// wip
// function makeRequest(factType, url){

// }

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server has started");
})