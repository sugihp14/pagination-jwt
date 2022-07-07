import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate, useParams,useLocation} from "react-router-dom";




 const Register = () => {

    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [confPassword,setConfPassword]=useState('')
    const [msg,setMsg]=useState('')
    const [errorMsg,setErrorMsg]=useState([])
    const history=useNavigate();



    const Register=async(e)=>{
        e.preventDefault();

        
       const valid= validate(name,email,password,confPassword);
       setErrorMsg(valid)

        try {
            await axios.post('http://localhost:5000/register',{
                name:name,
                email:email,
                password:password,
                confPassword:confPassword
            });
           history('/login')            
        } catch (error) {
          
            setMsg(error.response.data.msg)
        }
    }

    const validate=(name,email,password,confPassword)=>{
        const error={}
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(name==='') error.name="Nama Tidak Boleh Kosong"
        if(email==='') error.email="Email Tidak Boleh Kosong"
        if(password==='')error.password="Password Tidak Boleh Kosong"
        if(confPassword==='')error.confPassword="Konfirmasi Password Tidak Boleh Kosong"
        if(password!==confPassword)error.confPassword="Konfirmasi Password tidak sama"
        if(password.length<6) error.password="Password minimal 6 karakter"
        if(!email.match(mailformat)) error.email="Alamat Email Tidak Sesuai"
        return error
    }



  return (

    <section className="hero has-background-grey-light is-fullwidth is-fullheight">
      <div className="hero-body">
        <div className="container">
            <div className='columns is-centered'>
                <div className='column is-4-desktop'>
                    <form className='box' onSubmit={Register}>
                    <p className="help is-danger">{msg}</p>

                        <div className='field mt-5'>
                            <label className='label'>Name</label>
                            <div className='controls'>
                                <input type="text" className={(errorMsg.name)?'input is-danger':'input'} value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name'/>

                            </div>
                            <p className="help is-danger">{errorMsg.name}</p>
                        </div>
                        <div className='field mt-5'>
                            <label className='label'>Email </label>
                            <div className='controls'>
                                <input type="text" className={(errorMsg.email)?'input is-danger':'input'}  value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder=' email'/>

                            </div>
                            <p className="help is-danger">{errorMsg.email}</p>

                        </div>
                        <div className='field mt-5'>
                            <label className='label'>Password</label>
                            <div className='controls'>
                                <input type="password" className={(errorMsg.password)?'input is-danger':'input'}  value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='******'/>

                            </div>
                            <p className="help is-danger">{errorMsg.password}</p>

                        </div>
                        <div className='field mt-5'>
                            <label className='label'>Confirm Password</label>
                            <div className='controls'>
                                <input type="password" className={(errorMsg.confPassword)?'input is-danger':'input'}  value={confPassword} onChange={(e)=>setConfPassword(e.target.value)}  placeholder='******'/>

                            </div>
                            <p className="help is-danger">{errorMsg.confPassword}</p>

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

export default Register