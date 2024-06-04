import React, { useEffect } from "react";
import { loadStyles, unloadStyles } from "./login/loadstyle";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';

import Card from "react-bootstrap/Card";
const bootstrapCssUrl =
	"https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
function ProfileSelection() {
	useEffect(() => {
		loadStyles(bootstrapCssUrl);

		return () => {
			unloadStyles("dynamic-bootstrap-css");
		};
	}, []);
    const handleClick = () => {
        alert("Card clicked!"); // You can replace this with navigation logic
      };
	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
                  <style type="text/css">
        {`
        .clickable-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .clickable-card:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        `}
      </style>
			<div
				className="d-flex justify-content-center align-items-center bg-light w-100"
				style={{ height: "100%" }}
			>
      <Link to="/target-route" className="text-decoration-none">
        <Card className="clickable-card" style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Free Lancer</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
			</div>
			<div
				className="d-flex justify-content-center align-items-center bg-secondary w-100"
				style={{ height: "100%" }}
			>
				<h2>Div 2</h2>
			</div>
		</div>
	);
}

export default ProfileSelection;
