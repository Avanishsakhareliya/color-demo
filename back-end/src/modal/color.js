const mongoose=require("mongoose");

const struct =mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    colorName:{
        type:String,
        require:true
    }
})
const result=mongoose.model("color",struct)
module.exports=result