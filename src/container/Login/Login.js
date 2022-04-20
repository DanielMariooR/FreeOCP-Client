import React, { useContext } from 'react';
import '../../styles/LoginRegister.css'
import { BrowserRouter as Router, Link, Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { LoginContext } from '../../helper/isLoginContext';

const Login = () => {
    let navigate = useNavigate();
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [loginFeedback, setLoginFeedback] = useState('');
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setFormErrors({});
        setLoginFeedback("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(formValues).isValid == true) {
            login();
            setIsLoggedIn(true)
        }
        else{
            setFormErrors(validate(formValues));
        } 

    };

    async function login(){
        //console.warn(formValues.username, formValues.password);
        let item = formValues;
        console.log(JSON.stringify(item));
        let result = await fetch("http://localhost:8001/v1/user/signin",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept" : 'application/json'
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        if(result['error']){
            setLoginFeedback(result['error']['message'])
        }
        else{
            var token = jwt_decode(result.token);
            localStorage.setItem("user-info", JSON.stringify(result));
            localStorage.setItem("isAdmin", token.admin);
            if (token.admin) {
                navigate('/admin/problems');
            } else {
                navigate('/dashboard?page=1');
            }
        }
    }

    const validate = (formValues) => {
        const validEmail = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        const errors = {};
        errors.isValid = true;
        if (!formValues.email) {
            errors.email = "Email tidak boleh kosong!";
            errors.isValid = false;
        } else if(!validEmail.test(formValues.email)){
            errors.email = "Format email salah!";
            errors.isValid = false;
        }
        
        if (!formValues.password) {
            errors.password = "Kata sandi tidak boleh kosong!";
            errors.isValid = false;
        } 
        return errors;
    };
    return(
    <div className="body">
        <div className="background" id = "trapezoid">
            <img id="logo" src="assets/Login-Logo.png" alt="logo freeocp"></img>
        </div>
        <div className ="background" id = "content">
            <div className='Menu'>
                <div id = "Register-div">
                    <NavLink to="/sign-up" >Daftar</NavLink>
                </div>
                <div id = "Login-div">
                    <NavLink to="/sign-in" >Masuk</NavLink>
                </div>
                <div>

                </div>
            </div>            
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name='email' 
                    placeholder='email' 
                    value = {formValues.email}
                    onChange = {handleChange}
                />
                <p class="error-message">{formErrors.email}</p>

                <input 
                    type="password" 
                    name='password' 
                    placeholder='kata sandi'
                    value = {formValues.password}
                    onChange = {handleChange}
                    />
                <p class="error-message">{formErrors.password}</p>
                <p class="error-message">{loginFeedback}</p>
                <input id= "submit" type='submit' name='login' value='Masuk'/>

            </form>

        </div> 

    </div>


    );
}

export default Login;