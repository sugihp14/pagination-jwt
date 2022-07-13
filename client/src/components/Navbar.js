import React from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


const Navbar = () => {
  const history=useNavigate();

const Logout=async()=>{
  try {
    await axios.delete('http://localhost:5000/logout',{ withCredentials: true })
    history("/login")
  } catch (error) {
    console.log(error)
  }
}

const  Show=()=>
{
  var burger = document.querySelector('.navbar-burger');
  var menu = document.querySelector('.navbar-menu');
  burger.classList.toggle('is-active');
  menu.classList.toggle('is-active');
}


  return (
    <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"/>
      </a>
      <div class="navbar-burger" onClick={Show} data-target="navbar" >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  
    <div id="navbar" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="https://bulma.io/">
          Home
        </a>
       
      </div>
  
      <div class="navbar-end">
        <div class="navbar-item">
       
          
            <p class="control">
              <a class="button is-danger"  onClick={Logout}>
                <span class="icon">
                  <i class="fas fa-download"></i>
                </span>
                <span>Logout</span>
              </a>
            </p>
          </div>
      </div>
    </div>
  </nav>

  )
}

export default Navbar