
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import env from 'react-dotenv';
import Header from './components/Header';
import Create from './components/Create';
import Home from './components/Home';
import Edit from './components/Edit';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  console.log(`${env.API_URL}register`);

  useEffect(()=>{
    getData();
  },[]);

let getData=async()=>{
  let res=await axios.get(env.API_URL);
  console.log(res.data);
}

  return <>
   <Router>
     <Header/>
     <Routes>
       <Route path="/create" element={<Create/>}/>
       <Route path="/edit-business/:id" element={<Edit/>}/>
       <Route path="/" element={<Home/>}/>
     </Routes>
   </Router>   
  </>
}

export default App;
