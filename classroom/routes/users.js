
const express = require('express');
const router = express.Router();

//users route
router.get("/",(req,res)=>{
    res.send('GET users');
})

router.get('/:id',(req,res)=>{
    res.send("GET id users");
})

router.post('/',(req,res)=>{
    res.send('POST users');
})

router.delete('/:id',(req,res)=>{
    res.send('Delete Users');
})

module.exports = router;