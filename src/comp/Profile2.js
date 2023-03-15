import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import logo from '../logo.svg';
import axios from "axios";
import bell from '../bell.png';
import './ind.css';
import edit from '../assets/images/edit_FILL0_wght400_GRAD0_opsz48.svg';
import close from '../assets/images/cancel_FILL0_wght400_GRAD0_opsz48.svg'
import { data } from "jquery";
import e from "cors";

export default function Profile() {
    var uri = "http://localhost:1000/";
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [Name,setname] = useState('');
    const [CoverImg,setCoverImg] = useState('');
    const [CoverImg2,setCoverImg2] = useState('');
    const [UserId,setUserId] = useState('');
    const [datag ,setStatus] = useState({});
    const [datag2 ,setStatus2] = useState({});
console.log(CoverImg)


const [todos, setTodos] = useState(
    () =>
      JSON.parse(localStorage.getItem("gg")) 
  );
  useEffect(() => {
    localStorage.setItem("gg", JSON.stringify(todos));
    setUserId(todos.uid)
  }, [todos]);




    function CoverImgFun(e) {
        setShowModal2(false);
        
        var obj = {
            coverimage: CoverImg.name,
            uid:UserId,
        }

        console.log(obj.coverimage+"hellog")
        axios.post(uri+'UpdateData', obj).then((succ) => {
            console.log(succ);
            console.log(succ.data)
           if(succ.data == "done"){
               alert('Data Added');
             
           }
       })
       uploadImage();
    }
    function CoverImgFun2(e) {
        setShowModal3(false);
        
        var obj = {
            coverimage: CoverImg2.name,
            uid:UserId,
        }


        axios.post(uri+'UpdateData2', obj).then((succ) => {
            console.log(succ);
            console.log(succ.data)
           if(succ.data == "done"){
               alert('Data Added');
             
           }
       })
       uploadImage2();
    }
  


    function UserData() {
        axios.get(uri+'getUserData',{ params: { uid:UserId } })
          .then((succ) => {
            setStatus(succ.data);
            console.log(succ.data)
          })
          .catch((error) => {
            console.log(error);
          });
         
      }
      
      useEffect(() => {
        // Call the getFollowing function after the userId and data2 state variables have been initialized
        if (UserId) {
            UserData();
        }
      }, [UserId]);

    function ProImgFun(e){
        setShowModal3(false);
    }
    function handlePassForm(e){
        e.preventDefault();
    }
    function handleSubmit(){
        setShowModal(false);

        var obj = {
            userId:UserId,
            name:Name
        }
      

        axios.post(uri+'UpdateUserName', obj).then((succ) => {
            console.log(succ.data)
           if(succ.data == "done"){
               console.log(succ.data)
               
           }
       })
       window.location.reload()
    }
    function uploadImage(e){
        
        var datao = new FormData();
        datao.append("coverimg", CoverImg);
console.log( datao)
      axios.post(uri+'single2', datao).then((succ) => {
             console.log(succ);
            if(succ.data == "ok"){
                console.log('Image Added');   
            }
        })
        console.log(setCoverImg(e.target.files[0])+" "+"  hello");
    }
    function uploadImage2(e){
        
        var datao = new FormData();
        datao.append("profile", CoverImg2);
console.log(datao)
      axios.post(uri+'single3', datao).then((succ) => {
             console.log(succ);
            if(succ.data == "ok"){
                console.log('Image Added');   
            }
        })
       
    }



    function handleClick(e){
        localStorage.clear();
        window.location.href = '/Login';
    }
return(
<>
<div className="navbar ">
            <div className="navbar-header">
                <div className="navbar-brand">
                    <Link to={'/Home'}><img src={logo} /></Link>
                </div>
            </div>
            <ul className="nav navbar-right">
                   
                    <li className="reg"><Link to="/CreatePost">Create Post</Link></li>
                    <li className="pro" style={{zIndex:"4",backgroundImage:"url(/img/" +  datag.uscoverimg  + ")"}}><div className="sub">
                            <div><Link to="/Profile">Profile</Link></div>
                            <div onClick={handleClick}>Log Out</div>
                        </div>
                    </li>
            </ul>
        </div>
       
        <div className="up" style={{backgroundImage:"url(/img/" +  datag.uscoverimg  + ")"}}>
        <div className="flex">
        <div className="profile" style={{backgroundImage:"url(/img/" +  datag.usprofileimg  + ")"}}>
            
        </div>
        <div className="uname">{datag.name} </div>
        </div>
        </div>




</>
);
}