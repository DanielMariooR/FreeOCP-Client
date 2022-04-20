import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './container/Main/Main';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/SearchBar.css';
import './styles/Navbar.css';
import './styles/Card.css';
import './styles/Main.css';
import './styles/Dashboard.css';
import './styles/Admin.css';
import './styles/AssigmentQuestions.css';
import Login from './container/Login/Login';
import Register from './container/Register/Register'
import CreateQuestion from './container/CreateQuestion/CreateQuestion';
import Dashboard from './container/Dashboard/Dashboard'
import Completed from './container/Dashboard/Completed'
import OnProgress from './container/Dashboard/OnProgress';
import Admin from './container/Admin/Admin';
import ReviewProblem from './container/Admin/ReviewProblem';
import CreateCourse from './container/CreateCourse/CreateCourse';
import ProblemContribution from './container/ProblemContribution/ProblemContribution';
import CourseDetail from './container/CourseDetail/CourseDetail';
import Assignment from './container/Assignment/Assignment';
import Course from './container/Course/Course';
import CreateCourseMaterial from './container/CreateCourse/CreateCourseMaterial';
import CourseContribution from './container/CourseContribution/Dashboard';
import CourseContributionDetail from './container/CourseContribution/General';
import CourseContributionMaterial from './container/CourseContribution/MaterialList';
import CourseContributionMaterialDetail from './container/CourseContribution/MaterialDetail';
import Error404NotFound from './container/Error404NotFound/Error404NotFound';
import CreateAssignment from './container/CreateCourse/CreateCourseAssignment';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'
import moment from 'moment';
import { LoginContext } from './helper/isLoginContext';
import ReviewForm from './component/ReviewForm/ReviewForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  useEffect(() => {
    if(localStorage.getItem("user-info") != null){
      let userInfo = JSON.parse(localStorage.getItem("user-info"))
      let expiration = new Date(userInfo.expiration)
      expiration = moment(expiration).format("YYYY-MM-DD HH:mm:ss")
      let now = new Date()
      now = moment(now)
      if(now.isAfter(expiration)){
        setIsLoggedIn(false)
      }
    }
    else{
      setIsLoggedIn(false)
    }
  }, [])
  console.log(isLoggedIn)
  

  return (
    <Router>
      <LoginContext.Provider value = {{isLoggedIn, setIsLoggedIn}}>
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route path = "/sign-in/*" element = {<Login/>}/>
        <Route path = "/sign-up/*" element = {<Register/>}/>
        <Route path = "/create-question" element = {<CreateQuestion/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
        <Route path="/completed" element={<Completed/>}/>
        <Route path="/on-progress" element={<OnProgress/>}/>
        <Route path="/my-questions" element={<ProblemContribution/>}/>
        <Route path="/my-courses" element={<CourseContribution/>}/>
        <Route path="/my-courses/detail" element = {<CourseContributionDetail/>}/>
        <Route path="/my-courses/materials" element = {<CourseContributionMaterial/>}/>
        <Route path="/my-courses/materials/detail" element = {<CourseContributionMaterialDetail/>}/>
        <Route path="/assignment" element={<Assignment/>}/>
        <Route path="/admin/problems" element={<Admin/>}/>
        <Route path="/admin/problems/review" element={<ReviewProblem/>}/>
        <Route path='/create-course' element = {<CreateCourse/>}/>
        <Route path="/detail-course/*" element = {<CourseDetail/>}/>
        <Route path = "/course-material/" element = {<Course/>}/>
        <Route path = "/create-course-material/" element = {<CreateCourseMaterial/>}/>
        <Route path = "/create-assignment" element = {<CreateAssignment/>}/>
        <Route path = "/problem" element = {<ReviewForm/>}/>
        <Route path="*" element={<Error404NotFound/>}/>
      </Routes>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
