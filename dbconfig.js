const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
const dbName='b26we';
const dbUrl='mongodb+srv://gokulrajan:admin@cluster0.qhtpc.mongodb.net/test';

module.exports={mongodb,MongoClient,dbUrl,dbName};