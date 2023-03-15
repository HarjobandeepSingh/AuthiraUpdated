import { Link,useParams } from "react-router-dom";
import logo from '../logo.svg';
import React, { useEffect,useState } from "react";
import bell from '../bell.png';
import axios from "axios";
import './ind.css';
import { get } from "jquery";



export default function Post(){
    const params = useParams();
    console.log(params.id)
    console.log(params.uid)

    useEffect(()=> {
        axios.get(uri+`getPostView/${params.id}`)
        .then(succ => {
            console.log(succ.data)
            setdata(succ.data);
            setdata2(succ.data.userId)
            console.log("dataaaaaaaaaaa",succ.data.userId)
        })
        .catch(err =>{
            console.log(err)
        })
    }, [params.id])
    // user detail
    useEffect(()=> {
        axios.get(uri+`userView/${params.uid}`)
        .then(succ => {
            console.log(succ.data)
            setuName(succ.data)
            console.log("dataaaaaaaaaaa",succ.data)
        })
        .catch(err =>{
            console.log(err)
        })
    }, [params.uid])
    //follow 

    function Follow() {
        if (!following) {
          // Follow the user
          var obj = {
            follower: userId,
            followee: data2,
          }
          axios.post(uri+'Follow', obj).then((succ) => {
            console.log(succ.data)
            if(succ.data != ""){
              alert('Data Added');
            }
          })
        } else {
          // Unfollow the user
          axios.delete(uri+'unfollow', { data: { follower: userId, followee: data2 } })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        // Toggle the following state
        setFollowing(!following);
      }
      
      function handleClick(){
        localStorage.clear();
        window.location.href = '/Login';
    }      

const [todos, setTodos] = useState(
    () =>
      JSON.parse(localStorage.getItem("gg")) 
  );
  useEffect(() => {
    localStorage.setItem("gg", JSON.stringify(todos));
    setUserId(todos.uid)
    setFollow(todos.uName)
  }, [todos]);



    var uri = "http://localhost:1000/";  
    
    const [following,setFollowing] = useState({});
    const [data, setdata] = useState({});
    const [userId, setUserId] = useState({});
    const [data2, setdata2] = useState({});
    const [Status, setStatus] = useState('');
    const[liked,setLiked] = useState({});
    const [StatusUser, setStatusUser] = useState('');
    const [user, setuName] = useState({});
    const [Followg, setFollow] = useState({});
console.log(data2)
    console.log(data)

    function getFollowing() {
        axios.get(uri+'following',{ params: { follower: userId, followee: data2 } })
          .then((response) => {
            const following = response.data;
            // Update the state with the following list
            setFollowing(following);
            setStatus('true');
            console.log(following+"-- following");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      
      useEffect(() => {
        // Call the getFollowing function after the userId and data2 state variables have been initialized
        if (userId && data2) {
          getFollowing();
        }
      }, [userId, data2]);
   
      function ToggleLike() {
        if (!liked) {
          // Like the post
          axios.post(uri+'likePost', { postId: params.id, userId: userId })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // Unlike the post
          axios.delete(uri+'unlikePost', { data: { postId: params.id, userId: userId } })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
        // Toggle the liked state

        setLiked(!liked);
      }
      function nextPro(){
        window.location.href = '/Profile2';
      }

      var uidk = params.uid;
      const [formValues,updateFormValues] = useState({});
      useEffect(()=>{
          const valuesToSave = {formValues,uidk}
          window.localStorage.setItem('postuser',JSON.stringify(valuesToSave));
      });
    return (
        < >
        
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

            <div className="ma "  >
              
                 <div className="bo"> 
                   
            <div className="ri">
                    <div className="container-fluid post" style={{backgroundColor:data.bgcolor, color:data.color,fontFamily:data.fontf,padding:"20px",backgroundImage:"url(" +  data.bimg  + ")"}}>
               
                
                    <h4>{data.des}</h4>
                    <h5>~{data.poet}</h5>
                    
                    </div>
                </div> 
                <div className="pro" onClick={nextPro}></div>
{data.poet}
<button onClick={Follow} id="foll">
  {following ? "Following" : "Follow"}
</button>


<button onClick={ToggleLike}>
  {liked ? "Unlike" : "Like"}
</button>




                </div>
                
            </div>
        </>
    );
}