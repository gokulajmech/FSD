import React from 'react'
import '../App.css'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Header() {
    let navigate=useNavigate();
    return <>
    <div className='header'>
      <Link to={'/'}> <h2><HomeIcon/> Business Center </h2></Link>
      
    </div>
        &nbsp;
    </>;
}

export default Header
