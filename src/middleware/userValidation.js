const userModel = require('../model/userModel')

const userValidations = async(req,res,next)=>{
    try{
        let data = req.body;
        if (Object.keys(data).length == 0)return res.status(400).send({ status: false, msg: "Body cannot be empty" });
        
        let {name,email,password,phone}=data;
       
        // name validations----------
        if (!name) return res.status(400).send({ status: false, msg: "Please enter  Name" });
        if (typeof name !== "string")return res.status(400).send({ status: false, msg: " Please enter  name as a String" });
        if(!/^\w[a-zA-Z.]*$/.test(name)) return res.status(400).send({ status: false, msg: "The  name may contain only letters" });
        name = name.trim();
       
        //  phone validations---------
        if (!phone) return res.status(400).send({ status: false, msg: "Please Enter Phone Number" });
        if (typeof phone !== "string") return res.status(400).send({ status: false, msg: " Please enter only phone number of 10 digits & put in string" });
        let validPhone = /^[6-9]\d{9}$/
        if (!validPhone.test(phone)) return res.status(400).send({ status: false, msg: "The user phone number should be indian may contain only 10 number" });
        let duplicatePhone = await userModel.find({ phone: phone });
        if (duplicatePhone.length !== 0) return res.status(400).send({ status: false, msg: `${phone} already exists` });
        phone = phone.trim();
        
        // Email validations---------
        if (!email) return res.status(400).send({ status: false, msg: "Please enter E-mail" });
        if (typeof email !== "string") return res.status(400).send({ status: false, msg: "Please enter email as a String" });
        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) return res.status(400).send({ status: false, msg: "Entered email is invalid" });
        let duplicateEmail = await userModel.find({ email: email });
        if (duplicateEmail.length !== 0) return res.status(400).send({ status: false, msg: `${email} already exists` });
        
        // Password validations-----------
        if (!password)return res.status(400).send({ status: false, msg: "Please enter Password" });
        if (typeof password !== "string")return res.status(400).send({ status: false, msg: " Please enter password as a String" });
        if (!/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(password))return res.status(400).send({status: false,msg: "Please enter min 8 letter password, with at least a symbol, upper and lower case letters and a number"});
        password = password.trim();

        next();
    }catch(err){
        res.status(500).send({ message:'Sorry, for the inconvenience caused', msg: err.message });
    }
};

module.exports = {userValidations}