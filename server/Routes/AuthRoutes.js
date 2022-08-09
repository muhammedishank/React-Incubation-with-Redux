const { signup, login,AdmLogin ,getUser,deleteUser,blockUser,unBlockUser,
      submitApplication,allApplication,pendingApplication,registeredApplication,
      blockedApplication,changingStatus,userForm,checkForm} = require("../Controllers/AuthControllers");
const router = require("express").Router();
const { checkUser} = require('../Middlewares/authMiddleware')

router.post("/",checkUser)
router.post("/signup",signup);
router.post("/login",login);
router.post("/AdmLogin",AdmLogin);
router.post("/getUser",getUser);
router.delete("/deleteUser/:id",deleteUser);
router.put("/blockUser/:id",blockUser);
router.put("/unBlockUser/:id",unBlockUser); 
router.post("/submitApplication",submitApplication); 
router.get("/allApplication",allApplication); 
router.get("/pendingApplication",pendingApplication); 
router.get("/registeredApplication",registeredApplication);  
router.get("/blockedApplication",blockedApplication); 
router.post("/changingStatus",changingStatus); 
router.get("/userForm/:id",userForm);  
router.get("/checkForm/:id",checkForm);


module.exports = router;