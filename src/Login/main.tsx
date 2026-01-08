import React, { useState } from 'react';
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import PHeader from "../utils/pHeader";
import "./style.css";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { docQr } from "../Logics/docQr";
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/Slice';
import Header from '../landingPage2/header';

const LoginMain: React.FC = () => {
    const [isCreatingPassword, setIsCreatingPassword] = useState<boolean>(false);
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [password1, setPassword1] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const dispatch=useDispatch();
    const [showPassword2, setShowPassword2] = useState<boolean>(false);
    // const validatePassword = (password: string) => {
    //     const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    //     return passwordRegex.test(password);
    // };
const navigate=useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
// const [user,setUser]=useState<any>({});
    const submit = async () => {
    if(isLoading)return
setIsLoading(true);
    
        try{
        const fetchData=await docQr("Users",{
            max:1,
            whereClauses:[
                {
                    field:"username",
                    operator:"==",
                    value:data?.username || ""
                },
                {
                    field:"password",
                    operator:"==",
                    value:data?.password || ""
                }
            ]
        })

        if(fetchData.length <= 0){
            console.log(data);
toast.error("User not found")
return setIsLoading(false);
        }
        const user=fetchData[0];
        if(user.password.trim()===''){
setIsCreatingPassword(true);
// setUser(user);
        }
        else{
// console.log(user);
            if(user.isBanned!=='no'){
                localStorage.clear();
                sessionStorage.clear();
                toast.error("This account have been banned by admin")
                return
            }
            
            if(user.isBlocked){
                localStorage.clear();
                sessionStorage.clear();
                toast.error("This account have been blocked from using this site")
                return
            }
            toast.success("Login successful");
            window.localStorage.setItem("User",JSON.stringify(user));
navigate("/UserDashboard")   ;
dispatch(setUser(user));     }
    }
    catch(err:any){
toast.error(err?.message || "Something went wrong")        
    }
    finally{
        setIsLoading(false);
    }

    }

    

    return (
       <div className="main-body-container">
    <div className="home-content">
     <Header/>
            <Toaster />
            <div className='loginContainer '>
                <div className='Wrapper d-flex align-items-center justify-content-center'>

                <div className='form'>

<div className={`d-flex align-items-center justify-content-between`}>

    <span style={{padding:5}}>
        <FaArrowLeft onClick={()=>window.history.back()} style={{fontWeight:"bolder",cursor:"pointer"}} size={20} color={'var(--blue)'}/>
        </span>

    <span style={{fontWeight:"bold",color:"darkgray"}}> tromsoil </span>


</div>

                    <br /><br /><br/>
                 
                    <PHeader style={{ textAlign: "center",fontSize:30 }}>{isCreatingPassword ? "Create your password" : "Login"}</PHeader>
                    <span style={{padding:10,textAlign:"center",display:"block"}}>
                    Login with your username and password
                        </span>

                        <br/>
                    {isCreatingPassword ? (
                        <>
                            <div className="password-input d-flex" style={{position:"relative"}}>

                                <MDBInput
                                    size='lg'
                                    label='Create password'
                                    value={password1}
                                    type={showPassword1 ? 'text' : 'password'}
                                    onChange={(e) => setPassword1(e.target.value)}
                                />
                              
                                <div style={{borderRadius:5,position:"absolute",right:0,top:2}} className="password-toggle" 
                                onClick={()=>setShowPassword1(!showPassword1)}>
                                       {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            
                            <br />
                            <div className="password-input d-flex" style={{position:"relative"}}>
                            <MDBInput
                                onChange={(e) => setPassword2(e.target.value)}
                                type={showPassword2 ? 'text' : 'password'}
                                size="lg"
                                value={password2}
                                label='Confirm password'
                            />
                                <div onClick={()=>setShowPassword2(!showPassword2)} style={{borderRadius:5,position:"absolute",right:0,top:2}} className="password-toggle">
                                   {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <MDBInput
                                value={data?.username || ""}
                                size='lg'
                                label='Username'
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                            />
                            <br />
                            <div className="password-input d-flex" style={{position:"relative"}}>
                                <MDBInput
                                    value={data?.password || ""}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    size="lg"
                                    label='Enter password'
                                    type={showPassword ? 'text' : 'password'}
                                />
                                <div style={{borderRadius:5,position:"absolute",right:0,top:2,padding:5,marginLeft:-5,cursor:"pointer"}} className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20}/>}
                                </div>
                            </div>
                        </>
                    )}
                    <br />
                    <div className="d-flex align-items-center justify-content-center">
                        <MDBBtn 
                        
                        
                        color="dark"
                        rounded style={{ width: "100%" }} onClick={submit} size="lg">
                            {isLoading ? <ClipLoader size={18} color="white" /> : "Submit"}
                        </MDBBtn>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
    );
}

export default LoginMain;
