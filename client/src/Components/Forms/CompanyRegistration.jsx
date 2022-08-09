import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import Container from '@mui/material'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'


function CompanyRegistration() {
    const notify = (error) => toast(error);

    const navigate = useNavigate()
    const [values, setvalues] = useState({
        userId: localStorage.getItem('userId'),
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
        
        proPosition: '',
        competetors: '',
        revenueModel: '',
        potentialSize: '',
        market: '',
        need: ''
    })
    const validate = (values) => {

        const errors = {}
        //const regex = "\b[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}\b";
        //notify()

        if (!values.address) {
            errors.address = "address is required"
            notify(errors.address)
        } else {
            let error = /^[A-Za-z]+$/.test(values.address)
            if (!error) {
                errors.address = "Only alphebets are allowed For Address"
                notify(errors.city)
            }
        }
        if (!values.city) {
          errors.city = "City is required";
          notify(errors.city)
        } else {
          let error = /^[A-Za-z]+$/.test(values.city)
          if (!error) {
            errors.city = "Only alphebets are allowed For City"
            notify(errors.city)
          }
        }
        if (!values.email) {
          errors.email = "email is required";
          notify(errors.email)
        } else {
          let regexEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
          if (values.email.match(regexEmail)) {

          } else {
            notify('Please provide a valid email address (eg:- test@gmail.com)')

          }
        }

        if (!values.state) {
          errors.state = "state is required";
        }
        if (!values.phone) {
          errors.phone = "mobile number is required";
          notify(errors.phone)
        } else if (values.phone.length < 10) {
          errors.phone = "10 numbers required for phone";
          notify(errors.phone)
        } else if (values.phone.length > 10) {
          errors.phone = "Enter less than 10 numbers for phone";
          notify(errors.phone)
        }
        if (!values.companyName) {
          errors.companyName = "This field is required";
          notify(errors.companyName)
        }else{
          let error = /^[A-Za-z]+$/.test(values.companyName)
          if (!error) {
            errors.companyName = "Only alphebets are allowed For CompanyName"
            notify(errors.companyName)
          }
        }

        if (!values.team) {
          errors.team = "This field is required";
          notify('form has unfilled required fields')
        }
        if (!values.products) {
          errors.products = "This field is required";
          notify('form has unfilled required fields')
        }
        if (!values.problem) {
          errors.problem = "This field is required";
          notify('form has unfilled required fields')
        }
       
        if (!values.market) {
          errors.market = "This field is required";
          notify('form has unfilled required fields')
        }

        if (!values.need) {
          errors.need = "This field is required";
          notify('form has unfilled required fields')
        }

        return errors
    };
    const generateError = (err) => toast.error(err, { position: "bottom-right" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const errOr = validate(values)
        console.log(errOr);
        console.log(Object.keys(errOr));
        if (Object.keys(errOr).length === 0) {
            try {
                const { data } = await axios.post("http://localhost:5000/submitApplication", { ...values }, { withCredentials: true })
                if (data) {
                    if (data.errors) {
                        const { name, email, phone } = data.errors;
                        if (email) generateError(email);
                        else if (phone) generateError(phone);
                        else if (name) generateError(name)
                    } else {
                        navigate("/")
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className='container'>
            <h2>Application Form</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input type="text" name='name' placeholder='Name'
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <input type="email" name='email' placeholder='Email'
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <input type="number" name='phone' placeholder='Phone'
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <input type="text" name='address' placeholder='Address' onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>

                <div>
                    <input type="text" name='city' placeholder='City' 
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <input type="text" name='state' placeholder='State' 
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <input type="text" name='companyName' placeholder='Company Name' 
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <input type="text" name='team' placeholder='Team' 
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div> 
                <div>
                    <input type="text" name='products' placeholder='Products' onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>

                <div>
                    <input type="text" name='problem' placeholder='Problem' 
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <input type="text" name='state' placeholder='State' 
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })
                        } />
                </div>
                <div>
                    <input type="text" name='proPosition' placeholder='Pro Position' 
                        onChange={(e) => setvalues({ ...values, [e.target.name]: e.target.value })} />
                </div>
                <div>
                    <input type="text" name='competetors' placeholder='Competetors' 
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

                <button type='submit'>Submit</button>
                <span>
                    <Button onClick={() => { navigate("/") }}>Back</Button>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default CompanyRegistration;

