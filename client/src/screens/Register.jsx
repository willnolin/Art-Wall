import React, { useState, useContext } from 'react'
import { Context } from '../Context';
import Loader from '../components/Loader';
import './css/Register.css'
export default function Register(props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const { currentUser } = useContext(Context);
  const { username, email, password } = formData
  const { handleRegister, invalid, setInvalid, errorObj, setErrorObj,
    isLoading, setIsLoading } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setInvalid(false)
    setErrorObj({})
  };

  return (
    <div className="reg-form-container">
      {currentUser ? <p>You are already registered!</p> :
        <form className="reg-form" onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true)
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
          {isLoading &&
            <Loader />
          }
          {/* <Link to="/login">Login</Link> */}
          <div className="reg-error-msg">
            {invalid && Object.entries(errorObj).length < 4 &&
              Object.entries(errorObj).map(entry => (
                <p>{entry[0]} {entry[1]}</p>
              ))
            }
          </div>
        </form>
      }
    </div>
  )
}
