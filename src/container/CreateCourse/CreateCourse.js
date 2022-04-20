import NavBar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer"
import CourseForm from "../../component/CourseForm/CourseForm";
import { checkAuth } from "../../helper/auth";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
    const navigate = useNavigate()
    if (!checkAuth()) {
        navigate("/sign-in");
    }

    return (
        <div className='d-flex flex-column min-vh-100'>
            <NavBar/>
            <div className='row justify-content-center mt-5 mx-5'>
                <h1 className='col-md-8 col'>Formulir Kursus</h1>
            </div>
            <div className='row justify-content-center mx-5'>
                <div className='col-md-8 col my-4 pt-4 border rounded shadow-sm'>
                    <CourseForm/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CreateCourse;