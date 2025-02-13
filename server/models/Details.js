const mongoose=require('mongoose');
 const DetailsSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    housetype:String,
    address:String
 });
 const DetailsModel=mongoose.model('Details',DetailsSchema);
module.exports=DetailsModel;