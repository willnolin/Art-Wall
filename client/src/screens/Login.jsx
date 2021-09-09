import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';

import "./css/Login.css"

export default function Login(props) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const { username, password } = formData
  const { handleLogin, invalid, errorObj, setErrorObj} = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorObj({})
  };

  return (
    <div className="login-form-container">

      <form className="login-form" onSubmit={(e) => {
        e.preventDefault();
        handleLogin(formData)
      }} >
        <h3>Login</h3>
        <label className="form-inputs">Username:
          <input type="text" name="username" value={username} onChange={handleChange}></input>
        </label>
        <br />
        <label className="form-inputs">Password:
          <input type="password" name="password" value={password} onChange={handleChange}></input>
        </label>
        <br />
        <button>Login</button>
        <div className="login-error-msg">
        {invalid && Object.entries(errorObj).map((entry, i) => {
          return <p>Username or Password invalid. Please try again.</p>
        })}
          </div>
        <br />
        <br />
        <div className="login-form-footer">
          Don't have an account yet? <Link className="register-link" to="/register">Register Here</Link>
        </div>
      </form>

    </div>
  )
}

