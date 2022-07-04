import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from '../assets/logo.png';
import styled from 'styled-components';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const HomeLogo = styled.img`
height: 35px;
`


function Header() {

const userInfoFromStorage = sessionStorage.getItem("userInfo")
  ? JSON.stringify(sessionStorage.getItem("userInfo"))
  : null;


  let history = useHistory()
  
  const logoutHandler = () => {
    sessionStorage.removeItem("userInfo")
    history.push('/login')
  };
  
  
    return (  
        <div className="Container">
            <HomeLogo src={logo} alt="logo-Groupomania"/>
            
            { userInfoFromStorage ? (
                  <>
                  <Link to="/">Home</Link>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} alt="logout-button"
                    color="#FD2D01"
                    onClick={logoutHandler} 
                    />
                    </>
            ) : (
            
                <><Link to="/login">Login</Link><Link to="/register">Register</Link></>
            
            )}
            </div>  
    );
  }
  
  export default Header;