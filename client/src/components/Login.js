import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'


 const Login = () => {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [msg,setMsg]=useState('')
  const [errorMsg,setErrorMsg]=useState([])
  const history=useNavigate();


  useEffect(()=>{
    refreshToken()
  },[])

  const refreshToken=async()=>{
    try {
        const response=await axios.get('http://localhost:5000/token',{ withCredentials: true })
        history(-1)
    } catch (error) {
     
    }
}


  const login=async(e)=>{


    e.preventDefault();
    const valid= validate(email,password);
    setErrorMsg(valid)
    
    try {
      const response=await axios.post('http://localhost:5000/login',{
        email:email,
        password:password
      },{ withCredentials: true })
       history("/")

    } catch (error) {
      if(error.response.data) {
        setMsg(error.response.data.msg)

      setTimeout(() => {
        setMsg('')

      }, 5000);
      }
    }

  }


  const validate=(name,email,password)=>{
    const error={}
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email==='') error.email="Email Tidak Boleh Kosong"
    if(password==='')error.password="Password Tidak Boleh Kosong"
    if(!email.match(mailformat)) error.email="Alamat Email Tidak Sesuai"
    return error
}

  
  return (

    
    <section className="hero has-background-grey-light is-fullwidth is-fullheight">
      <div className="hero-body">
        <div className="container">
            <div className='columns is-centered'>
                <div className='column is-4-desktop'>
                    <form className='box' onSubmit={login}>
                      {
                        msg &&(
                          <div className='notification is-danger' >
                          {msg}
                        </div>
                        )
                      }
                    
                        <div className='field mt-5'>
                            <label className='label'>Email or Username</label>
                            <div className='controls'>
                                <input type="text" className='input' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='username or email'/>

                            </div>
                        </div>
                        <div className='field mt-5'>
                            <label className='label'>Password</label>
                            <div className='controls'>
                                <input type="password" className='input' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='******'/>

                            </div>
                        </div>
                        <div className='field mt-5'>
                           <button className='button is-success is-fullwidth'>Login</button>
                        </div>
                   </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Login