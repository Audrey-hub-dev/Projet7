import React, { useState } from "react";
import axios from "axios";
import Login from "../Login/Login";
import "./Register.css";


const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    passwordConfirmError.innerHTML = "";

    if (password !== controlPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/users/signup",
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <Login />
          <span></span>
          <p className="success">
            Vous pouvez vous connecter dès maintenant !
          </p>
        </>
      ) : (
        <form className="form-register" action="" onSubmit={handleRegister}>

          <label htmlFor="email">Adresse mail</label>
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

          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(event) => setControlPassword(event.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input className="submit-btn" type="submit" value="Inscription" />
        </form>
         
      )}
    </>
  );
};

export default SignUpForm;