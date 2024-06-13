import React, { useEffect, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";
import "../clientPage/clientPage.css";
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
    const navigate = useNavigate(); 
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
			const response = await axios.get(
				`http://localhost:8800/getUserName/${userId}`
			);

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
			const response = await axios.get(`http://localhost:8800/AllgetJobs`, {
				params: { userId },
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

    const handleClick = (jobId) => {
        localStorage.setItem('WriteProposal', jobId); 
        console.log('Job ID saved:', jobId);
        navigate("/WriteProposal");
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
								Messages
							</button>
							<button className="custom-button" onClick={handleClick}>
								My Contracts
							</button>
							<Link to='/'className="custom-button" >
								Sign Out
							</Link>
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
                    <Link to="/GetProposals" className="custom-button">
                        See Proposals
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
									<p>
										<strong>Id:</strong> {job.job_id}
									</p>
									<p>
										<strong>Description:</strong> {job.description}
									</p>
									<p>
										<strong>Budget:</strong> ${job.budget}
									</p>
									<p>
										<strong>Status:</strong> {job.status}
									</p>
									<p>
										<strong>Created At:</strong>{" "}
										{new Date(job.created_at).toLocaleString()}
									</p>
									<button
										className="custom-button"
										onClick={() => handleClick(job.job_id)}
									>
										Send proposals
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
