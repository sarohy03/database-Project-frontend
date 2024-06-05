import React from "react";
import { Link } from "react-router-dom";
import "./ProfileSelection.css"; // Import the CSS file
import axios from "axios";
function ProfileSelection() {
	const handleClick = () => {
		const userId = localStorage.getItem('userId');
		
		if (userId) {
		  axios.post('http://localhost:8800/profileSelection', { userId })
			.then(res => {
			  console.log(res.data.message);  
			})
			.catch(err => {
			  console.error(err);
			  alert('Error creating profile.');
			});
		} else {
		  alert('User ID not found.');
		}
	  };
  return (
    <div className="full-height">
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

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
        </div>
      </div>
    </nav>
      <div className="flex-center bg-light-custom w-100 p-3">
        <Link to="/" className="text-large" onClick={handleClick}>
          <div
            className="clickable-card bg-secondary-custom text-center card-padding"
            style={{ width: "20rem", margin: "auto" }}
          >
            <div className="card-body">

              <div className="text-large">
                <h3 className="text-white">
                  Join as <br />
                  FREELANCER
                </h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex-center bg-secondary-custom w-100 p-3">
        <Link to="/freelancer" className="text-large" onClick={handleClick}>
          <div
            className="clickable-card bg-light-custom text-center card-padding"
            style={{ width: "20rem", margin: "auto" }}
          >
            <div className="card-body">
              <div className="text-large">
                <h3>
                  Join as <br />
                  Client
                </h3>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProfileSelection;
