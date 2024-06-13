import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './PostingJob.css'; 

const PostingJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [Budget, setHourlyRate] = useState('');
  const navigate = useNavigate(); 
  const client_id = localStorage.getItem('userId');
  const status='open';
  const handleSubmit = (e) => {
    console.log(client_id);
    e.preventDefault();
    const profileData = { client_id,title, description, Budget,status};
    console.log('Profile Data:', profileData);

    axios.post('http://localhost:8800/jobcreation', profileData)
      .then(res => {
        if (res.status === 201) {
          const jobId = res.data.jobId; // Get the user ID from the response
          localStorage.setItem('jobId', jobId); // Store the user ID in local storage
          console.log(jobId);
          navigate('/CatagoriesSelection'); 
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
                <h2 className="panel-title">Post job</h2>
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
                    <label>Budget:</label>
                    <input
                      type="number"
                      className="form-control"
                      value={Budget}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-custom">Next</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostingJob;
