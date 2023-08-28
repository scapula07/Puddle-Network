const catchAsync = require('../utils/catchAsync');
const { spawn ,spawnSync} = require("child_process");
const fs = require('fs')


    
exports.uploadFile= async (req, res, next) => {
  
    try{
 
        res.status(200).json({
            status: 'success',
            message:{
            
            }
          });
    }catch(e){
        console.log(e)
    }
    
    


} 


