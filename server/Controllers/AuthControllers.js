const UserModel = require("../Models/UserModel");
const AdminModel = require("../Models/AminModel");
const ApplicationModel = require("../Models/ApplicationModel");

const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 3600

const createToken = (id) => {
  return jwt.sign({ id }, "ishan super secret key", { expiresIn: maxAge })
}
const nullError = (name,email,phone) =>{
  let ERRORS = { name: "", email: "", phone: "" };
  if(name){ERRORS.name = "Name is Required"}
  if(email){ERRORS.email = "Email is Required"}
  if(phone){ERRORS.phone = "Phone Number is Required"}
return ERRORS;
}
const handleError = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.message === "Incorrect Email")
    errors.email = "That Email not Registred"
  if (err.message === "Incorrect Password")
    errors.password = "That Password was Incorrect"

  if (err.code === 11000) {
    errors.email = "Email is Already Registred";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}

module.exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = await UserModel.create({ name, email, password})
    const token = createToken(user._id)

    // res.cookie("jwt", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    //   maxAge: maxAge * 1000,
    // });
    res.status(201).json({ user: user._id, created: true })
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.json({ errors, created: false })
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await UserModel.login(email, password)
    const token = createToken(user._id)

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    
    res.status(200).json({ user: user._id, created: true })
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.json({ errors, created: false })
  }
};
module.exports.AdmLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const admin = await AdminModel.login(email, password)
    console.log(admin);
    const token = createToken(admin._id)

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ admin: admin._id, created: true })
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.json({ errors, created: false })
  }
};
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await UserModel.find()
    res.status(200).json(user)
  } catch (err) {
    console.log(err);

  }
};
module.exports.deleteUser = async (req, res, next) => {
  console.log("IIIIIIIIIIIIIIIDDDDDDDDDDDDDDDDDDDDDDDDDDDD",req.params.id);
  try {
    const user = await UserModel.findOneAndDelete(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    console.log(err);

  }
};
module.exports.blockUser = async (req, res, next) => {
  try {
    const user = await  UserModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { block: true } })
    res.status(200).json(user)
  } catch (err) {
    console.log(err);

  }
};
module.exports.unBlockUser = async (req, res, next) => {
  try {
    const user = await  UserModel.findByIdAndUpdate({ _id: req.params.id }, { $set: { block: false } })
    res.status(200).json(user)
  } catch (err) {
    console.log(err);
  }
};
module.exports.submitApplication = async (req, res, next) => {
  try {
    const{name,email,address,city,state,phone,companyName,
    team,products,problem,solution,proPosition,competetors,revenueModel,
    market,potentialSize,need,userId}=req.body
    
    console.log(userId);
    // if(name || email || phone === '') {
    //   console.log("Nulll DaTAAAAAAAA");
    //   const Error = nullError(name,email,phone);
    //   // res.json(Error)
    // } else {

    
    const apps = await ApplicationModel.create({ name,email,address,city,state,phone,companyName,
      team,products,problem,solution,proPosition,competetors,revenueModel,
      market,potentialSize,need,userId})
    
    res.status(201).json({ userId: apps.userId, created: true })
    
  } catch (err) {
    console.log(err);
    const errors = handleError(err);
    res.json({ errors, created: false })
  }
};
module.exports.allApplication = async (req, res, next) => {
  try {
    const apps = await ApplicationModel.find()
    res.status(200).json(apps)
  } catch (err) {
    console.log(err);

  }
};  
module.exports.pendingApplication = async (req, res, next) => {
  try {
    const pendingApps = await ApplicationModel.find({status:'pending'})
    res.status(200).json(pendingApps)
  } catch (err) {
    console.log(err);

  }
};  
module.exports.registeredApplication = async (req, res, next) => {
  try {
    const approvedApps = await ApplicationModel.find({status:'approved'})
    res.status(200).json(approvedApps)
  } catch (err) {
    console.log(err);

  }
};
module.exports.blockedApplication = async (req, res, next) => {
  try {
    const blockedApps = await ApplicationModel.find({status:'blocked'})
    res.status(200).json(blockedApps)
  } catch (err) {
    console.log(err);

  }
};
module.exports.changingStatus = async (req, res, next) => {
  // const {userId,value} = req.body;
  // console.log(userId);
  try {
   
    if(req.body.value == "1"){
      console.log('afterrrrrrrrrrrr');
      const approved = await ApplicationModel.findByIdAndUpdate({ _id:req.body.id }, { $set: { status:'approved' } })
      console.log("SUCCESSSS");
      res.status(200).json(approved)
    } else{
      const blocked = await ApplicationModel.findByIdAndUpdate({ _id: req.body.id }, { $set: { status:'blocked' } })
      res.status(200).json(blocked)
    }
    
  } catch (err) {
    console.log(err);
  }
}; 

module.exports.userForm = async (req, res, next) => {
  let arr=[]
  try {
    const oneForm = await ApplicationModel.findOne({userId:req.params.id})
    arr.push(oneForm)
    console.log(arr);
    res.status(200).json(arr)
  } catch (err) {
    console.log(err);

  }
}; 
module.exports.checkForm = async (req, res, next) => {
  
  try {
    const oneForm = await ApplicationModel.findOne({userId:req.params.id})
    
    console.log(oneForm);
    if(oneForm){
      res.json({status:true})
    } 
    res.json({status:false})
  } catch (err) {
    console.log(err);

  }
};