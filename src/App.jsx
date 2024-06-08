import React, { useState, useEffect } from "react";
import { Navigation } from "./components/LandingPage/navigation";
import { Header } from "./components/LandingPage/header";
import { Features } from "./components/LandingPage/features";
import { About } from "./components/LandingPage/about";
import { Services } from "./components/LandingPage/services";
import { Testimonials } from "./components/LandingPage/testimonials";
import { Team } from "./components/LandingPage/Team";
import  FreelancerInformation  from "./components/Freelancer_information/FreelancerInformation.jsx"
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Login from "./components/login/login"
import "./App.css";
import { createBrowserRouter,RouterProvider} from "react-router-dom"
import Signup  from './components/login/signup.jsx'
import ProfileSelection from "./components/Profileselection/ProfileSelection.jsx";
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  const router=createBrowserRouter([
    {
      path:'/login',
      element:<Login />
    },
    {
      path:'/ProfileSelection',
      element:<ProfileSelection />
    },
    {
      path:'/signup',
      element:<Signup />
    },
    {
      path:'/FreelancerInformation',
      element:<FreelancerInformation />
    },
    {
      path:"/",
      element:<> <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} /></>
    },
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
