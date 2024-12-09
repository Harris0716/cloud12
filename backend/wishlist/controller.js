const  {getWihslist, addWihslist, deleteWihslist} = require("./model");

// 獲取所有心願清單項目
function get_info(req, res){
    const  user_id = req.params.user_id;
    
    getWihslist(user_id).then((results)=>{
        res.json({message:"Get wishlist successfully!",data: results})
        
    }).catch((error)=>{
        console.log(user_id)
        res.json({message:"Error: Get wishlist",error})
    })
}
function add_info(req, res){
    const  {user_id, jobinfo_id} = req.body;
    addWihslist( user_id, jobinfo_id).then((result)=>{
        res.json({message:"Add wishlist successfully!"})
    }).catch((error)=>{
        res.json({message:"Error: POST wishlist",error})
    })
}

function delete_info(req, res){
    const  {user_id, jobinfo_id} = req.body;
    deleteWihslist(user_id, jobinfo_id).then((result)=>{
        res.json({message:"Delete wishlist successfully!", data: result})
    }).catch((error)=>{
        res.json({message:"Error: DELETE wishlist",error})
    })
}

module.exports = { get_info, add_info, delete_info};