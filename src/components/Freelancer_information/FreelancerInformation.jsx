import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './style.css'; // Ensure this is the correct path to your CSS file

const ProfileForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [address, setAddress] = useState('');
  const [skill, setSkill] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const profileData = { userId,title, description, hourlyRate, address, skill };
    console.log('Profile Data:', profileData);

    axios.post('http://localhost:8800/insertinprofile', profileData)
      .then(res => {
        if (res.status === 201) {
          navigate('/'); 
        } else {
          alert("Profile creation failed");
        }
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred while creating the profile");
      });
  };

  return (
    <div>
      <nav id="menu" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
            </button>
            <Link className="navbar-brand page-scroll" to="/">
              FreelancerPro
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1"></div>
        </div>
      </nav>

      <div className="container" style={{ marginTop: '100px' }}>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h2 className="panel-title">Create Your Profile</h2>
              </div>
              <div className="panel-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Hourly Rate:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Skill:</label>
                    <select
                      className="form-control"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      required
                    >
                      <option value="">Select a skill</option>
                      <option value="graphic-designer">Graphic Designer</option>
                      <option value="web-developer">Web Developer</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-custom">Create Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
