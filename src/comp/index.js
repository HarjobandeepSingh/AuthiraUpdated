
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import himg from '../backg.jpg';
import axios from "axios";
import { useHistory } from "react-router-dom";

import bell from '../bell.png';
import './ind.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Index() {
    var uri = "http://localhost:1000/";
    
    const [data, setdata] = useState([]);
    const [follow,setFollow] = useState([]);
    const [Followd,setFollowd] = useState([]);
    function getdata(){
    axios.get(uri+'getPost').then((succ) => {
        setdata(succ.data);
    })
    }




    const [mail,setmail] = useState('');
    const [todos2, setTodos2] = useState(
        () =>
          JSON.parse(localStorage.getItem("gg")) 
      );
      useEffect(() => {
        localStorage.setItem("hello", JSON.stringify(todos2));
        setmail(todos2.hh)
      }, [todos2]);

useEffect(() => {
    getdata();
}, [])
//  
const[postid,setpostid] =useState('');
function PostView(e){
    setpostid(e.target.value)
    console.log(postid)
}


function handleClickg(){
    localStorage.clear();
    window.location.href = '/Login';
}

    return (
        <>
        <div className="navbar ">
            <div className="navbar-header">
                <div className="navbar-brand">
                    <Link to={'/Home'}><img src={logo} /></Link>
                </div>
            </div>
            <ul className="nav navbar-right">
                    <li className="reg"><Link to="/CreatePost">Create Post</Link></li>
                    <li className="pro">
                        
                        <div className="sub">
                            <div><Link to="/Profile">Profile</Link></div>
                            <div onClick={handleClickg}>Log Out</div>
                        </div>
                    </li>
            </ul>
        </div>

            <div className="main container-fluid">
              
                 <div className="bod"> 
                 {   data.map((row) => (
                   
            <div className="right ">
                    <div className="container-fluid post" style={{backgroundImage:"url(" +  row.bimg  + ")",backgroundColor:row.bgcolor, color:row.color,fontFamily:row.fontf}}>
                <a href={'http://localhost:3000/cPost/'+row._id+'/'+row.userId} style={{color:row.color}}>
                  
                    <h4>{row.des}</h4>
                    <h5>~{row.poet}</h5>
                    </a>

                    </div>
                </div> 
           ))} 
                   
                </div>
                
            </div>
        </>
    );
}