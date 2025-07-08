const Food = require("../models/Food")


// exports.foodInsertform = (req ,res)=>{
//     const { pname, pdesc, pqty, pstatus, pamount } = req.body
 
//     const filename = req.file.filename
//     try {
//         const record = new Food({ PName: pname, PPrice: pamount, PDesc: pdesc, PQty: pqty, PStatus: pstatus, PImg: filename })
//         record.save()

//         res.json({
//             status: 201,
//             apiData: record,
//             message: "your Product is successfully inserted"

//         })
//     } catch (error) {
//         res.json({
//             status: 400,
//             message: error.message
//         })
//     }
// }

exports.foodInsertform = async (req, res) => {
    const { pname, pdesc, pqty, pstatus, pamount } = req.body;

    // ✅ Check if image uploaded
    if (!req.file) {
        return res.status(400).json({
            status: 400,
            message: "Image upload failed. No file received.",
        });
    }

    const imageUrl = req.file.path; // This is Cloudinary image URL

    try {
        const record = new Food({
            PName: pname,
            PPrice: pamount,
            PDesc: pdesc,
            PQty: pqty,
            PStatus: pstatus,
            PImg: imageUrl,
        });

        await record.save();

        res.json({
            status: 201,
            apiData: record,
            message: "Product inserted successfully",
        });
    } catch (error) {
        console.error("❌ Error saving product:", error);
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
};



exports.showFoodproducts = async(req , res)=>{
    try{
        const record = await Food.find()
        res.json({
            status : 200 , 
            apiData : record , 
            message : "Data is successfully Transfer"
    
        })
        }catch(error){
            res.json({
                status : 400 , 
                message : error.message
            })
        }
}

exports.singleProductUpdate = async(req , res)=>{
         console.log(req.params.id)

         const id = req.params.id
         try{
             const record = await Food.findById(id)
             res.json({
                 status : 200 , 
                 apiData : record
             })
         }
         catch(error){
            res.json({
             status : 400 , 
             message : error.message
            })
         }
}

exports.adminfinalupdateImage =async (req ,res)=>{
    const id = req.params.id
  
    const {pname , pdesc , pamount , pqty , pstatus} = req.body
  
     const filename = req.file.filename
   
    try{
        if(req.file){
        await Food.findByIdAndUpdate( id ,{PName  : pname ,  PDesc : pdesc ,  PPrice : pamount , PQty : pqty ,  PStatus  : pstatus , PImg : filename })
        }else{
            await Food.findByIdAndUpdate( id, {PName  : pname ,  PDesc : pdesc ,  PPrice : pamount , PQty : pqty ,  PStatus  : pstatus })
       
        }
        res.json({
            status : 200 , 
            message : "successfully Product Updated"
        })
    }catch(error){
        res.json({
            status : 400 , 
            message: error.message
        })
    }
}

exports.adminfinalupdate =async(req , res)=>{
    const id = req.params.id



    const {pname , pdesc , pamount , pqty , pstatus} = req.body
    try{
        await Food.findByIdAndUpdate( id,
             {PName  : pname ,  PDesc : pdesc ,  PPrice : pamount , PQty : pqty ,  PStatus  : pstatus })
        res.json({
            status : 200 , 
            message : "successfully Product Updated"
        })
    }catch(error){
        res.json({
            status : 400 , 
            message: error.message
        })
    }
}
exports.DeleteFoodProduct = async(req ,res)=>{
    const id = req.params.id
   
    try{
    await Food.findByIdAndDelete(id)
    res.json({
     status:200 , 
     message : "Successfully Remove Data"
    })
 }catch(error){
     res.json({
         status : 400 ,
         message : error.message
     })
 }
}
exports.usershowlist =async (req , res)=>{
    try{

        const record = await Food.find({ PStatus :"IN-STOCK"})
        console.log(record)
        res.json({
            status : 200 , 
            apiData : record , 
            message : "Represent successfully"

        })
    }catch(error){
        res.json({
            status : 400 , 
            message : error.message
        })
    }
}

exports.addtocart = async(req ,res)=>{
    try{
        const{ids} = req.body
        // console.log(ids)
       const rec =  await Food.find({_id : {$in : ids}})
       
       res.json({
            status : 200 , 
            apiData  :rec
       })
        }catch(error){
            res.json({
                    status : 500 , 
                    message : error.message
            })
        }
}