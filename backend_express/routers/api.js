const express = require("express");
const router = express.Router();
const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "learn"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

const allUser = 'SELECT * FROM test'
//fetch data from mysql 
router.get('/get/data',(req,res)=>{
    con.query(allUser,(err,results)=>{
        if(err){
            return res.send(err);
        }else{
            return res.json({
                data:results
            })
        }
    });
});

router.post('/add',(req,res)=>{
    res.send("hi,add api:"+req.query.id);
})
router.delete('/delete/:id',(req,res)=>{
    res.send(req.params.id);
})
module.exports = router;