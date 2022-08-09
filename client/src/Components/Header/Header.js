import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import './Header.css';

function Header(props) {
    const [form, setForm] = useState(true)
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('token')
        navigate("/login");
    }
    useEffect(() => {
        async function fetchData() {
            const userId = localStorage.getItem('userId')
            await axios.get("http://localhost:5000/checkForm/" + userId).then((res) => {
                console.log("TTTTTTTTTTTTTTTTTTTTTTTTTT", res.data);
                if (res.data.status) {
                    setForm(false);
                }

            })
        }

        fetchData();
    }, [])

    return (
        <nav>
            <div className='div-header'>
                <div className='div-svg' >
                    <h3>Home</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {
                        form && <button className='button-header' onClick={() => { navigate('/gotoForm') }} >Book Slot</button>}

                    <button className='button-header' style={{ backgroundColor: 'red' }} onClick={logOut} >Log out</button>
                </div>
            </div>
        </nav>
    )
}

export default Header;

// import React from 'react';
// import {NavLink, withRouter} from 'react-router-dom'
// import {ReactComponent as Logo} from '../../assets/instagram.svg';
// import {ReactComponent as Home} from '../../assets/home.svg';
// import {ReactComponent as Explore} from '../../assets/explore.svg';
// import './header.css';
// const Header = ({history,isLogged}) =>{
//     const handleClick=() =>{
//         history.push('/')
//         isLogged(false)
//     }
//     return(
//         <nav>
//             <div className='div-header'>
//                 <div className='div-svg' onClick={() => history.push('/')}>
//                     <Logo/>
//                 </div>
//                 <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
//                     <NavLink exact to='/' activeClassName='active'><Home className='div-svg'/></NavLink>
//                     <NavLink exact to='/explore' activeClassName='active'><Explore className='div-svg'/></NavLink>
//                     <button className='button-header' onClick={handleClick}>Log out</button>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default withRouter(Header);