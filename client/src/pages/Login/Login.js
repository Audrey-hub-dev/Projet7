import React, { useState } from "react";
import axios from "axios";
import "./Login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: "http://localhost:3000/api/users/login",
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.erros.password;
        } else {
            sessionStorage.setItem("userInfo", res.data.token)
            window.location= "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="form-login" action="" onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input className="submit-btn" type="submit" value="Se connecter" />
    </form>
  );
};

export default Login