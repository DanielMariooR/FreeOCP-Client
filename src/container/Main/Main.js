import NavBar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import Card from '../../component/Card/Card';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'

const Main = () => {
    const [courseList, setCourseList] = useState([{"id":0, "course_name": "A", "thumbnail": "assets/dummy/thumbnail.png", "creator": "creator name"},{"id":0, "course_name": "A", "thumbnail": "assets/dummy/thumbnail.png", "creator": "creator name"},{"id":0, "course_name": "A", "thumbnail": "assets/dummy/thumbnail.png", "creator": "creator name"},{"id":0, "course_name": "A", "thumbnail": "assets/dummy/thumbnail.png", "creator": "creator name"}])
    const fetchCourseList = async () => {
        let result = await fetch("http://localhost:8001/v1/course/?item_per_page=4&page=1", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
                }
            },
        )
        result = await result.json()
        return result
    }
    useEffect(() =>{
        let mounted = true;
        fetchCourseList().then(res=>{
            if(mounted){
                setCourseList(res.items)
            }
        })
        return function cleanup(){
            mounted = false;
        }
        }, [])

    console.log(courseList)


    return (
        <div className='d-flex flex-column min-vh-100'>
            <NavBar/>
            <div className='container py-5 bg-white'>
                <div className='row d-flex flex-wrap align-items-center'>
                    <div className='col-lg-3 col-4'>
                        <img className='w-75 mx-auto d-block' src="assets/logo.png" alt="FREEOCP"/>
                    </div>
                    <div className='col-lg-9 col-8'>
                        <h1 className='main-title'>Limitless Learning</h1>
                        <h4 className='main-subtitle'>Belajar teknologi untuk semua</h4>
                        <Link to="/sign-up" className='btn btn-primary red-btn my-2'>Ayo Bergabung!</Link>
                    </div>
                </div>
            </div>
            <div className='bg-container w-100 bg-abu'>
                <div className='container py-5'>
                    <h2 className='red-title mx-3'>Kursus</h2>
                    <p className='main-desc mx-3'>Mulai Belajar dengan Kursus Gratis Ini</p>
                    <div className='row'>
                        <Card thumbnail={courseList[0].thumbnail} profpic="assets/dummy/profpic.png" title={courseList[0].course_name} creator={courseList[0].creator} id={courseList[0].id}/>
                        <Card thumbnail={courseList[1].thumbnail} profpic="assets/dummy/profpic.png" title={courseList[1].course_name} creator={courseList[1].creator} id={courseList[1].id}/>
                        <Card thumbnail={courseList[2].thumbnail} profpic="assets/dummy/profpic.png" title={courseList[2].course_name} creator={courseList[2].creator}  id={courseList[2].id}/>
                        <Card thumbnail={courseList[3].thumbnail} profpic="assets/dummy/profpic.png" title={courseList[3].course_name} creator={courseList[3].creator}  id={courseList[3].id}/>
                    </div>
                </div>
            </div>
            <div className='container py-5 bg-white'>
                <div className='row d-flex flex-wrap align-items-center py-5'>
                    <div className='col-md-6 col-12 text-center'>
                        <img className='w-50 my-5' src='assets/course-icon.png' alt=""/>
                    </div>
                    <div className='col-auto mx-auto'>
                        <h2 className='red-title'>Buat Kursus Baru</h2>
                        <p className='main-desc'>Rancang materi, video, dan evaluasi<br/>kursus untuk bersama</p>
                        <Link to="/create-course" className='btn btn-primary red-btn px-5'>Mulai!</Link>
                    </div>
                </div>
            </div>
            <div className='bg-container w-100 bg-abu'>
                <div className='container py-5'>
                    <div className='row d-flex flex-wrap align-items-center py-5'>
                        <div className='col-auto mx-auto'>
                            <h2 className='red-title'>Kontribusi Soal Evaluasi</h2>
                            <p className='main-desc'>Buat soal untuk evaluasi dan<br/>memperkaya bank soal</p>
                            <Link to="/create-question" className='btn btn-primary red-btn px-4'>Tambahkan!</Link>
                        </div>
                        <div className='col-md-6 col-12 text-center'>
                            <img className='w-50 my-5' src='assets/question-icon.png' alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Main;