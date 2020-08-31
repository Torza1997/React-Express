const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const jwt =require('jsonwebtoken');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "learn"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Mysql Connected!");
  });

const allUser = 'SELECT * FROM test';
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
    const InsertUserData = `INSERT INTO test (name,nickname,email,phone) VALUES('${req.body.name}','${req.body.nickname}','${req.body.email}','${req.body.phone}')`;
    con.query(InsertUserData,(err,results) =>{
        if(err){
            return res.send(err);
        }else{
            return res.send("Insert user data success!");
        }
    })
})
router.delete('/delete/:id',(req,res)=>{
    const Delete_Data_ByID = `DELETE FROM test WHERE id = '${req.params.id}'`
    con.query(Delete_Data_ByID,(err,results)=>{
        if(err){
           res.send(err); 
        }else{
            res.send("delete success!");
        }
    })
})

//test jwt-token
router.post('/jwt/token',(req,res)=>{
  const user = {
      id:1,
      username:"tor thanatos",
      email:'tor@gmail.com'
  }
  jwt.sign({user:user},'secretkey',(err,token)=>{
      res.json({
          token
      })
  });
})
module.exports = router;