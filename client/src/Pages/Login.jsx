import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'

function Login() {
   
    const navigate = useNavigate()
    const [values, setvalues] = useState({ email: "", password: "" })
    const generateError = (err) => toast.error(err, { position: "top-right" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:5000/login", { ...values },{withCredentials:true})
            if (data) {
                if (data.errors) {
                  const {email,password} = data.errors;
                  if (email) generateError(email);
                  else if (password) generateError(password);
                } else {
                   navigate("/")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        
        <div className='container'>
            <h2>Register Account</h2>
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
                <span>
                   Already have an Account? <Link to={'/signup'}>Register</Link>
              </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login