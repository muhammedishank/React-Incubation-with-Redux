

import Header from '../Header/Header';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Container, ProgressBar, Table} from "react-bootstrap";
import '../userHome/home.css';
import { createTheme,ThemeProvider } from '@mui/material/styles';


// import CircularProgress from '@mui/material/CircularProgress';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import LinearProgress from '@mui/material/LinearProgress';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';


function Home() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [data,setData] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [state,setState] = useState([])
    useEffect(() => {
        const verifyUser = async () => {
            if (!cookies.jwt) {
                navigate("/login");
            } else {
                const { data } = await axios.post(
                    "http://localhost:5000",
                    {},
                    {
                        withCredentials: true,
                    }
                );
                if (!data.status) {
                    localStorage.removeItem('token')
                    removeCookie("jwt");
                    navigate("/login");
                } else {
                    setName(data.name)
                    toast(`Hi ${data.name} `, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }
            }
        };
        verifyUser();
    async function fetchData (){
        const userId = localStorage.getItem('userId')
        console.log("ABBBBBBBBBBBBBBb",userId);
        await axios.get("http://localhost:5000/userForm/"+userId).then((res)=>{
            console.log(res.data);
            if(res.data != null){
              setData(res.data);
            }
            
        })
        
    }
    fetchData();
        
    }, [cookies, navigate, removeCookie]);
    console.log(data.length);
    const logOut = () => {
        localStorage.removeItem('token')
        removeCookie("jwt");
        navigate("/login");
    }
    return (

        <div className='main'>
            <div><Header data={name} /></div>
            
            <div style={{ marginTop: "2%" }}>
          <Container className='mt-5'>
            <Table hover size="sm">
              <thead>
                <tr>
                  <th>SL NO</th>
                  <th>Application ID</th>
                  <th>Company Name</th>
                  <th style={{ textAlign: "center" }}>Application Status</th>
                  <th>Slot Status</th>
                </tr>
              </thead>
             
              <tbody>
                {data.map((obj, index) => {
                  console.log(obj,"OBJ");
                  console.log(index,"index");
                  // {obj!= null ? }
                  if(obj!=null){
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{obj._id}</td>
                        <td>{obj.companyName}</td>
                        <td>
                          {obj.status !== "blocked" ? (
                            <Table>
                              <thead>
                                <tr>
                                  <th style={{ textAlign: "center" }}>Pending</th>
                                  <th style={{ textAlign: "center" }}>Processing</th>
                                  <th style={{ textAlign: "center" }}>Approved</th>
                                </tr>
                              </thead>
    
                              <tbody>
                                <tr>
                                  <td colSpan={3}>
                                    {obj.status !== "blocked" ? (
                                      <ProgressBar
                                        style={{ marginLeft:"80px", width: "45em" }}
                                        animated
                                        now={
                                          obj.status === "pending"
                                            ? 20
                                            : obj.status === "PROCESSING"
                                            ? 50
                                            : 100
                                        }
                                      />
                                     
                                    ) : (
                                      <span>Rejected</span>
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          ) : (
                            <h5 style={{ color: "red", textAlign: "center" }}>
                              Rejected
                            </h5>
                          )}
                        </td>
                        <td>
                          {obj.bookingStatus ? (<p style={{color:"green", textAlign:"center"}}>Allocated</p>) : (<p style={{color:"green", textAlign:"center"}}>Not Allocated</p>)}
                        </td>
                        
                      </tr>
                    );
                  } else{
                    return(
                      <div></div>
                    )
                  }
                  
                })}
              </tbody>
             
            </Table>
          </Container>
        </div>
                <ToastContainer />
            

        </div>

    )
}

export default Home;
  

// import React,{useEffect}  from 'react'
// import './status.css'
// import { Container, ProgressBar, Table} from "react-bootstrap";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import {Link} from 'react-router-dom'
// import {Button } from '@mui/material'
// import { createTheme,ThemeProvider } from '@mui/material/styles';

// function Status() {
//   const navigate = useNavigate();
//   useEffect(()=>{
//     const auth=localStorage.getItem("token")
//     if(!auth){
//      navigate("/login")
//     }
//   })
//     const theme = createTheme({
//         status: {
//           danger: '#e53e3e',
//         },
//         palette: {
//           primary: {
//             main: '#0971f1',
//             darker: '#053e85',
//           },
//           neutral: {
//             main: '#ffffff',
//             contrastText: '#fff',
//           },
//         },
//       });
//     const info = JSON.parse(localStorage.getItem("userInfo"));
//     const [data, setData] = useState([]);
  
  
//     const logOut = ()=>{
//         localStorage.clear()
//         navigate('/login')
//     }


//     // const config = {
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     // };

//     const getStatus = async() => {
//         let applicationData = await axios.get(`http://localhost:3001/users/status/${info.user}`);
//         console.log("appdataaaaaaaaaaaa", applicationData);
//         setData(applicationData.data);
//       }
//     useEffect( ()=>{
//         getStatus();
//     }, []);
  
//     return (
//       <div>
//          <Navbar  expand="lg" bg="dark"  variant="white">
//       <Container fluid>
//         <Navbar.Brand  href=""><Link to='/home' className="navName">BUSSINESS INCUBATOR</Link></Navbar.Brand>
//         <Navbar.Brand  href=""><Link className="navName" id="navSub" to='/status'>  Status</Link></Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
           
//           </Nav>
//           <ThemeProvider theme={theme}>
//           <Button onClick={logOut} className='button' variant="outlined" color="neutral" >Logout</Button>
//           </ThemeProvider>
        
//         </Navbar.Collapse>
        
//       </Container>
//     </Navbar>
//         <div style={{ marginTop: "2%" }}>
//           <Container>
//             <Table hover size="sm">
//               <thead>
//                 <tr>
//                   <th>SL NO</th>
//                   <th>Application ID</th>
//                   <th>Company Name</th>
//                   <th style={{ textAlign: "center" }}>Application Status</th>
//                   <th>Slot Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((obj, index) => {
//                   return (
//                     <tr>
//                       <td>{index + 1}</td>
//                       <td>{obj._id}</td>
//                       <td>{obj.companyName}</td>
//                       <td>
//                         {obj.status !== "REJECTED" ? (
//                           <Table>
//                             <thead>
//                               <tr>
//                                 <th style={{ textAlign: "center" }}>Pending</th>
//                                 <th style={{ textAlign: "center" }}>Processing</th>
//                                 <th style={{ textAlign: "center" }}>Approved</th>
//                               </tr>
//                             </thead>
  
//                             <tbody>
//                               <tr>
//                                 <td colSpan={3}>
//                                   {obj.status !== "REJECTED" ? (
//                                     <ProgressBar
//                                       style={{ marginLeft:"80px", width: "45em" }}
//                                       animated
//                                       now={
//                                         obj.status === "PENDING"
//                                           ? 20
//                                           : obj.status === "PROCESSING"
//                                           ? 50
//                                           : 100
//                                       }
//                                     />
                                   
//                                   ) : (
//                                     <span>Rejected</span>
//                                   )}
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </Table>
//                         ) : (
//                           <h5 style={{ color: "red", textAlign: "center" }}>
//                             Rejected
//                           </h5>
//                         )}
//                       </td>
//                       <td>
//                         {obj.bookingStatus ? (<p style={{color:"green", textAlign:"center"}}>Allocated</p>) : (<p style={{color:"green", textAlign:"center"}}>Not Allocated</p>)}
//                       </td>
//                       {/* <td>
//                         <p
//                           className="view"
//                           style={{ color: "black", textAlign: "center" }}
//                           onClick={() => {
//                             navigate("/userAppView");
//                             localStorage.setItem(
//                               "appId",
//                               JSON.stringify([obj._id])
//                             );
//                           }}
//                         >
//                           View Application
//                         </p>
//                       </td> */}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </Table>
//           </Container>
//         </div>
//       </div>
//     );
//   }
  
//   export default Status;


