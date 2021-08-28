import React, { useState } from 'react'

export default function Register(props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const { username, email, password } = formData
  const { handleRegister, invalid} = props;

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
        handleRegister(formData)
      }} onChange={handleChange}>
        <h3>Register</h3>
        <label className="form-inputs">Username:
          <input type="text" name="username" value={username}></input>
        </label>
        <br />
        <label className="form-inputs">Email:
          <input type="text" name="email" value={email}></input>
        </label>
        <br />
        <label className="form-inputs">Password:
          <input type="password" name="password" value={password}></input>
        </label>
        {invalid && <p>Username of email already exists</p>}
        <br />
        <button>Register</button>
        {/* <Link to="/login">Login</Link> */}
      </form>

    </div>
  )
}
