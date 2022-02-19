import React,{useEffect,useState} from 'react'
import env from 'react-dotenv'
import axios from 'axios';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
function Home() {

  const [business,setBusiness]=useState([]);
  let navigate=useNavigate();
  useEffect(()=>{
    getdata();
  },[]);
  let getdata=async()=>{
    let res=await axios.get(env.API_URL);
    console.log(res.data.business);
    setBusiness(res.data.business);
  }

let deleteHandler=async(id)=>{
  let command=window.confirm('Do you want to delete the record');
  if(command===true)
  {
   let response= await axios({
      method:'delete',
      url:`${env.API_URL}${id}`
    })
    if(response.data.statusCode===200)
    {
      getdata();
    }
  }
  
}

    return <>
     <button class="btn btn-primary add-btn-size " onClick={()=>{navigate('/create')}}><AddIcon/>Add Business</button>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">S.no</th>
      <th scope="col">Business_Name</th>
      <th scope="col">Email</th>
      <th scope="col">Pin_Code</th>
      <th scope="col">State</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
    {business.map((e,i)=>{
      return <>
        <tr>
          <th scope="row">{i+1}</th>
          <td>{e.businessname}</td>
          <td>{e.email}</td>
          <td>{e.pincode}</td>
          <td>{e.state}</td>
          <td>{e.date}</td>
          <button className='btn btn-info' onClick={()=>{navigate(`/edit-business/${e._id}`)}}>Edit</button>&nbsp;&nbsp;<button className='btn btn-danger' onClick={()=>{deleteHandler(e._id)}}>Delete</button>
          {/* onClick={()=>{navigate(`/edit-business/${e._id}`)}} */}
        </tr>
      </>
    })}
  </tbody>
</table>
    </>
}

export default Home
