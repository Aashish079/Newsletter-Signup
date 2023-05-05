const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public")); //specifies the static folder which has all the files that we use !

app.get('/',(req, res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post('/',(req, res)=>{
    let firstName = req.body.f_name;
    let lastName = req.body.l_name;
    let email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    }
    console.log(firstName, lastName, email);
    let jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/19fdd5e44f";

    const options = {
        method : "POST",
        auth : "Aashish:e0254719446a5a5e953df8fe2045dc1b-us17"
    }

    const request = https.request(url, options,(response)=>{
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})



app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})

// API KEY:
// e0254719446a5a5e953df8fe2045dc1b-us17

// List id
// 19fdd5e44f