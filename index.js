const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db.config');
const app = express();
app.use(bodyParser.json());
const validator = require("validator");
var validateDate = require("validate-date");
const https =  require('https');
const port = 3000;
const Users = require('./model/Users');
var booleanValue = true;
//add users
//api = localhost:3000/addusers
app.post('/addusers',async(req,res)=>{
    try{
        let name = req.body.name;
        let email = validator.isEmail(req.body.email);
        let dob = validateDate(req.body.dob);/// date should be mm/dd/yyyy format;
        
        if(name && email && dob ){
        let new_users = await Users.create({
            name:name,
            email:req.body.email,
            dob:req.body.dob
        });
        res.send(new_users);   
    }else
    {
        res.status(402).send('Please Enter Coorect Value');
    }
    }catch(err)
    {
        res.status(501).send({success:false,message:err});
    }
});





//for get details of single users
//api =  localhost:3000/users/1
app.get('/users/:id',async (req,res)=>{
    try
    {
    
    let id = req.params.id;
    let query = `select * from users where id ='${id}'`;
    db.query(query,function(error,data){
        if(data.length > 0)
        {
        res.status(200).json({data});
        }
        else
        {
            res.status(401).send('there is no data available ');
        }
    });
    
    }catch(error){
        res.status(501).send('there is error with server');
    }  
});

//for delete user
//api =  localhost:3000/users/1

app.delete('/users/:id',async (req,res)=>{
    try
    {
        let id = req.params.id;
        let delete_data = await Users.destroy({
            where:{id:id},
    });
    res.status(200).json({message:'data successfully deleted'});
    }catch(error)
    {
        res.status(409).send('Unable to delete');
    }   
});




app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});