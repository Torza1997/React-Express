const express = require("./node_modules/express");
const app = express();
const port = 5000;

app.get("/",(req,res)=> res.send("hello world!"));
app.get("/TEST",(req,res,next)=> res.json([
    {id:1,name:"tor",lastname:"thanatos"},
    {id:2,name:"tor2",lastname:"thanatos2"}
]));
app.post("/test1",(req,res,next)=> res.send({type:'POST'}));
app.get("/test1",(req,res,next)=> res.send({type:'GET'}));
app.delete("/test1/:id",(req,res,next)=> res.json([{type:'DELETE'}]));

app.get('tests/ab+cd', function (req, res) {
    res.send('ab+cd')
  })


app.listen(port,() => console.log(`Example app listening on port ${port}!`));