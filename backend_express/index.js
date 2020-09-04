const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8626;
const session = require('express-session');
const bcrypt =require('bcrypt');
const { con ,router } = require("./routers/api");
const mysqlSession = require('express-mysql-session')(session);




const sessionStore = new mysqlSession({
    expiration:(1825*86400*1000),
    endConnectOnclose:false
},con)


//ทำการแมพ json และเรียกใช้ data ผ่านตัวแปรได้เลย
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/',router);

app.use(session({
    key:'dawdaw7d5awf654aw6f46awf',
    secret:'d646aw4g84e6h46r4k/8798k6',
    store:sessionStore,
    resave: false,
    saveUninitialized:false,
    cookie:{
        maxAge:(1825*86400*1000),
        httpOnly:false
    }
}))

/**************login test**** */
app.post('/login',(req,res)=>{
    
    let username = req.body.username;
    let password =req.body.password;
    username = username.toLowerCase();
    if (username.length > 12 || password.length >12) {
        res.json({
            seccess:false,
            msg:'An errors occured,plaeas try again'
        })
        return;
    }
    let cols = [username];
    con.query("SELECT * FROM userdata WHERE username = ? LIMIT 1",cols,(err,data,fields)=>{
        if(err){
            res.json({
                success:false,
                msg: 'An error occured, please try again'
            })
            return;

        }
        if(data && data.length ===1){
            bcrypt.compare(password,data[0].password,(bcrypt,verified)=>{
                if(verified){
                    req.session.userID = data[0].id;
                    res.json({
                        success:true,
                        username: data[0].username
                    })
                    return;
                }
                else{
                    res.json({
                        success:false,
                        msg:'Invalid password'
                    })
                }
            })
        }else{
            res.json({
                success:false,
                msg:'user not found, plese try again'
            })
        }
    })
})
app.post('/loguot',(req,res)=>{
    if(req.session.userID){
        req.session.destroy();
        res.json({
            success:true,
        })
        return true;
    }else{
        res.json({
            success:false
        })
        return false;
    }
})
app.post('/isLoggedIn',(req,res)=>{
    if(req.session.userID){
       let cols = [req.session.userID];
       con.query('SELECT * FROM userdata WHERE id = ? LIMIT 1',cols,(err,data,fields)=>{
            if(data && data.length ===1){
                res.json({
                    success:true,
                    username:data[0].username
                })
                return true;
            }
       })
    }else{
        res.json({
            success:false
        })
        return false;
    }
})


app.listen(port,() => console.log(`Example app listening on port ${port}!`));