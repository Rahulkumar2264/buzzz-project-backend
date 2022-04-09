const router=require('express').Router();
router.get('/:id',(req,res)=>
{
    res.send('THis is profile root');

})



module.exports=router;