const router = require("express").Router();
const RegC = require("../controllers/RegControllers");
const FoodC = require("../controllers/FoodControllers");

const multer = require("multer");
const { storage } = require("../config/cloudinary.js");

// ✅ Use Cloudinary storage
const upload = multer({ storage });

// ✅ Routes
router.post("/Register", RegC.RegistrationUser);
router.post("/Login", RegC.LoginUser);
router.post("/adminproductinsertform", upload.single("pimg"), FoodC.foodInsertform);
router.get("/adminshowdetails", FoodC.showFoodproducts);
router.get("/singleproductupdate/:id", FoodC.singleProductUpdate);
router.put("/adminupdateImage/:id", upload.single("pimg"), FoodC.adminfinalupdateImage);
router.put("/adminupdate/:id", FoodC.adminfinalupdate);
router.delete("/admindeleteproduct/:id", FoodC.DeleteFoodProduct);
router.get("/usershowlist", FoodC.usershowlist);
router.post("/cart", FoodC.addtocart);

module.exports = router;







// const router = require("express").Router()
// const RegC = require("../controllers/RegControllers")
// const FoodC = require("../controllers/FoodControllers")

// const multer = require("multer")

// const Storage = multer.diskStorage({
// destination :(req , file , cb)=>{
// cb(null, "./public/upload"); 
// },

// filename : function(req,file,cb){
// cb(null , Date.now()+file.originalname);

// }
// })


// let upload = multer({

// storage :Storage , 
// limits :{
// filesize : 1024*1024*4

// }

// })



// router.post("/Register" , RegC.RegistrationUser)
// router.post("/Login" , RegC.LoginUser)
// router.post("/adminproductinsertform" ,upload.single("pimg") ,  FoodC.foodInsertform)
// router.get("/adminshowdetails" , FoodC.showFoodproducts)
// router.get("/singleproductupdate/:id",FoodC.singleProductUpdate)
// router.put("/adminupdateImage/:id", upload.single("pimg"),FoodC.adminfinalupdateImage)
// router.put("/adminupdate/:id",FoodC.adminfinalupdate)
// router.delete("/admindeleteproduct/:id" ,FoodC.DeleteFoodProduct )
// router.get("/usershowlist" , FoodC . usershowlist)
// router.post("/cart" , FoodC.addtocart)




// module.exports = router