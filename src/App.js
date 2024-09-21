import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/forms/Login';
import Register from './pages/forms/Register';
import Home from "./home/Home"
import Profile from "./pages/profile/Profile"
import JobDetails from "./pages/jobs/JobDetails"
import AddJobForm from "./pages/jobs/AddJobForm"
import BlogList from "./pages/blog/BlogList"
import BlogDetail from "./pages/blog/BlogDetail"
import JobSeekers from "./pages/jobseekers/JobSeekers"
import  Events  from "./pages/events/Events"
import CreateJobSeekerPost from "./pages/jobseekers/CreateJobSeekerPost"
import UpdateProfile from "./pages/profile/UpdateProfile"
import JobListingContainer from "./pages/jobs/JobListingContainer"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import SearchResults from "./pages/SearchResults"
function App() {

  return (
    <div className="App">
    <Navbar/>
   <Routes>
       <Route path="/" element={<Home/>} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/profile/:id" element={<Profile />} />
     <Route path="/post-job" element={<AddJobForm />} />
     <Route path="/jobs/:id" element={<JobDetails />} />
     <Route path="blogs" element={<BlogList/>}  />
     <Route path="/blogs/:id" element={<BlogDetail/>}  />
   <Route path="/events" element={<Events/>} />
     <Route  path="/jobseekers" element={<JobSeekers/>} />
     <Route  path="/create-jobseeker" element={<CreateJobSeekerPost/>} />
     <Route path="/profile/update/:id" element={<UpdateProfile/>} />
     <Route path="/jobs" element={<JobListingContainer/>} />
     <Route path="/search-results" element={<SearchResults />} />
   </Routes>
   <Footer/>
    </div>
  );
}

export default App;
