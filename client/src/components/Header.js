import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
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
    const dispatch = useDispatch();
    let history = useHistory();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const logoutHandler = () => {
      dispatch(logout());
      history.push('/login')
    };
  
    useEffect(() => {}, [userInfo]);
  
    return (  
        <div className="Container">
            <HomeLogo src={logo} />
              {userInfo ? (
                  <>
                  <Link to="/">Home</Link>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} 
                    color="#FD2D01"
                    onClick={logoutHandler} 
                    />
                    </>
                
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>  
    );
  }
  
  export default Header;