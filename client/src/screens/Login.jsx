import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Context } from "../Context"
import "./css/Login.css"

// import Layout from '../layouts/Layout'
export default function Login(props) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const { username, password } = formData
  const { handleLogin } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login-form-container">

      <form className="login-form" onSubmit={(e) => {
        e.preventDefault();
        handleLogin(formData)
      }} onChange={handleChange}>
        <h3>Login</h3>
        <label className="form-inputs">Username:
          <input type="text" name="username" value={username}></input>
        </label>
        <label className="form-inputs">Password:
          <input type="password" name="password" value={password}></input>
        </label>
        <button>Login</button>
        <div className="login-form-footer">
          Don't have an account yet? <Link className="register-link" to="/register">Register Here</Link>
        </div>
      </form>

    </div>
  )
}

