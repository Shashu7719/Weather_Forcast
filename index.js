const express= require("express");
const bodyParser=require("body-Parser");
const https = require('https');


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");

});



app.post("/",function(req,res){
    var r= req.body.r;
    console.log(r);
    var q="https://api.openweathermap.org/data/2.5/weather?q="+r+"&appid=17aa9fc7a42a31022c401f526a027e0e&units=metric";
    https.get(q,function(response){
        // console.log(response.statusCode);
        response.on("data",function(data){
            const w= JSON.parse(data);
            const temp = w.main.temp;
            const d= w.weather[0].description;
            const min = w.main.temp_min;
            const max = w.main.temp_max;
            const hum = w.main.humidity;
            res.write("<h1> Weather is </h1>" + d +"<h2>Temperature is</h2>" + temp +"<h5>Degree Celsius</h5>" +"<h3>Minimum temperature is</h3> "+ min +"<h3>Maximum temperature is</h3>"+ max + "<h4>Humidity:-</h4>" + hum);
           
        })
    })
    // res.sendFile(__dirname + "/index.html");
    // "<h1> weather is </h1>" + d +"<h2>Temperature is</h2>" + temp +" "+ i 
});

app.listen(3000,function(){
    console.log("Server is running");
});