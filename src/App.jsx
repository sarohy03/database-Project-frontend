import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Login from "./components/login/login"
import "./App.css";
import { createBrowserRouter,RouterProvider} from "react-router-dom"
import Signup  from './components/login/signup.jsx'
import ProfileSelection from "./components/ProfileSelection.jsx";
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
