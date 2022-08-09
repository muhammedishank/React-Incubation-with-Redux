
import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import Container from '@mui/material'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'


function CompanyRegistration() {
   
    const navigate = useNavigate()
    const [values, setvalues] = useState({
        email: "",
        phone: "",
        name: '',
        city: '',
        address: '',
        state: '',
        companyName: '',
        team: '',
        products: '',
        problem: '',
        solution: '',
        proPosition: '',
        competetors: '',
        revenueModel: '',
        potentialSize: '',
        market: '',
        need: ''
    })
    const generateError = (err) => toast.error(err, { position: "bottom-right" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:5000/submitApplication", { ...values }, { withCredentials: true })
            if (data) {
                console.log("DDDDDDAAATAA", data);
                if (data.errors) {
                    const { name, email} = data.errors;
                    if (email) generateError(email);
                    
                    else if (name) generateError(name)
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
                    <input type="text" name='name' placeholder='Name' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <input type="email" name='email' placeholder='Email' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <input type="number" name='phone' placeholder='Phone' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <input type="text" name='Address' placeholder='Address' required onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>

                <div>
                    <input type="text" name='city' placeholder='City' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <input type="text" name='state' placeholder='State' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <input type="text" name='companyName' placeholder='Company Name' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <input type="text" name='team' placeholder='Team' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <input type="text" name='products' placeholder='Products' onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>

                <div>
                    <input type="text" name='problem' placeholder='Problem' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <input type="text" name='state' placeholder='State' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <input type="text" name='proPosition' placeholder='Pro Position' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <input type="text" name='competetors' placeholder='Competetors' required
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <input type="text" name='revenueModel' placeholder='revenue Model' onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>


                <div>
                    <input type="text" name='potentialSize' placeholder='Potential Size' onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>

                    <input type="text" name='market' placeholder='Market' onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>

                    <input type="text" name='need' placeholder='Need' onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>

                    <input type="text" name='userId' hidden onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <button type='submit'>Submit</button>
                <span>
                    <Button onClick={() => { navigate("/") }}></Button>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default CompanyRegistration;