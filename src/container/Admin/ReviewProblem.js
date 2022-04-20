import AdminNav from '../../component/AdminNav/AdminNav';
import ReviewForm from '../../component/ReviewForm/ReviewForm';
import '../../styles/ReviewProblem.css';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../helper/isLoginContext";
import ProblemService from '../../service/ProblemService';

const ReviewProblem = () => {
    const navigate = useNavigate();
    const{isLoggedIn, setIsLoggedIn} = useContext(LoginContext);

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/sign-in")
        }
    }, [isLoggedIn]);
    
    async function handleAccept() {
        const getQueryParam = new URLSearchParams(window.location.search);
        const id = getQueryParam.get("id");
        var result = await ProblemService.acceptProblemCandidate(id);
        if (result.status == 200){
            navigate('/admin/problems');
        }
    }

    async function handleReject() {
        const getQueryParam = new URLSearchParams(window.location.search);
        const id = getQueryParam.get("id");
        var result = await ProblemService.rejectProblemCandidate(id);
        if (result.status == 200){
            navigate('/admin/problems');
        }
    }

    return (
        <div className='d-flex flex-column min-vh-100'>
            <AdminNav/>
            <div className='row justify-content-center mt-5 mx-5'>
                <h1 className='col-md-8 col'>Review Pertanyaan</h1>
            </div>
            <div className='row justify-content-center mx-5'>
                <div className='col-md-8 col my-4 pt-4 border rounded shadow-sm'>
                    <ReviewForm/>
                    <div className='mx-auto btn-container'>
                        <button onClick={handleAccept} className="y-btn btn text-white m-5 shadow-none px-4">Terima</button>
                        <button onClick={handleReject} className="n-btn n-btn btn text-white m-5 shadow-none px-4">Tolak</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewProblem;