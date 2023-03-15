import { Link } from "react-router-dom";
import logo from '../logo.svg';
import React, { useEffect,useId,useState } from "react";
import bell from '../bell.png';
import axios from "axios";
import './ind.css';
import hh from '../comp/login';


export default function CreatePost(){

    var uri = "http://localhost:1000/";  
    


    function handleform(e) {
        e.preventDefault();
        
        var data = new FormData(e.currentTarget);

        console.log(data.get("bimg").name);
        var obj = {
            userId:UserId,
            postId:postid,
            user:mail,
            bgcolor: data.get('bgcolor'),
            bimg: "/img/"+data.get("bimg2"),
            color: data.get('color'),
            des: data.get('des'),
            poet: data.get('poetname'),
            fontf: data.get('fontf'),
        }
      

        axios.post(uri+'AddPost', obj).then((succ) => {
            console.log(succ.data)
           if(succ.data == "done"){
               alert('Data Added');
               setPostId(succ.data);
               e.target.reset();
               e.target.focus();
           }
       })
    }
    
// for image
function uploadImage(e){


    var datao = new FormData();
        datao.append("bimg", img);

      axios.post(uri+'single', datao).then((succ) => {
             console.log(succ);
            if(succ.data == "ok"){
                alert('Image Added');
             
                e.target.focus();

            }
        })
        setimg2(e.target.value)
      console.log(datao.append("bimg", img))
        console.log(setimg(e.target.files[0])+" "+"  hello");
       
       
}



    const [formValues,updateFormValues] = useState({});
   

    useEffect(()=>{
        const imgname = img.name;
        const valuesToSave = {formValues,poem,imgname,fam,poetn,color,name}
        window.localStorage.setItem('hello',JSON.stringify(valuesToSave));
    });

    const [todos, setTodos] = useState(
        () =>
          JSON.parse(localStorage.getItem("hello")) 
      );
      useEffect(() => {
        localStorage.setItem("hello", JSON.stringify(todos));
        setText(todos.poem)
        aut(todos.poetn)
        setimg2(todos.imgname)
      }, [todos]);
    //
      const [todos2, setTodos2] = useState(
        () =>
          JSON.parse(localStorage.getItem("gg")) 
      );
      useEffect(() => {
        localStorage.setItem("hello", JSON.stringify(todos2));
        setmail(todos2.hh)
        setUserId(todos2.uid)
      }, [todos2]);
    const [UserId,setUserId] = useState('');
    const [postid,setPostId] = useState('');
    const [name,setname] = useState('');
    const [img,setimg] = useState('');
    const [img2,setimg2] = useState('');
    const [color,setcolor] = useState('');
    const [poem,setText] = useState('');
    const [poetn,aut] = useState('');
    const [fam,fontfam] = useState('');
    const [mail,setmail] = useState('');

    function handleClick(){
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
                    <li className="pro">
                        
                        <div className="sub">
                            <div><Link to="/Profile">Profile</Link></div>
                            <div onClick={handleClick}>Log Out</div>
                        </div>
                    </li>
            </ul>
        </div>
            <div className="create container-fluid">
                <div className="left ">

                <div className="form ">
                <h1>Create Post{hh}</h1>
                <form className="form" id='form' method="post"  onSubmit={handleform}  encType="multipart/form-data">
                <div className="form-group">
                    <input
                        type={'color'}
                        name="bgcolor"
                        placeholder="Choose Color"
                        className="form-control" 
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                    /> or
                    
                <input
                    type={'file'}
                    name="bimg"
                    placeholder="Choose Color"
                    id='files'
                   
                    className="form-control" 
                    onChange={(e)=> setimg(e.target.files[0])} 
                    
                />
                <input
                    type={'text'}
                    name="bimg2"
                    id='files'
                    value={img2}
                    className="form-control" 
                    onChange={(e)=> setimg2(e.target.value)} 
                    hidden
                />

                <div className="butn" onClick={uploadImage}>Upload Image</div>
                    
              
                </div>

                <div className="form-group">
                    <input
                        type={'color'}
                        name="color"
                        placeholder="Choose Color"
                        value={color}
                        className="form-control" 
                        onChange={(e) => setcolor(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type={'text'}
                        name="des"
                        placeholder="Enter Youer Poetry"
                        className="form-control"
                        value={poem}
                        onChange={(e) => setText(e.target.value)}
                         />
                </div>
                <div className="form-group">
                    <input
                        type={'text'}
                        name="fontf"
                        placeholder="Enter Family Name"
                        className="form-control"
                        value={fam}
                        onChange={(e) => fontfam(e.target.value)}
                         />
                </div>
                <div className="form-group"> 
                    <input
                        type={'text'}
                        name="poetname"
                        placeholder="Enter Poet Name"
                        className="form-control"
                        value={poetn}
                        onChange={(e) => aut(e.target.value)}
                         />
                </div>
             
                <div className="form-group">
                    <input 
                        type={'submit'}
                        value="Submit"
                        name="submit"
                        className="btn btn-success"/>
                </div>
                </form>
            </div>
                </div>                
                <div className="right " style={{width:"45%"}}>
        {console.log(img.name)}
                    <div className="container-fluid post" style={{backgroundImage:"url('/img/"+  img2  +'',backgroundColor:name , color:color,fontFamily:fam,backgroundSize:'cover'}}>
                    <h4>{poem}</h4>
                    <h5>~{poetn}</h5>
                   </div>
                </div>
      
            </div>
        </>
    );
}