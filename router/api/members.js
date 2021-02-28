const express = require('express');
const uuid=require('uuid')
const  router=express.Router();
const members=require('../../Member')

router.get('/', (req, res) => {
    res.json(members);
});
//Get Single Members
router.get('/:id', (req, res) => {
    const found = members.some(members => members.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(members => members.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No members Found ${req.params.id}` })
    }
})

//Create Members
router.post('/',(req,res)=>{
    //res.send(req.body)
    const newMembers={
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'actie'
    }
    if(!newMembers.name || !newMembers.email){
        return res.status(400).json({msg:'Please Include name and email'});
    }
    //Push Into Data into DB
    members.push(newMembers);
    res.json(members);
    //res.redirect('/');
});




//Update Member
router.put('/:id', (req, res) => {
    const found = members.some(members => members.id === parseInt(req.params.id));
    if (found) {
        
        //res.json(members.filter(members => members.id === parseInt(req.params.id)));
        const updMember=req.body;
        members.forEach(member=>{
            if(member.id === parseInt(req.params.id)){
                member.name=updMember.name ? updMember.name : member.name;
                member.email=updMember.email ? updMember.email : member.email;

                res.json({msg:'Member Update',member});

            }
        })
   
   
    } else {
        res.status(400).json({ msg: `No members Found ${req.params.id}` })
    }
})


//Delete Member
router.delete('/:id', (req, res) => {
    const found = members.some(members => members.id === parseInt(req.params.id));
    if (found) {

        res.json({
            msg :  'Member Deleted',
            members:members.filter(member=>member.id!== parseInt(req.params.id))
    });


    } else {
        res.status(400).json({ msg: `No members Found ${req.params.id}` })
    }
})







module.exports=router;
