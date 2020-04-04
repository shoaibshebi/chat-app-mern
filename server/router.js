const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('ok he from server router');
})

router.get('/ok',(req,res)=>{
    res.send('ok he from ok');
})


module.exports=router;