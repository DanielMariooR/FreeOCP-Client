import NavBar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import Card from '../../component/Card/Card';
import { useContext, useEffect, useState } from 'react';
import { setAuthHeader } from '../../helper/auth';
import { useNavigate } from 'react-router';
import Pagination from '../../component/Pagination/Pagination';
import { LoginContext } from '../../helper/isLoginContext';

const Completed = () => {
    const [courses, setCourses] = useState([])
    const [currentPage, setcurrentPage] = useState([])
    const [totalItem, settotalItem] = useState([])
    const navigate = useNavigate()
    const {isLoggedIn, setIsLoggedIn} = useContext(LoginContext)

    useEffect(() => {
        if(!isLoggedIn){
            navigate("/sign-in")
        }
        async function fetchData(){
            let result = await fetch("http://localhost:8001/v1/course/completed?item_per_page=8&page=1", {
                method: 'GET',
                headers: setAuthHeader(),
            });
            result = await result.json();
            setCourses(result.items);
            setcurrentPage(result.meta.page);
            settotalItem(result.meta.total_item);
        }

        fetchData();
    }, [isLoggedIn])

    return (
        <div className='d-flex flex-column min-vh-100'>
            <NavBar/>
            <div className='DashboardMenu'>
                <div id = "dashboardLink">
                    <button className="dashboardButton" onClick={()=> navigate("/dashboard?page=1")}>Semua</button>
                </div>
                <div id = "dashboardLink">
                    <button className="dashboardButton" onClick={()=> navigate("/completed?page=1")}>Selesai</button>
                </div>
                <div id = "dashboardLink">
                    <button className="dashboardButton" onClick={()=> navigate("/on-progress?page=1")}>Dalam Proses</button>
                </div>
                <div>
                </div>
            </div> 
            <div className='bg-container w-100'>
                <div className='container py-5'>
                    <div className='row'>
                        {courses!=null? courses.map((value) => {
                            return <Card key={value.id} id={value.id} thumbnail="assets/dummy/thumbnail.png" profpic="assets/dummy/profpic.png" title={value.course_name} creator={value.creator}/>
                        }):"belum ada course yang telah kamu selesaikan"}
                    </div>
                </div>
            </div>
            <Pagination
                className="dashboard-pagination"
                currentPage={currentPage}
                totalCount={totalItem}
                pageSize={4}
                onPageChange={page => {
                    var url = "/completed?page=" + page.toString();
                    navigate(url);
                    window.location.reload();
                }}
            />
            <Footer/>
        </div>
    )
}

export default Completed