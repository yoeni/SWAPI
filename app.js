const express =require('express');
const http = require('http');
const req = require('express/lib/request');
const app =express();
const bodyParser=require('body-parser');
const path=require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use(express.static(__dirname+'/public/stylesheets/'));
app.use(express.static(__dirname+'/public/scripts/'));


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+'/myPage/index.html'));
});


var personRoutes=require('./routes/persons');
var planetRoutes=require('./routes/planets');
var starshipRoutes=require('./routes/starships');
var filmRoutes=require('./routes/film');
app.use('/api/persons',personRoutes);
app.use('/api/planets',planetRoutes);
app.use('/api/starships',starshipRoutes);
app.use('/api/film',filmRoutes);

app.listen(3000, () => {
    console.log('api working...');
});