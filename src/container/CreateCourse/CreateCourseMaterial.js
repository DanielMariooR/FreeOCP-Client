import NavBar from '../../component/Navbar/Navbar';
import { useContext, useEffect } from 'react';
import { LoginContext } from '../../helper/isLoginContext';
import { useNavigate } from 'react-router-dom';
import CourseMaterialForm from '../../component/CourseForm/CourseMaterialForm';

const CreateCourseMaterial = () => {
    const navigate = useNavigate()
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)
    useEffect(() => {
        if(!isLoggedIn){
            navigate("/sign-in")
        }
    }, [isLoggedIn]
    )

    return (
        <div className='d-flex flex-column min-vh-100'>
            <NavBar/>
            <div className='row justify-content-center mt-5 mx-5'>
                <div className='col'>
                    <button className='actionButton f-btn btn btn-primary px-3 border-0' onClick={() => navigate(-1)}>Kembali</button>
                </div>
            </div>
            <div className='row justify-content-center mt-3 mx-5'>
                <h1 className='col-md-8 col'>Formulir Materi</h1>
            </div>
            <div className='row justify-content-center mx-5'>
                <div className='col-md-8 col my-4 pt-4 border rounded shadow-sm'>
                    <CourseMaterialForm/>
                </div>
            </div>
        </div>
    )
}

export default CreateCourseMaterial;