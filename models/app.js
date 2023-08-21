const mongoose=require("mongoose");

const appSchema=mongoose.Schema({
     name:{type:String},
     image:{type:String},
     specialization:{type:String},
     experience:{type:Number},
     location:{type:String},
     date:{type: Date, default: Date.now },
     slots:{type:Number},
     fee:{type:Number}

});

const appModel=mongoose.model("App",appSchema);

module.exports={appModel}