
const express = require('express');
const router = express.Router();

//Post route
router.get("/",(req,res)=>{
    res.send('GET post');
})

router.get('/:id',(req,res)=>{
    res.send("GET id posts");
})

router.post('/',(req,res)=>{
    res.send('POST posts');
})

router.delete('/:id',(req,res)=>{
    res.send('Delete posts');
})

module.exports = router;