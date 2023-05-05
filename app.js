const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public")); //specifies the static folder which has all the files that we use !

app.get('/',(req, res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.post('/',(req, res)=>{
    const firstName = req.body.f_name;
    const lastName = req.body.l_name;
    const email = req.body.email;

    console.log(firstName, lastName, email);
})


app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})