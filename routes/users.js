var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient,dbName} = require('../dbConfig');

router.get('/',async(req,res)=>{
 let client= await MongoClient.connect(dbUrl);
 try{
  let db=client.db(dbName);
  let business=await db.collection('business').find().toArray();
 
  if(business)
  {
    res.json({
      business
    });
  }
  else{
    res.json({
      message:"No business Available"
    });
  }
 }
 catch(err){
   console.log(err);
   res.json({
     message:"Internal Server Error"
   })

 }
 finally{
   client.close();
 }
})

router.get('/:id',async(req,res)=>{
  let client= await MongoClient.connect(dbUrl);
  try{
   let db=await client.db(dbName);
   let business=await db.collection('business').findOne({ _id:mongodb.ObjectId(req.params.id) });
  
   if(business)
   {
     res.json({
       business
     });
   }
   else{
     res.json({
       message:"No business Available"
     });
   }
  }
  catch(err){
    console.log(err);
    res.json({
      message:"Internal Server Error"
    })
 
  }
  finally{
    client.close();
  }
 })

 router.delete('/:id',async(req,res)=>{
  let client= await MongoClient.connect(dbUrl);
  try{
   let db=client.db(dbName);
   let business=await db.collection('business').deleteOne({ _id:mongodb.ObjectId(req.params.id) });
  
   if(business)
   {
     res.json({
      message:"Deleted successfully",
      statusCode:200
     });
   }
   else{
     res.json({
       message:"No business Available"
     });
   }
  }
  catch(err){
    console.log(err);
    res.json({
      message:"Internal Server Error"
    })
 
  }
  finally{
    client.close();
  }
 });


  router.post('/register',async(req,res)=>{
  let client=await MongoClient.connect(dbUrl);
 
  try{
    let db=await client.db(dbName);
    let business=await db.collection('business').findOne({email:req.body.email});
    
    if(business)
    {
      res.json({
        statusCode:400,
        message:"business is already exist"
      })
    }
    else{
      await db.collection('business').insertOne(req.body);

      res.json({
        message:"user added successfully",
        data:req.body
      })
    }
    
  }
  catch(err){
    console.log(err);
    res.json({
      message:"Internal Server Error!",
      err
    })
  }
  finally{
    client.close();
  }
});

router.put('/:id',async(req,res)=>{
  let client= await MongoClient.connect(dbUrl);
  try{
   let db=client.db(dbName);
   let business=await db.collection('business').findOne({ _id:mongodb.ObjectId(req.params.id) });
  
   if(business)
   {
    console.log(req.body);
     let updateBusiness=await db.collection('business').findOneAndReplace({ _id:mongodb.ObjectId(req.params.id) },req.body);
    // console.log(updateBusiness);
     res.json({
      message:"updated Successfully"
     
     });
   }
   else{
     res.json({
       message:"No business Available",
     });
   }
  }
  catch(err){
    console.log(err);
    res.json({
      message:"Internal Server Error"
    })
 
  }
  finally{
    client.close();
  }
 })

module.exports = router;