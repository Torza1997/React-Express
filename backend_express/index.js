const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

//ทำการแมพ json และเรียกใช้ data ผ่านตัวแปรได้เลย
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/',require('./routers/api'));

app.listen(port,() => console.log(`Example app listening on port ${port}!`));