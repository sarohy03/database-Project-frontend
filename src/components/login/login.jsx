import React, { useEffect, useState } from "react";
import { loadStyles, unloadStyles } from "./loadstyle";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginValidation from "./loginValidation";
import "./styles.css"
import axios from "axios";

const bootstrapCssUrl =
	"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";

function Login() {
	useEffect(() => {
		loadStyles(bootstrapCssUrl);

		return () => {
			unloadStyles("dynamic-bootstrap-css");
		};
	}, []);

	const [errors, setErrors] = useState({});
	const [Values, setvalues] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleInput = (event) => {
		setvalues((prev) => ({
			...prev,
			[event.target.name]: [event.target.value],
		}));
	};

	const handleSumbit = (event) => {
		event.preventDefault();
		
		const validationErrors = loginValidation(Values);
		setErrors(validationErrors);
	

		if (!errors.email && !errors.password) {
			axios.post('http://localhost:8800/login', Values)
				.then(res => {
					if (res.data === "Success") {
						navigate('/ProfileSelection'); // Use navigate function to redirect
					} else {
						alert("No record existed");
					}
				})
				.catch(err =>{
					if (err.response && err.response.status === 401) {
						alert("Invalid email or password");
					} else {
						console.log(err);
					}
				});
		}
	};
	
	return (
		<div
			className="d-flex justify-content-center align-items-center vh-100"
			style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", marginTop:"-30px" }}
		>
			<div className="bg-white p-3 rounded w-25 rounded_corners">
				<h2>
					<strong>Log in</strong>
				</h2>
				<form action="" onSubmit={handleSumbit}>
					<div className="mb-3">
						<label htmlFor="email">
							<strong>Email</strong>
						</label>
						<input
							type="email"
							placeholder="Enter Email"
							onChange={handleInput}
							name="email"
							className="form-control rounded-0"
						/>
            {errors.email && <span className="text-danger">{errors.email}</span>}
					</div>
					<div className="mb-3">
						<label htmlFor="password">
							<strong>Password</strong>
						</label>
						<input
							type="password"
							placeholder="Enter password"
							onChange={handleInput}
							name="password"
							className="form-control rounded-0"
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
					</div>
					<button type="submit" className="btn btn-success w-100 rounded 0">
						Log in
					</button>
					<p>Agreed to our terms and policies</p>
					<Link to="/signup" className="btn btn-default border w-100 bg-light">
						Create account
					</Link>
				</form>
			</div>
		</div>
	);
}

export default Login;
