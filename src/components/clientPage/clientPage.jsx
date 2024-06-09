import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./clientPage.css";
import { loadStyles, unloadStyles } from "../../components/login/loadstyle";

const bootstrapCssUrl =
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";

const ClientPage = () => {
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [jobsLoading, setJobsLoading] = useState(true);
    const [jobsError, setJobsError] = useState(null);

    useEffect(() => {
        loadStyles(bootstrapCssUrl);

        const userId = localStorage.getItem("userId"); 

        if (userId) {
            fetchUserName(userId);
            fetchJobs(userId);
        } else {
            setError("User ID not found in local storage.");
            setLoading(false);
            setJobsLoading(false);
        }

        return () => {
            unloadStyles("dynamic-bootstrap-css");
        };
    }, []);

    const fetchUserName = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8800/getUserName/${userId}`);

            if (response.status === 200) {
                setUserName(response.data.userName);
            } else {
                throw new Error("Failed to fetch user name");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchJobs = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8800/getJobs`, {
                params: { userId }
            });

            if (response.status === 200) {
                setJobs(response.data.jobs);
            } else {
                throw new Error("Failed to fetch jobs");
            }
        } catch (err) {
            setJobsError(err.message);
        } finally {
            setJobsLoading(false);
        }
    };

    const handleClick = () => {
        alert("Button Clicked!");
    };

    return (
        <div className="parent">
            <nav className="custom-navbarr">
                <div className="navbar-containerr">
                    <div className="left">
                        <div className="navbar-headerr">
                            <Link className="navbar-brandd" to="/">
                                FreelancerPro
                            </Link>
                        </div>
                    </div>
                    <div className="right">
                        <div className="navbar-menuu" id="navbar-menu">
                            <button className="custom-button" onClick={handleClick}>
                                My jobs
                            </button>
                            <button className="custom-button" onClick={handleClick}>
                                My Contracts
                            </button>
                            <button className="custom-button" onClick={handleClick}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="names">
                <div className="containerrr">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <p>{userName}</p>
                    )}
                </div>
                <div>
                    <Link to="/PostingJob" className="custom-button">
                        Post a Job
                    </Link>
                </div>
            </div>

            <div className="Job_List">
                <div className="container_job">
                    {jobsLoading ? (
                        <p>Loading jobs...</p>
                    ) : jobsError ? (
                        <p>Error: {jobsError}</p>
                    ) : jobs.length === 0 ? (
                        <p>No jobs available</p>
                    ) : (
                        <ul>
                            {jobs.map((job) => (
                                <li key={job.job_id} className="job-items">
                                    <h3>{job.title}</h3>
                                    <p><strong>Description:</strong> {job.description}</p>
                                    <p><strong>Budget:</strong> ${job.budget}</p>
                                    <p><strong>Status:</strong> {job.status}</p>
                                    <p><strong>Created At:</strong> {new Date(job.created_at).toLocaleString()}</p>
                                    <button className="custom-button" onClick={handleClick}>
                                See purposals
                            </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientPage;
