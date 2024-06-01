import React, { useEffect, useState } from "react";
import { loadStyles, unloadStyles } from './loadstyle';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import signupValidation from "./signupValidation";
import axios from "axios";

const bootstrapCssUrl = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';

function Signup() {
  useEffect(() => {
    loadStyles(bootstrapCssUrl);

    return () => {
      unloadStyles('dynamic-bootstrap-css');
    };
  }, []);

  const [errors, setErrors] = useState({});
  const [Values, setvalues] = useState({
    email: "",
    password: "",
    name:"",
  });

  // Initialize navigate using useNavigate hook
  const navigate = useNavigate();

  const handleInput = (event) => {
    setvalues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, // Remove the unnecessary array brackets
    }));
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    setErrors(signupValidation(Values));
    if(errors.name === '' && errors.email === '') {
      axios.post('http://localhost:8800/signup', Values)
        .then(res => {
          navigate('/ProfileSelection'); // Use navigate function to redirect
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
      <div className="bg-white p-3 rounded w-25">
        <h2><strong>Sign up</strong></h2>
        <form action="" onSubmit={handleSumbit}>
          <div className="mb-3">
            <label htmlFor="name"><strong>name</strong></label>
            <input type="text" placeholder="Enter Email" name="name" onChange={handleInput} className="form-control rounded-0" />
          </div>
          {errors.name && <span className="text-danger">{errors.name}</span>}
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder="Enter Email" name="email" onChange={handleInput} className="form-control rounded-0" />
          </div>
          {errors.email && <span className="text-danger">{errors.email}</span>}
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder="Enter password" name="password" onChange={handleInput} className="form-control rounded-0"/>
          </div>
          {errors.password && <span className="text-danger">{errors.password}</span>}
          <button type="submit" className="btn btn-default border w-100 bg-light">Create account</button>
          <p>Agreed to our terms and policies</p>
          <Link to='/login' className="btn btn-success w-100 rounded 0">Log in</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;