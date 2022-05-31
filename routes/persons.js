const express=require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router=express.Router();
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


router.get('/',(req,res)=>{
    fetch("https://swapi.dev/api/people/?page="+req.query.page+"&format=json")
    .then(res => res.json())
    .then((json) => {
		res.json(json.results);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
});

router.post('/',(req,res)=>{
    fetch("https://swapi.dev/api/people/?search="+req.body.name+"&format=json")
    .then(res => res.json())
    .then((json) => {
        res.send(json.results[0]);
       console.log(json.results[0]);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })

});
module.exports=router;
