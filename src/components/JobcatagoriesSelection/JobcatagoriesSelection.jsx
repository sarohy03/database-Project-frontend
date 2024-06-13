import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './JobCategoriesSelection.css'; 

const PostingJobWithCategories = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate(); 
  const jobId = localStorage.getItem('jobId');

  const categories = [
    { id: 1, name: 'Website Development' },
    { id: 2, name: 'Graphic Design' },
    { id: 3, name: 'Content Writing' },
    { id: 4, name: 'SEO Services' },
    { id: 5, name: 'Digital Marketing' },
  ];

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const categoryId = parseInt(value);

    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(category => category !== categoryId));
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("JobId: ", jobId);
    console.log("Categories: ", selectedCategories);
    try {
      const promises = selectedCategories.map(categoryId => {
        console.log(`Processing category ID: ${categoryId}`);
        return axios.post('http://localhost:8800/CategoriesCreation', {
          jobId: jobId,
          categories: categoryId
        });
      });
  
      const responses = await Promise.all(promises);
      console.log(responses);
      
        navigate('/clientPage')
      
      console.log('resolved promises', responses);
      
      // Navigate or handle the responses here as needed
    } catch (error) {
      console.error('Error occurred:', error);
      // Handle errors here
    }
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
                <h2 className="panel-title">Categories</h2>
              </div>
              <div className="panel-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    {categories.map(category => (
                      <div key={category.id} className="form-group">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`category-${category.id}`}
                          value={category.id} // Send category id instead of name
                          onChange={handleCategoryChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`category-${category.id}`}
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <button type="submit" className="btn btn-custom">Post Job</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostingJobWithCategories;
