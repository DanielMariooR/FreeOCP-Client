import { Fragment, useEffect, useState } from "react";
import '../../styles/Course.css';
import CourseSyllabus from '../CourseSyllabus/CourseSyllabus';
import Video from '../../component/CourseMaterial/Video';
import Text from '../../component/CourseMaterial/Text';
import Assignment from '../../component/CourseMaterial/Assignment';
import NavBar from "../../component/Navbar/Navbar";
import CourseService from "../../service/CourseService";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Course = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let cid = location.state.cid;

    const [title, setTitle] = useState("");
    const [section, setSection] = useState({
        sectionID: "", subSections: []
    });
    const [state, setState] = useState({
        materialID: "dummy", materialName: "dummy", materialType: "dummy", materialContent: "dummy", materialContentText: "dummy"
    });

    const fetchTitle = async() => {
        let result = await CourseService.getCourseDetail(cid);
        result = await result.json();
        return result.course_name;
    }

    const fetchData = async() => {
        const getQueryParam = new URLSearchParams(window.location.search);
        const sid = getQueryParam.get("sid");
        const mid = getQueryParam.get("mid");

        if (section.sectionID != sid) {
            let result = await CourseService.getMaterial(cid, sid);
            result = await result.json();
            setSection(result);
        }

        if (state.materialID != mid) {
            let material = section.subSections.find(m => {
                return m.materialID == mid
            })
            setState(material);
        }
    }

    useEffect(() => {
        fetchData();
    })

    useEffect(() => {
        let mounted = true;
        fetchTitle().then(res=>{
            if(mounted){
                setTitle(res)
            }
        })
        return function cleanup(){
            mounted = false;
        }
    }, [])

    const handleBack = () => {
        let idx = section.subSections.map(function(e) { return e.materialID }).indexOf(state.materialID)
        if (idx != 0) {
            navigate("/course-material?sid=" + section.sectionID + "&mid=" + section.subSections[idx-1].materialID, { state:{cid: cid} });
        }
    }

    const handleNext = () => {
        let idx = section.subSections.map(function(e) { return e.materialID }).indexOf(state.materialID)
        if (idx != section.subSections.length - 1) {
            navigate("/course-material?sid=" + section.sectionID + "&mid=" + section.subSections[idx+1].materialID, { state:{cid: cid} });
        }
    }

    async function handleFinish() {
        let result = await CourseService.saveUserProgress(state.materialID);
        result = await result.json();
        console.log(result);
    }

    return (
        <Fragment>
            <NavBar/>
            <div className="row px-5 mx-0 my-5">
                <div className="col breadcrumbs">
                    <Link to="/detail-course" state={{id: cid}} className="item title">
                        {title}
                    </Link>
                    <FontAwesomeIcon icon={faAngleRight} className="fa fa-lg mx-3"/>
                    <span className="item">{state.materialName}</span>
                </div>
                <div className="col d-flex material-nav justify-content-end">
                    <div className="back" onClick={handleBack}>
                        <FontAwesomeIcon icon={faAngleLeft} className="fa-lg"/>
                        <span className="mx-2">Kembali</span>
                    </div>
                    <div className="next" onClick={handleNext}>
                        <span className="mx-2">Selanjutnya</span>
                        <FontAwesomeIcon icon={faAngleRight} className="fa-lg"/>
                    </div>
                </div>
            </div>
            <div className="row course-material px-5 m-0">
                <div className="col-12 col-lg-5 my-3">
                    <CourseSyllabus id={cid}/>
                </div>
                <div className="col-12 col-lg-7 my-3">
                    {(state.materialType == "text" && state.materialID != "") &&
                        <Text state={state} ended={handleFinish}/>
                    }
                    {(state.materialType == "video" && state.materialID != "") &&
                        <Video state={state} ended={handleFinish}/>
                    }
                    {state.materialType == "assignment" &&
                        <Assignment state={state}/>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default Course;