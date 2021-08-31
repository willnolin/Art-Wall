import React, { useState } from 'react'
import './css/Register.css'
export default function Register(props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const { username, email, password } = formData
  const { handleRegister, invalid, errorObj, setErrorObj} = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorObj({})
  };

  return (
    <div className="reg-form-container">

      <form className="reg-form" onSubmit={(e) => {
        e.preventDefault();
        handleRegister(formData)
      }} >
        <h3>Register</h3>
        <label className="form-inputs">Username:
          <input type="text" name="username" value={username} onChange={handleChange}></input>
        </label>
        <br />
        <label className="form-inputs">Email:
          <input type="text" name="email" value={email} onChange={handleChange}></input>
        </label>
        <br />
        <label className="form-inputs">Password:
          <input type="password" name="password" value={password} onChange={handleChange}></input>
        </label>
        {/* {console.log(Object.entries(errorObj))} */}
        <br />
        <button>Register</button>
        {/* <Link to="/login">Login</Link> */}
        <div className="reg-error-msg">
          {invalid && Object.entries(errorObj).length < 4 &&
            Object.entries(errorObj).map(entry => (
              <p>username or email has already been taken</p>
            ))
        }
          </div>
      </form>

    </div>
  )
}
