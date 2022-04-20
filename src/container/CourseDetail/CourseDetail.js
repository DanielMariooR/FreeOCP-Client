import NavBar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import { Link, NavLink, BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import '../../styles/courseDetail.css'
import CourseSyllabus from '../CourseSyllabus/CourseSyllabus';
import {useState, useEffect, useContext} from "react"
import { useLocation } from "react-router-dom"
import { ProgressBar } from 'react-bootstrap';
import { LoginContext } from '../../helper/isLoginContext';

const CourseDetail = () => {
    const navigate = useNavigate()
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)
    
    useEffect(()=>{
        let mounted = true;
        if(!isLoggedIn){
            navigate("/sign-in")
        }
        const fetchCourseData = async () => {
            let result = await fetch("http://localhost:8001/v1/course/"+ id, {
                method: 'GET',
                headers: {
                    "Authorization": authtoken,
                    "Content-Type": "application/json",
                    "Accept" : "application/json"
                    }
                }
            )
            result = await result.json()
            return result
        }
        if(id != 0){
            fetchCourseData().then(res=>{
                if (mounted){
                    setCourseData(res)
                }       
            })
        }
        

        async function getProgressPercentage(){
            let result = await fetch("http://localhost:8001/v1/course/progress/percentage/" + id, {
                method: 'GET',
                headers: {
                    "Authorization": authtoken,
                    "Content-Type": "application/json",
                    "Accept" : "application/json"
                }
            })
            result = result.json()
            if(result.error){
                setNotEnroll("true")
            }
            else{
                setNotEnroll("false")
            }
            return result
        }

        getProgressPercentage().then(res => {
            if(mounted){
                if(!res["error"]){
                    setProgress(res.percentage)
                }
                else{
                    setNotEnroll("true")
                }
                
            }
        })
        return function cleanup(){
            mounted = false;
        }
    }, [])
    const[progress, setProgress] = useState(0)

    const [courseData, setCourseData] = useState({"courseName": "Course-0", "description":"ini course 0", "thumbnail":"assets/python-course.png", "creator": "daniel"})
    let user = JSON.parse(localStorage.getItem('user-info'))
    let token = 0;
    if(user != null){
        token = user.token
    }
    let authtoken = "Bearer " + token
    let location = useLocation()
    let id = 0
    if(location.state != null){
        id = location.state.id;
    }
    else{
        navigate("/")
    }
    
    
    // console.log(courseData)

    const [notEnroll, setNotEnroll] = useState("true")
    const [enrolErrMsg, setEnrolErrMsg] = useState("")

    function handleEnroll(e){
        e.preventDefault()
        if(notEnroll == "true"){
            fetch("http://localhost:8001/v1/course/enroll/"+ id, {
            method: 'POST',
            headers: {
                "Authorization": authtoken,
                "Content-Type": "application/json",
                "Accept" : "application/json"
                }
            }
        ).then(res => {
                if(res["error"]){
                    setEnrolErrMsg(res["error"]["message"])
                }
                else{
                    console.log(res)
                    setNotEnroll("false")
                }
            })
        }
    }


    const CourseEnroll = () => {
        return(
            <div>
                <h2>Mulai Belajar Hari Ini</h2>
                <button className='btn btn-primary red-btn my-2' onClick={handleEnroll}>Ikuti Kursus</button>
            </div>
        )
    }
    const CourseDesc = () => {
        return (
            <div>
                <h2> Deskripsi Kursus</h2>
                <p>{courseData.description}
                </p>
                <p>{courseData.error?.message}</p>
            </div>
        )
    }
    console.log(notEnroll)

    return(
        <div>
            <NavBar/>
            <div className='container py-5 bg-white'>
                <h1 className='main-title'>{courseData.course_name}</h1>
                {
                    notEnroll=="false"? 
                    <div className='progres-container'>
                        <h4>Your Progress: </h4>
                        <ProgressBar now={progress}/>
                        <p>{progress + "%"}</p>
                    </div>
                    :
                    
                    <div className='col-lg-9 col-8'>
                        <button className='btn btn-primary red-btn my-2' onClick={handleEnroll}>Ikuti Kursus</button>
                        <p>{enrolErrMsg}</p>
                    </div>
                }
            </div>
            <div className= 'bg-white'>
                <img className='w-100 mx-auto d-block bg-white' src={courseData.thumbnail} alt="Thumbnail"/>
            </div>
            <div className='d-flex justify-content-around mx-5 my-3'>
                <div className='course-detail-navlink'>
                <h5><NavLink to="/detail-course/desc" state={{"id": id}}>Deskripsi</NavLink></h5>
                </div>
                <div className='course-detail-navlink'>
                    <h5><NavLink to="/detail-course/silabus" state={{"id": id}}>Silabus</NavLink></h5>   
                </div>
                {notEnroll? <div className='course-detail-navlink'>
                    <h5><NavLink to="/detail-course/daftar" state={{"id": id}}>Daftar</NavLink></h5>
                </div> : <div></div>}
                
            </div>
            <hr/>
            <div className='container my-5 bg-white'>
                <Routes>
                    <Route exact path = "/" element = {<CourseDesc/>}/>
                    <Route exact path="/desc" element = {<CourseDesc/>}/>
                    <Route exact path = "/silabus" element = {<CourseSyllabus id={id}/>}/>
                    <Route exact path="/daftar" element = {
                        notEnroll=="true"?
                        <CourseEnroll/>
                        :
                        <div className='container my-5'>
                        <h5>Anda telah mendaftar untuk course ini!</h5>
                        </div>}/>
                </Routes>
            </div>
            <div className='container bg-white'>
                <Routes>
                    <Route exact path = "/" element = {<CourseSyllabus id={id}/>}/>
                </Routes>
            </div>
            {
                notEnroll=="true"? 
                <div className='container my-5 bg-white'>
                    <Routes>
                        <Route exact path = "/" element = {<CourseEnroll/>}/>
                    </Routes>
                </div>
                :
                <div className='py-5'>
                </div> 
            }
                         
            <Footer/>
        </div>

        
    );
}

export default CourseDetail;