import React from 'react';
import '../../styles/LoginRegister.css'
import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../Login/Login';

const Register = () => {
    let navigate = useNavigate();
    const initialValues = { fullname: "", username: "", email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [posRegisterFeedback, setPosRegisterFeedback] = useState("");
    const [negRegisterFeedback, setNegRegisterFeedback] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setFormErrors({});
        setNegRegisterFeedback("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(formValues).isValid == true) {
            Register();
        }
        else{
            setFormErrors(validate(formValues));
        } 
    };

    async function Register(){
        let item = formValues;
        console.log(JSON.stringify(item));
        let result = await fetch("http://localhost:8001/v1/user/signup",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body:JSON.stringify(item)
        });
        result = await result.json();
        if (result["error"]){
            setNegRegisterFeedback(result['error']['message']);
        }
        else{
            alert ("Sign up berhasil");
            setPosRegisterFeedback(result['message']);
            //localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/sign-in");
        }
    }

    const validate = (formValues) => {
        const validEmail = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        const errors = {};
        errors.isValid = true;
        if(!formValues.fullname) {
            errors.full_name = "Nama tidak boleh kosong!";
            errors.isValid = false;
        }
        if (!formValues.email){
            errors.email = "Email tidak boleh kosong!";
            errors.isValid = false;
        } else if(!validEmail.test(formValues.email)){
            errors.email = "Format email salah!";
            errors.isValid = false;
        }
        if (!formValues.username) {
            errors.username = "Username tidak boleh kosong!";
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
                    type="text" 
                    name='fullname' 
                    placeholder='nama lengkap'
                    value = {formValues.full_name}
                    onChange = {handleChange}
                />
                <p class="error-message">{formErrors.full_name}</p>
                <input 
                    type="email" 
                    name='email' 
                    placeholder='email'
                    value = {formValues.email}
                    onChange = {handleChange}
                />
                <p class="error-message">{formErrors.email}</p>
                <input 
                    type="text" 
                    name='username' 
                    placeholder='username'
                    value = {formValues.username}
                    onChange = {handleChange}
                />
                <p class="error-message">{formErrors.username}</p>
                <input 
                    type="password" 
                    name='password' 
                    placeholder='kata sandi'
                    value = {formValues.password}
                    onChange = {handleChange}
                />
                <p class="error-message">{formErrors.password}</p>
                <p class="error-message">{negRegisterFeedback}</p>
                <p class="success-message">{posRegisterFeedback}</p>
                <input 
                    id= "submit" 
                    type='submit' 
                    name='register' 
                    value='register'
                />

            </form>

        </div> 

    </div>


    );
}

export default Register;