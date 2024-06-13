import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Freelancer_information/style.css'; // Ensure this is the correct path to your CSS file

const WriteProposal = () => {

  const [description, setDescription] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const jobId = localStorage.getItem('WriteProposal')
    const profileData = {userId,jobId,description, hourlyRate};
    console.log('Profile Data:', profileData);

    axios.post('http://localhost:8800/InsertProposal', profileData)
      .then(res => {
        if (res.status === 201) {
          navigate('/FreelancerPage'); 
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
                <h2 className="panel-title">Send Proposal</h2>
              </div>
              <div className="panel-body">
                <form onSubmit={handleSubmit}>
                  
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
                    <label>Rate:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      required
                    />
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

export default WriteProposal;
