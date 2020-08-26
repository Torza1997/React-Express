const express = require("express");
const router = express.Router();

router.get('/test',(req,res)=>{
    res.json([{id:1,name:"tor"},{id:2,name:"tor2"}])
})
router.post('/add',(req,res)=>{
    res.end("hi,add api:"+req.body.name);
})
router.delete('/delete/:id',(req,res)=>{
    res.end("delete id:"+req.params.id);
})
module.exports = router;