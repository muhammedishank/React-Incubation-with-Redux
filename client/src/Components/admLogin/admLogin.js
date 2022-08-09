import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import '../admLogin/admLogin.css';

function AdmLogin() {

    const navigate = useNavigate()
    const [values, setvalues] = useState({ email: "", password: "" })
    const generateError = (err) => toast.error(err, { position: "bottom-right" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(values);
        try {
            const { data } = await axios.post("http://localhost:5000/AdmLogin", { ...values }, { withCredentials: true })
            console.log(data);
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    navigate("/AdminHome")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='bod'>
        <div className='container'>
            <h2>Admin Login</h2>
            <form onSubmit={(e) => handleSubmit(e)}>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Email'
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Password' onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <button type='submit'>Submit</button>
               
            </form>
            <ToastContainer />
        </div>
        </div>
    )
}

export default AdmLogin