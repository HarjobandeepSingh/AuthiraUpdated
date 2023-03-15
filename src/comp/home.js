import React from "react"; 
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import himg from '../wom.png';


export default function Home(){
    return(
        <>

        <div className="navbar ">
            <div className="navbar-header">
                <div className="navbar-brand">
                    <Link to={'/Home'}><img src={logo} /></Link>
                </div>
            </div>
            <ul className="nav navbar-right" style={{color:"black"}}>
                    <li className="active"><Link to="/Login">Log in</Link></li>
                    <li className="reg"><Link to="/Register">Create Account</Link></li>
            </ul>
        </div>
        <div className="hero">
        <img src={himg} />
            <p>
                <h1>WORDS</h1>
                are not for keeping to yourself, share it with the world
            </p>


        </div>
        
        </>
    );
}