// import React,{useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import {useCookies} from 'react-cookie'
// import axios from 'axios'


// function Secret() {
//   const navigate = useNavigate()
//   const [cookies, setCookie, removeCookie] = useCookies([]);
//   useEffect(() => {
//     const verifyUser = async () => {
//       if (!cookies.jwt) {
//         navigate("/login");
//       } else {
//         const { data } = await axios.post(
//           "http://localhost:5000",
//           {},
//           {
//             withCredentials: true,
//           }
//         );
//         if (!data.status) {
//           removeCookie("jwt");
//           navigate("/login");
//         } else {
//           toast(`Hi ${data.user} `, {
//             theme: "dark",
//           });
//         }
//       }
//     };
//     verifyUser();
//   }, [cookies, navigate, removeCookie]);

//   const logOut = () => {
//     removeCookie("jwt");
//     navigate("/login"); 
//   }
//   return (
//     <>
//     <div className='private'>
//       <h1>User Home</h1>
//       <button onClick={logOut}>Log Out</button>
//       <ToastContainer />
//     </div>
//     </>
//   )
// }

// export default Secre
import { ToastContainer, toast } from 'react-toastify'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CompanyRegistration from './CompanyRegistration';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function UserHome() {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies([]);
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
          removeCookie("jwt");
          navigate("/login");
        } else {
          toast(`Hi ${data.user} `, {
            theme: "dark",
          });
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);
  const logOut = () => {
       removeCookie("jwt");
      navigate("/login"); 
      }
  
  const token = localStorage.getItem('token')
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([])

  

  const deleteCompany = () => {
    axios({
      method: 'get',
      url: `admin/deleteCompany/${token}`
    }).then((res) => setResult(res.data))
  }

  return (
    <Grid container justifyContent="center">
      <button onClick={logOut}>Log Out</button>
      {
        result.length > 0 ?
          result.map((row) => {
            return (
              <Grid container m={4}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableBody>
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
                        <StyledTableCell align="right">{row.status}</StyledTableCell>
                        <StyledTableCell align="right">{row.companyName}</StyledTableCell>
                        <StyledTableCell align="right">{row.state}</StyledTableCell>
                        <StyledTableCell align="right"><DeleteIcon onClick={deleteCompany} sx={{ cursor: 'pointer' }} /></StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )
          })

          :

          (<Button
            sx={{ marginTop: "20px", marginBottom: "10px" }}
            onClick={() => setOpen(true)}
            variant="contained"
            color="primary"
          >
            BOOK SLOT
          </Button>
          )

      }

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CompanyRegistration state={open} setState={setOpen} />
        </Box>
      </Modal>
    </Grid>
  )
}

export default UserHome;