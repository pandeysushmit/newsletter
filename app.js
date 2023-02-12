const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
    // console.log(firstName);
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
        }
    const url="https://us18.api.mailchimp.com/3.0/lists/b91037b5f0";
    const options={
        method:"POST",
        auth:"pandey_sushmit:76048b1d013dc46af40c9845fd7878b2-us18"
    }
    var jsondata=JSON.stringify(data);
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("Server is running on Port 3000.");
});
// b91037b5f0
// 0ea9db9c103db169f6e9652cebd24765-us18