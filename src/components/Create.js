import axios from 'axios';
import React,{useState,useEffect} from 'react'
import env from 'react-dotenv';

function Create() {
 const[business,setBusiness]=useState('');
 const[email,setEmail]=useState('');
 const[pincode,setPinCode]=useState('');
 const[state,setState]=useState('');
 const[password,setPassWord]=useState('');
 const[status,setStatus]=useState();

useEffect(()=>{
    statusHandler();
},[]);
let statusHandler=()=>{setStatus(false)}

let res={};
 let getData=async()=>{


   res=await  axios({
        method: 'post',
        url: `${env.API_URL}register`,
        data: {
            businessname:business,
            email:email,
            pincode:pincode,
            state:state,
            password:password,
            date:Date()
        }
      });
       console.log(res.data.message);

      if(res.data.message==='business is already exist')
      {
          window.alert(res.data.message);
          setEmail(''); 
        setStatus(false) 
      }
      else{
        window.alert(res.data.message);
        setEmail('');
        setPassWord('');
        setBusiness('');
        setPinCode('');
        setState('');
        setStatus(true) 
      }
      
      
 }


    // let indicator=()=>{
    //     return <>Invalid email</>
    // }
 let submitHandler=()=>{
     let data={
        businessname:business,
         email:email,
         pincode:pincode,
         state:state,
         password:password,
         date:new Date().getDay
     }
     console.log(data);
     getData();
    
    
        
 }
    return <>

    <h1 style={{"color":"green"}}>Create Business</h1>
                <div>
        <div className="form-group">
            <label for="exampleInputEmail1">Email address {(status===false)?<span style={{"color":"red"}}>&nbsp;&nbsp;*Invalid email</span>:<></>}</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"   onChange={(e)=>{setEmail(e.target.value)}} value={email}required />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>{setPassWord(e.target.value)}} value={password} required/>
        </div>
        <div className="form-group">
            <label for="Business_Name">Business_Name</label>
            <input type="text" className="form-control" id="Business_Name" placeholder="Business_Name" onChange={(e)=>{setBusiness(e.target.value)}} value={business}/>
        </div>
        <div className="form-group">
            <label for="Pin_Code">Pin_Code</label>
            <input type="text" className="form-control" id="Pin_Code" placeholder="Pin_Code" onChange={(e)=>{setPinCode(e.target.value)}} value={pincode}/>
        </div>
        <div className="form-group">
            <label for="State">State</label>
            <input type="text" className="form-control" id="State" placeholder="State" onChange={(e)=>{setState(e.target.value)}} value={state}/>
        </div>
        <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
            <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=>{submitHandler()}}>Submit</button>
        </div>
    </>

    
}

export default Create;
