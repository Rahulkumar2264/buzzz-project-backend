const router=require('express').Router();
router.get('/',(req,res)=>
{
    res.send('THis is register root');
})



module.exports=router;
