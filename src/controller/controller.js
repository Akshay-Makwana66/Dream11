const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const axios = require('axios');
let saltRounds = 10;
const userRegistration = async (req,res)=>{
    try{
        let data = req.body;
        let {password}= data;
        data.password = await bcrypt.hash(password,saltRounds)
       
        let savedUserData = await userModel.create(data);
        res.status(201).send({status:true, message:'Your Registration is Successfully Done and Now you can login!', data:savedUserData})
    }catch(err){
        res.status(500).send({status:false, message:'Sorry, for the inconvenience caused', err:err.message})
    }
}

const loginUser = async (req,res)=>{
    try{
        let data = req.body;
        if(Object.keys(data).length==0) return res.status(400).send({status:false,message:'write email or password'});
        let {email,password} = data;
        if(!email) return  res.status(400).send({status:false,message:'write email'});
        if(!password) return res.status(400).send({status:false,message:'write password'});

        let checkCred = await userModel.findOne({email:email});
        if(!checkCred) return res.status(401).send({status:false,message:'write correct emailId'});
       
        let decryptPassword = await bcrypt.compare(password,checkCred.password);
        if(!decryptPassword) return res.status(401).send({status:false,message:'write correct password'});
        
        let date = Date.now();
        let createTime = Math.floor(date / 1000);
        let expTime = createTime + 30000;

        let token = jwt.sign({
            userId:checkCred._id.toString(),
            iat:createTime,
            expTime:expTime
        },'DREAM11')
        res.status(201).send({status:true, data:token})
        
    }catch(err){
        res.status(500).send({status:false, message:'Sorry, for the inconvenience caused', err:err.message})
    }
}

const getTeamData = async (req,res)=>{
    try{
        let source={
            method:'get',
            url:"https://rest.entitysport.com/v2/matches/?status=2&token=ec471071441bb2ac538a0ff901abd249&per_page=10&&paged=1"
        }
        let viewTeamData = await axios(source);
        let teamData = viewTeamData.data
        res.status(200).send({ msg: teamData, status: true })
    }catch(err){
        res.status(500).send({status:false, message:'Sorry, for the inconvenience caused', err:err.message})
    }
}

const getTeamForSpecificMatch = async (req,res)=>{
    try{
        let competition_id = req.query.cid;
        let source={
            method:'get',
            url:`https://rest.entitysport.com/v2/competitions/${competition_id}/squads/?token=ec471071441bb2ac538a0ff901abd249`
        }
        let viewTeamData = await axios(source);
        let teamDataForSpecificMatch = viewTeamData.data
        res.status(200).send({ msg: teamDataForSpecificMatch, status: true })
    }catch(err){
        res.status(500).send({status:false, message:'Sorry, for the inconvenience caused', err:err.message})
    }
}

module.exports = {userRegistration,loginUser,getTeamData,getTeamForSpecificMatch}

