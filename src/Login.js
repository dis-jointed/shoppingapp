import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react'
import './Login.css'
import {auth} from './firebase'


function Login() {
    const history = useHistory();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [emailActive, setemailActive] = useState(false);
    const [value, setValue] = useState('');
    const [wobble, setWobble] = React.useState(0)

    const register = e => {
        e.preventDefault()
    
        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {

            if(auth){
                history.push('/')
            }
            console.log(auth);
        })
        .catch(error => alert(error.message))
        
        
    }

    const signin = e => {
        e.preventDefault()
    
        auth.signInWithEmailAndPassword(email, password)
        .then((auth) => {

            if(auth){
                history.push('/')
            }
            console.log(auth);
        })
        .catch(error => alert(error.message))
        
        
    }

    function handleTextChange(text) {
        setemail(text);
      
        if (text !== '') {
          setemailActive(true);
        } else {
          setemailActive(false);
        }
      }

      function handlePasswordChange(text) {
        setpassword(text);
      
        if (text !== '') {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }



    return (
        <div>
              <div class="container">

                  <div class='container__left'>
                     <img src='https://image.freepik.com/free-vector/original-cosmic-poster-with-text-feel-fear-it-anyway-illustration_1284-44910.jpg' />
                  </div>

                  <div class="login-box">
                    <h2>Login</h2>
                    <form>
                        <div class="user-box">
                        <input type="text" 
                               value={email}
                                onChange={(e) => handleTextChange(e.target.value)} required=""/>
                        <label className={ emailActive ? "Active" : ""} htmlFor="text">Email</label>
                        </div>
                        <div class="user-box">
                        <input type="password"  value={password}
                                onChange={(e) => handlePasswordChange(e.target.value)} required=""/>
                        <label className={ isActive ? "Active" : ""} htmlFor="password">Password</label>
                        </div>
                        <a href="#" onClick={signin}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                          Login
                        </a>
                    </form>

                    <p className='account__txt'>Dont have an account? <span className='signup__btn' onClick={() => setWobble(1)}
                                                                                            onAnimationEnd={() => setWobble(0)}
                                                                                            >Sign up</span></p>
                    </div>
                  
                    {/* <div class="box">
                        <h2>Login</h2>
                        <img src='https://image.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg' />
                    </div> */}
                </div>
        </div>
    )
}

export default Login
