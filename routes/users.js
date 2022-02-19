var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient,dbName} = require('../dbConfig');

router.get('/',async(req,res)=>{
  await res.json({
    message:"users"
  })
})

module.exports = router;
