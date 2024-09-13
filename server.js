const express = require('express');
const app = express();

app.get("/", (req, res)=>{
    res.end('Welcome to Live Server....');
});

app.listen(1234, ()=>{
    console.log('Server start......');
})